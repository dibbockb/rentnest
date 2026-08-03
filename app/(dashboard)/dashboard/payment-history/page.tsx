import { PaymentsTable } from "@/components/dashboard/tenant/payments-log-table"
import { getAllPayments } from "../_actions/getAllPayments"
import { BlurFade } from "@/components/motion/blur-fade"

export default async function MyRequestsPage() {
    const payments = await getAllPayments()

    return (
        <BlurFade> <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Payments</h1>
            <PaymentsTable payments={payments} />
        </div></BlurFade>
    )
}