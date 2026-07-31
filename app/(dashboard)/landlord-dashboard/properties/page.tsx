import { PropertiesTable } from "@/components/dashboard/landlord/properties-table"
import { getAllLandlordProperties } from "../_actions/getAllLandlordProperties"
import { CreatePropertyModal } from "@/components/dashboard/landlord/create-property-modal"

export default async function LandlordPropertiesPage() {
    const properties = await getAllLandlordProperties()

    return (
        <div className="p-6">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-4">My Properties ({properties.length})</h1>
                <CreatePropertyModal />
            </div>
            <PropertiesTable properties={properties} />
        </div>
    )
}