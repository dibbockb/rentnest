import { cookies } from "next/headers"

export const getAllUsers = async (page: number = 1, limit: number = 20) => {
    try {
        const cookieStore = await cookies()
        const accessToken = cookieStore.get("accessToken")?.value
        if (!accessToken) return { users: [], meta: null }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users?page=${page}&limit=${limit}`,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
                cache: "no-store",
            }
        )

        if (!res.ok) {
            return { users: [], meta: null }
        }

        const json = await res.json()

        return {
            users: json?.data?.users ?? [],
            meta: json?.data?.meta ?? null,
        }
    } catch (error) {
        console.error("Failed to fetch users:", error)
        return { users: [], meta: null }
    }
}