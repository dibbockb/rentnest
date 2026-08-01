import { AllUsersTable } from "@/components/dashboard/admin/users-table"
import { getAllUsers } from "../_actions/getAllUsers"

export default async function IncomingRequestsPage() {
    const requests = await getAllUsers()

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage all Users</h1>
            <AllUsersTable users={requests} />
        </div>
    )
}