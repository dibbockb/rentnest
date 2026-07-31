"use server"
import { cookies } from "next/headers"

export const deleteProperty = async (propertyId: string) => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value
    if (!accessToken) return { success: false, message: "Please log in again." }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/landlord/${propertyId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        return await res.json()
    } catch {
        return { success: false, message: "Something went wrong." }
    }
}