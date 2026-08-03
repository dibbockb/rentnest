import { RequestsTable } from "@/components/dashboard/tenant/requests-table"
import { getUserSentRequest } from "../_actions/getUserSentRequest"
import { BlurFade } from "@/components/motion/blur-fade"

export default async function MyRequestsPage() {
    const requests = await getUserSentRequest()

    return (
        <BlurFade>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">My Requests</h1>
                <RequestsTable requests={requests} />
            </div>
        </BlurFade>
    )
}