"use server";

import { RegisterInput, RegisterSchema } from "@/lib/schemas/register";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

type RegisterState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
        role: string;
    };
} | null;

export const loginAction = async (prevState: any, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            },
        );
        const result = await res.json();

        if (result.success) {
            const cookieStore = await cookies();
            cookieStore.set("accessToken", result.data.accessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
            });

            cookieStore.set("refreshToken", result.data.refreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
            });
            const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

            return {
                success: true,
                message: "Logged in successfully.",
                data: result.data,
                user: {
                    id: decodedToken?.id,
                    name: decodedToken?.name || "User",
                    email: decodedToken?.email || email,
                    role: decodedToken?.role,
                },
            };
        }

        return result;
    } catch (error) {
        if ((error as any)?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        return {
            success: false,
            statusCode: 500,
            message: "An unexpected error occurred. Please try again.",
            data: { accessToken: "", refreshToken: "" },
        };
    }
};
export const registerAction = async (
    data: RegisterInput,
): Promise<RegisterState> => {
    const parsed = RegisterSchema.safeParse(data);

    if (!parsed.success) {
        return {
            success: false,
            statusCode: 400,
            message: `Invalid input.`,
            data: { accessToken: "", refreshToken: "", role: "" },
        };
    }

    try {
        const { name, email, password, role } = parsed.data;

        const registerRes = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsed.data),
            },
        );
        const registerResult = await registerRes.json();

        if (!registerResult.success) {
            return {
                success: false,
                statusCode: registerResult.statusCode ?? 400,
                message: registerResult.message || "Registration failed.",
                data: { accessToken: "", refreshToken: "", role: "" },
            };
        }

        const loginRes = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            },
        );
        const loginResult = await loginRes.json();

        if (loginResult.success) {
            const cookieStore = await cookies();
            cookieStore.set("accessToken", loginResult.data.accessToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 60 * 60 * 24,
            });
            cookieStore.set("refreshToken", loginResult.data.refreshToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7,
            });

            const decodedToken = jwt.decode(
                loginResult.data.accessToken,
            ) as JwtPayload;
        }

        return loginResult;
    } catch (error) {
        if ((error as any)?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        return {
            success: false,
            statusCode: 500,
            message: `Unexpected error. Please try again.`,
            data: { accessToken: "", refreshToken: "", role: "" },
        };
    }
};

export async function logoutUser() {
    const cookieStore = await cookies()
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
}
