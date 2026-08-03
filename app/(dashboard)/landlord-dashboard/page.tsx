import { BlurFade } from "@/components/motion/blur-fade"
import { getAllLandlordProperties } from "./_actions/getAllLandlordProperties"
import { getIncomingRequests } from "./_actions/getIncomingRequests"

export default async function LandlordDashboardPage() {
    const [properties, requests] = await Promise.all([
        getAllLandlordProperties(),
        getIncomingRequests(),
    ])

    const totalProperties = properties.length
    const pendingRequests = requests.filter((r: any) => r.status === "PENDING").length

    const totalEarnings = requests
        .filter((r: any) => r.status === "APPROVED" || r.status === "COMPLETED")
        .reduce((sum: number, r: any) => sum + (r.property?.price ?? 0), 0)

    return (
        <BlurFade><div className="p-6 space-y-6">
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
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                    <p className="text-2xl font-bold">${totalEarnings.toLocaleString()}</p>
                </div>
            </div>
        </div></BlurFade>
    )
}