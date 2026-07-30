// https://api.rentnest.dibbockb.com/api/properties/:id



export const getPropertyDetails = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/${id}`)
        const json = await res.json()

        return json?.data?.result || []

    } catch (error) {
        console.log(error)
        return []
    }
}

