import { PaymentsTable } from "@/components/dashboard/tenant/payments-log-table"
import { getAllPayments } from "../_actions/getAllPayments"

export default async function MyRequestsPage() {
    const payments = await getAllPayments()

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Requests</h1>
            <PaymentsTable payments={payments} />
        </div>
    )
}