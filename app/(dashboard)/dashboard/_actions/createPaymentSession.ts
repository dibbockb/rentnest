"use server"

import { cookies } from "next/headers"

export const createPaymentSession = async (rental_req_id: string) => {
    try {
        const cookieStore = await cookies()
        const accessToken = cookieStore.get("accessToken")?.value
        if (!accessToken) return []

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payments/create/${rental_req_id}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}` },
            cache: "no-store",
        })
        const json = await res.json()
        return json?.data?.sessionUrl || null
    } catch (error) {
        return []
    }
}

