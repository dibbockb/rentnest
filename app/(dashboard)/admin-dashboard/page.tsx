// app/(dashboard)/admin-dashboard/page.tsx
import { getAllUsers } from "./_actions/getAllUsers"
import { getAllProperties } from "./_actions/getAllProperties"
import { getAllRequests } from "./_actions/getAllRequests"

export default async function AdminDashboardPage() {
    const [users, properties, requests] = await Promise.all([
        getAllUsers(),
        getAllProperties(),
        getAllRequests(),
    ])

    const totalUsers = users.length
    const totalProperties = properties.length
    const pendingRequests = requests.filter((r: any) => r.status === "PENDING").length

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">{totalUsers}</p>
                </div>
                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">Total Properties</p>
                    <p className="text-2xl font-bold">{totalProperties}</p>
                </div>
                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">Pending Requests</p>
                    <p className="text-2xl font-bold">{pendingRequests}</p>
                </div>
            </div>
        </div>
    )
}