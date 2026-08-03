import { AllUsersTable } from "@/components/dashboard/admin/users-table"
import { getAllUsers } from "../_actions/getAllUsers"

interface PageProps {
    searchParams: Promise<{ page?: string }>
}

export default async function ManageUsersPage({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams
    const parsedPage = parseInt(resolvedSearchParams?.page || "1", 10)
    const currentPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage

    const { users, meta } = await getAllUsers(currentPage, 10)

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Manage all Users ({meta?.total ?? 0})
            </h1>
            <AllUsersTable users={users} meta={meta} />
        </div>
    )
}