
export interface IProperty {
    id: string,
    is_available: boolean,
    location: string,
    price: number,
    images: string[],
    landlord_id: Date,
    created_at: Date,
    updated_at: Date,
    category: {
        id: string,
        name: string
    }
}

export const getAllProperties = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties`)
        const json = await res.json()

        return json?.data?.result || []

    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: "Unable to get properties. Please try again.", error,
        }
    }
}