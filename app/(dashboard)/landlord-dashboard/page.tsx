import { getAllLandlordProperties } from "./_actions/getAllLandlordProperties"
import { getIncomingRequests } from "./_actions/getIncomingRequests"

export default async function LandlordDashboardPage() {
    const [properties, requests] = await Promise.all([
        getAllLandlordProperties(),
        getIncomingRequests(),
    ])

    const totalProperties = properties.length
    const pendingRequests = requests.filter((r: any) => r.status === "PENDING").length
    const activeRentals = requests.filter((r: any) => r.status === "APPROVED").length

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">Total Properties</p>
                    <p className="text-2xl font-bold">{totalProperties}</p>
                </div>
                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">Pending Requests</p>
                    <p className="text-2xl font-bold">{pendingRequests}</p>
                </div>
                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">Active Rentals</p>
                    <p className="text-2xl font-bold">{activeRentals}</p>
                </div>
            </div>
        </div>
    )
}