import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken"

const AUTH_ROUTES = ['/login', '/register']
const PUBLIC_ROUTES = ['/', '/browse', '/login', '/register']

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname
    const accessToken = request.cookies.get("accessToken")?.value;
    const decodedToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null
    let userRole = null;
    if (decodedToken) {
        userRole = decodedToken.role
    }

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
    const isPublic = PUBLIC_ROUTES.some((route) => pathName === route || pathName.startsWith(route + "/"))
    // || /^\/property\/[^/]+$/.test(pathName)

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