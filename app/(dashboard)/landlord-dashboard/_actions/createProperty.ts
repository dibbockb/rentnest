"use server"

import { cookies } from "next/headers"
import { PropertySchema, type PropertyInput } from "@/lib/schemas/property"

export const createProperty = async (data: PropertyInput) => {
    const parsed = PropertySchema.safeParse(data)
    if (!parsed.success) {
        return { success: false, statusCode: 400, message: "Invalid input." }
    }

    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value
    if (!accessToken) {
        return { success: false, statusCode: 401, message: "Please try to log in again." }
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/newlisting`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(parsed.data),
        })
        return await res.json()
    } catch {
        return { success: false, statusCode: 500, message: "Something went wrong." }
    }
}