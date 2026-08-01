"use server"

import { cookies } from "next/headers"
import { UpdateUserSchema, type UpdateUserInput } from "@/lib/schemas/user"

export const editUser = async (userId: string, data: UpdateUserInput) => {
    const parsed = UpdateUserSchema.safeParse(data)
    if (!parsed.success) {
        return { success: false, statusCode: 400, message: "Invalid input." }
    }

    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value
    if (!accessToken) {
        return { success: false, statusCode: 401, message: "Please log in again." }
    }

    //to understand this 
    const payload = Object.fromEntries(
        Object.entries(parsed.data).filter(([_, v]) => v !== undefined)
    )


    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
        })
        return await res.json()
    } catch {
        return { success: false, statusCode: 500, message: "Something went wrong." }
    }
}