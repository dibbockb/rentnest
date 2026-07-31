"use server"
import { cookies } from "next/headers"

export const approveRequest = async (id: string) => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            statusCode: 401,
            message: "Unable to fetch cookies. Please try logging in again."
        }
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/landlord/properties/${id}?accept=true`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            }

        })
        const result = await res.json();
        return result

    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: "Something went wrong. Please try again."
        }
    }

}