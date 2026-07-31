export default function LandlordDashboardPage() {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Overview</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">Total Properties</p>
                    <p className="text-2xl font-bold">—</p>
                </div>
                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">Pending Requests</p>
                    <p className="text-2xl font-bold">—</p>
                </div>
                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">Active Rentals</p>
                    <p className="text-2xl font-bold">—</p>
                </div>
            </div>
        </div>
    )
}