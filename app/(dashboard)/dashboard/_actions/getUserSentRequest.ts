// app/(dashboard)/_actions/getUserSentRequest.ts
import { cookies } from "next/headers"

export const getUserSentRequest = async () => {
    try {
        const cookieStore = await cookies()
        const accessToken = cookieStore.get("accessToken")?.value
        if (!accessToken) return []

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/rental/my-requests`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            cache: "no-store",
        })
        const json = await res.json()
        return json?.data?.result || []
    } catch (error) {
        return []
    }
}