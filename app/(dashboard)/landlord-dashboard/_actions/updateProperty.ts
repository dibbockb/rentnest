"use server"
import { cookies } from "next/headers"

type UpdatePropertyInput = {
    location?: string
    price?: number
    category_name?: string
}

export const updateProperty = async (propertyId: string, data: UpdatePropertyInput) => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value
    if (!accessToken) return { success: false, message: "Please log in again." }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/update/${propertyId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        })
        return await res.json()
    } catch {
        return { success: false, message: "Something went wrong." }
    }
}