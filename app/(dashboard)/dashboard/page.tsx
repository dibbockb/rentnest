// app/(dashboard)/dashboard/page.tsx
import { getUserSentRequest } from "./_actions/getUserSentRequest"
import { getAllPayments } from "./_actions/getAllPayments"
import { BlurFade } from "@/components/motion/blur-fade"

export default async function TenantDashboardPage() {
    const [requests, payments] = await Promise.all([
        getUserSentRequest(),
        getAllPayments(),
    ])

    const totalRequests = requests.length
    const pendingRequests = requests.filter((r: any) => r.status === "PENDING").length
    const completedPayments = payments.filter((p: any) => p.status === "COMPLETED").length

    return (
        <BlurFade><div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">Total Requests</p>
                    <p className="text-2xl font-bold">{totalRequests}</p>
                </div>
                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">Pending Requests</p>
                    <p className="text-2xl font-bold">{pendingRequests}</p>
                </div>
                <div className="rounded-xl border p-4">
                    <p className="text-sm text-muted-foreground">Completed Payments</p>
                    <p className="text-2xl font-bold">{completedPayments}</p>
                </div>
            </div>
        </div></BlurFade>
    )
}