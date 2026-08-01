import { getAllProperties } from "../_actions/getAllProperties"
import { AllPropertiesTable } from "@/components/dashboard/admin/properties-table"

export default async function AllPropertiesPage() {
    const properties = await getAllProperties()

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Manage all Properties ({properties.length})
            </h1>
            <AllPropertiesTable properties={properties} />
        </div>
    )
}