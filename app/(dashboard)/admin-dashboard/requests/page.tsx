import { BlurFade } from "@/components/motion/blur-fade"
import { getAllRequests } from "../_actions/getAllRequests"
import { AllRequestsTable } from "@/components/dashboard/admin/all-requests-table"

export default async function IncomingRequestsPage() {
    const requests = await getAllRequests()

    return (
        <BlurFade> <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">View all Requests</h1>
            <AllRequestsTable requests={requests} />
        </div></BlurFade>
    )
}