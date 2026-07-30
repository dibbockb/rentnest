// https://api.rentnest.dibbockb.com/api/properties/:id

export const getPropertyDetails = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/${id}`)
        const json = await res.json()

        if (!res.ok || !json?.data?.result) {
            return null
        }

        return json?.data?.result || null

    } catch (error) {
        return null;
    }
}

