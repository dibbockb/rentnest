import { cookies } from "next/headers"

// {{rentnest-backend}}/api/landlord/requests

export const getIncomingRequests = async () => {
    try {
        const cookieStore = await cookies()
        const accessToken = cookieStore.get("accessToken")?.value
        if (!accessToken) return []

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/landlord/requests`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            cache: "no-store",
        })
        const json = await res.json()
        return json?.data?.result ?? []
    } catch (error) {
        console.log(error)
        return []
    }
}