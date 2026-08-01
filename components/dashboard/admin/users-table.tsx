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
import { toast } from "sonner"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"

type User = {
    id: string
    name: string
    email: string
    role: string,
    profilePhoto: string,
    is_banned: boolean,
    created_at: string
    updated_at: string
}

type PendingAction = {
    type: "delete" | "edit"
    userId: string
} | null

export function AllUsersTable({ users }: { users: User[] }) {
    const [pendingAction, setPendingAction] = useState<PendingAction>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const router = useRouter()

    if (users.length === 0) {
        return <p className="text-muted-foreground">No users yet.</p>
    }

    const handleEditClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        setPendingAction({ type: "edit", userId: id })
    }

    const handleDeleteClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        setPendingAction({ type: "delete", userId: id })
    }

    const handleConfirm = async () => {
        if (!pendingAction) return

        setIsProcessing(true)
        try {
            if (pendingAction.type === "delete") {
                const result = await deleteUser(pendingAction.userId)
                if (result.success) {
                    toast.success("User Deleted")
                    router.refresh()
                } else {
                    toast.info(result.message || "Something went wrong.")
                }
            } else if (pendingAction.type === "edit") {
                console.log("Editing user:", pendingAction.userId)
            }
        } catch (error) {
            toast.error("An unexpected error occurred.")
        } finally {
            setIsProcessing(false)
            setPendingAction(null)
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
                                ) : <span className="w-12 h-12 rounded-md object-cover bg-secondary"></span>}
                                {user.name}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                {new Date(user.created_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: '2-digit',
                                    year: 'numeric'
                                })}
                            </TableCell>
                            <TableCell>
                                <Badge variant={"outline"}>{user.role}</Badge>
                            </TableCell>

                            <TableCell className="flex justify-center items-center gap-2 h-full ">
                                <Button className="w-8 h-8 p-0" variant="outline" onClick={(e) => handleEditClick(e, user.id)}>
                                    <UserPen className="w-4 h-4" />
                                </Button>
                                <Button className="w-8 h-8 p-0" variant="destructive" onClick={(e) => handleDeleteClick(e, user.id)}>
                                    <CircleX className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Reusable Alert Dialog placed outside the table body loop */}
            <AlertDialog open={!!pendingAction} onOpenChange={(open) => !open && setPendingAction(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {pendingAction?.type === "delete" ? "Delete this user?" : "Edit this user?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {pendingAction?.type === "delete"
                                ? "This action cannot be undone. This will permanently delete the user account and remove their data from our servers."
                                : "You are about to edit user details."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault()
                                handleConfirm()
                            }}
                            disabled={isProcessing}
                            className={pendingAction?.type === "delete" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
                        >
                            {isProcessing ? <Spinner /> : "Confirm"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}