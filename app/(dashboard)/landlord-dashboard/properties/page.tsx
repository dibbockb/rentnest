import { PropertiesTable } from "@/components/dashboard/landlord/properties-table"
import { getAllLandlordProperties } from "../_actions/getAllLandlordProperties"

export default async function LandlordPropertiesPage() {
    const properties = await getAllLandlordProperties()

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Properties ({properties.length})</h1>
            <PropertiesTable properties={properties} />
        </div>
    )
}