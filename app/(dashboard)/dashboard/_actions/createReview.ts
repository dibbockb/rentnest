"use server"

import { cookies } from "next/headers"
import { ReviewSchema, type ReviewInput } from "@/lib/schemas/review"

export const createReview = async (propertyId: string, data: ReviewInput) => {
    const parsed = ReviewSchema.safeParse(data)
    if (!parsed.success) {
        return { success: false, message: "Invalid input." }
    }

    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value
    if (!accessToken) {
        return { success: false, message: "Please log in again." }
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/rental/review/${propertyId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(parsed.data),
        })
        return await res.json()
    } catch {
        return { success: false, message: "Something went wrong." }
    }
}