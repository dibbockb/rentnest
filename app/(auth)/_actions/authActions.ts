"use server"

import { cookies } from "next/headers"

type LoginState = {
    success: boolean
    statusCode: number
    message: string
    data: {
        accessToken: string
        refreshToken: string
    }
} | null

export const loginAction = async (prevState: LoginState, formData: FormData) => {
    const email = formData.get("email")
    const password = formData.get("password")
    const payload = {
        email,
        password
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })

        const result = await res.json()

        if (result.success) {
            const cookieStore = await cookies()

            cookieStore.set("accessToken", result.data.accessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
            })

            cookieStore.set("refreshToken", result.data.refreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
            })
        }

        return result;

    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: "An unexpected error occurred. Please try again.",
            data: { accessToken: "", refreshToken: "" }
        }
    }
}