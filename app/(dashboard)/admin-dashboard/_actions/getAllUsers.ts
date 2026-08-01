import { cookies } from "next/headers"

export const getAllUsers = async () => {
    try {
        const cookieStore = await cookies()
        const accessToken = cookieStore.get("accessToken")?.value
        if (!accessToken) return []

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            cache: "no-store",
        })
        const json = await res.json()
        return json?.data ?? []
    } catch (error) {
        return []
    }
}