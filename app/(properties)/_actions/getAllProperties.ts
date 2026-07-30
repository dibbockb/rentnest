
export interface IProperty {
    id: string,
    is_available: boolean,
    location: string,
    price: number,
    images: string[],
    landlord_id: string,
    created_at: Date,
    updated_at: Date,
    category: {
        id: string,
        name: string
    }
    landlord?: {
        id: string,
        name: string,
        email: string,
        role: string,
        profilePhoto: string,
        is_banned: boolean,
        created_at: Date,
        updated_at: Date
    }
}

export const getAllProperties = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties`)
        const json = await res.json()

        return json?.data?.result || []

    } catch (error) {
        return []
    }
}