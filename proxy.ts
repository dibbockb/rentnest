import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken"

const AUTH_ROUTES = ['/login', '/register']
const PUBLIC_ROUTES = ['/', '/browse', '/login', '/register']

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname

    let refreshToken = request.cookies.get("refreshToken")?.value;
    const decodedRefreshToken = refreshToken ? jwt.decode(refreshToken) as JwtPayload : null

    let accessToken = request.cookies.get("accessToken")?.value;
    const decodedAccessToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null

    let response = NextResponse.next();

    if ((!accessToken || !decodedAccessToken) && refreshToken) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/refresh-token`, {
                method: "POST",
                headers: { Cookie: `refreshToken=${refreshToken}` },
                cache: "no-cache"
            });

            if (res.ok) {
                const result = await res.json();
                const newAccessToken = result?.data?.accessToken;

                if (newAccessToken) {
                    response = NextResponse.next();
                    response.cookies.set("accessToken", newAccessToken, {
                        httpOnly: true,
                        maxAge: 60 * 60 * 24,
                        sameSite: "lax",
                        secure: process.env.NODE_ENV === 'production',
                    });
                    accessToken = newAccessToken;
                    return response
                }
            }
        } catch (error) {
            console.error("Token refresh failed", error);
        }
    }

    const currentAccessToken = request.cookies.get("accessToken")?.value || accessToken;
    const userPayload = currentAccessToken ? jwt.decode(currentAccessToken) as JwtPayload : null;
    const userRole = userPayload?.role || null;

    const getDashboardUrl = (role: string | null) => {
        if (role === "ADMIN") return '/admin-dashboard'
        if (role === "LANDLORD") return '/landlord-dashboard'
        if (role === "TENANT") return '/dashboard'
        return '/'
    }

    // auth pages if logged in
    if (accessToken && AUTH_ROUTES.includes(pathName)) {
        return NextResponse.redirect(new URL(getDashboardUrl(userRole), request.url))
    }

    //authenticate
    const isPublic = PUBLIC_ROUTES.some((route) => pathName === route || pathName.startsWith(route + "/") || /^\/property\/[^/]+$/.test(pathName))

    if (!accessToken && !isPublic) {
        const loginUrl = new URL(`/login`, request.url)
        loginUrl.searchParams.set("redirectTo", pathName)
        return NextResponse.redirect(loginUrl)
    }

    //redirect RBAC
    if (pathName.startsWith("/admin-dashboard")) {
        if (userRole !== "ADMIN") {
            return NextResponse.redirect(new URL(getDashboardUrl(userRole), request.url))
        }
    }
    if (pathName.startsWith("/landlord-dashboard")) {
        if (userRole !== "LANDLORD") {
            return NextResponse.redirect(new URL(getDashboardUrl(userRole), request.url))
        }
    }
    if (pathName === "/dashboard") {
        if (userRole !== "TENANT") {
            return NextResponse.redirect(new URL(getDashboardUrl(userRole), request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}