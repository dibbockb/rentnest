'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CircleX, UserPen } from "lucide-react"
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteUser } from "@/app/(dashboard)/admin-dashboard/_actions/deleteUser"
import { EditUserModal } from "@/components/dashboard/admin/edit-user-modal"
import { toast } from "sonner"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"

type User = {
    id: string
    name: string
    email: string
    role: "TENANT" | "LANDLORD" | "ADMIN"
    profilePhoto: string
    is_banned: boolean
    created_at: string
    updated_at: string
}

type Meta = {
    total: number
    page: number
    limit: number
    totalPages: number
} | null

export function AllUsersTable({ users, meta }: { users: User[], meta: Meta }) {

    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
    const [editTarget, setEditTarget] = useState<User | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const safeUsers = Array.isArray(users) ? users : []

    const [search, setSearch] = useState("")

    const filtered = safeUsers.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )

    const goToPage = (page: number) => {
        router.push(`${pathname}?page=${page}`)
    }

    const handleDelete = async () => {
        if (!deleteTargetId) return
        setIsDeleting(true)

        try {
            const result = await deleteUser(deleteTargetId)
            if (result.success) {
                toast.success("User deleted.")
                router.refresh()
            } else {
                toast.error(result.message || "Something went wrong.")
            }
        } catch {
            toast.error("An unexpected error occurred.")
        } finally {
            setIsDeleting(false)
            setDeleteTargetId(null)
        }
    }

    return (
        <>
            <div className="flex items-center gap-3 mb-4">
                <Input
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
                {meta && (
                    <span className="text-sm text-muted-foreground">
                        {meta.total} total users
                    </span>
                )}
            </div>

            {safeUsers.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center">No users yet.</p>
            ) : (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Created at</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground h-24">
                                        No matching users found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filtered.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="flex items-center gap-3">
                                            {user.profilePhoto ? (
                                                <Image
                                                    width={50}
                                                    height={50}
                                                    src={user.profilePhoto}
                                                    alt={user.name}
                                                    className="w-12 h-12 rounded-md object-cover"
                                                />
                                            ) : (
                                                <span className="w-12 h-12 rounded-md bg-secondary flex items-center justify-center text-sm font-medium">
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                            {user.name}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {new Date(user.created_at).toLocaleDateString('en-US', {
                                                month: 'short', day: '2-digit', year: 'numeric'
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{user.role}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={user.is_banned ? "destructive" : "default"}>
                                                {user.is_banned ? "Banned" : "Active"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="align-middle">
                                            <div className="flex justify-center items-center gap-2">
                                                <Button
                                                    className="w-8 h-8 p-0"
                                                    variant="outline"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setEditTarget(user)
                                                    }}
                                                >
                                                    <UserPen className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    className="w-8 h-8 p-0"
                                                    variant="destructive"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setDeleteTargetId(user.id)
                                                    }}
                                                >
                                                    <CircleX className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    {meta && meta.totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={meta.page === 1}
                                onClick={() => goToPage(meta.page - 1)}
                            >
                                Previous
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                Page {meta.page} of {meta.totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={meta.page === meta.totalPages}
                                onClick={() => goToPage(meta.page + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            )}

            {editTarget && (
                <EditUserModal
                    user={editTarget}
                    open={!!editTarget}
                    onOpenChange={(open) => !open && setEditTarget(null)}
                />
            )}

            <AlertDialog
                open={!!deleteTargetId}
                onOpenChange={(open) => !open && setDeleteTargetId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this user?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This cannot be undone. The account and all associated data will be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault()
                                handleDelete()
                            }}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? <Spinner /> : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}