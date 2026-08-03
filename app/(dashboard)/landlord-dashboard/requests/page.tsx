
import { IncomingRequestsTable } from "@/components/dashboard/landlord/incoming-requests-table"
import { getIncomingRequests } from "../_actions/getIncomingRequests"
import { BlurFade } from "@/components/motion/blur-fade"

export default async function IncomingRequestsPage() {
    const requests = await getIncomingRequests()

    return (
        <BlurFade><div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Incoming Requests</h1>
            <IncomingRequestsTable requests={requests} />
        </div>
        </BlurFade>
    )
}