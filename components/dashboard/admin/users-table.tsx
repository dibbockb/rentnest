'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
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

export function AllUsersTable({ users }: { users: User[] }) {
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
    const [editTarget, setEditTarget] = useState<User | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    if (users.length === 0) {
        return <p className="text-muted-foreground">No users yet.</p>
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
                    {users.map((user) => (
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
                    ))}
                </TableBody>
            </Table>

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