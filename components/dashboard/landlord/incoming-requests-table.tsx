'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { approveRequest } from "@/app/(dashboard)/landlord-dashboard/_actions/approveRequest"
import { rejectRequest } from "@/app/(dashboard)/landlord-dashboard/_actions/rejectRequest"
import { Spinner } from "@/components/ui/spinner"

type IncomingRequest = {
    id: string
    status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED"
    property: { id: string; location: string; price: number; images: string[] }
    tenant: { id: string; name: string; email: string }
}

const statusVariant: Record<IncomingRequest["status"], "secondary" | "default" | "destructive" | "outline"> = {
    PENDING: "outline",
    APPROVED: "default",
    REJECTED: "destructive",
    COMPLETED: "default",
}

type PendingAction = { id: string; type: "approve" | "reject" } | null

export function IncomingRequestsTable({ requests }: { requests?: IncomingRequest[] | null }) {
    const router = useRouter()
    const [pendingAction, setPendingAction] = useState<PendingAction>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const safeRequests = Array.isArray(requests) ? requests : []

    const handleConfirm = async () => {
        if (!pendingAction) return
        setIsProcessing(true)

        const result = pendingAction.type === "approve"
            ? await approveRequest(pendingAction.id)
            : await rejectRequest(pendingAction.id)

        if (result.success) {
            toast.success(pendingAction.type === "approve" ? "Request approved!" : "Request rejected.")
            router.refresh()
        } else {
            toast.error(result.message || "Something went wrong.")
        }

        setIsProcessing(false)
        setPendingAction(null)
    }

    if (safeRequests.length === 0) {
        return <p className="text-muted-foreground">No rental requests yet.</p>
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Property</TableHead>
                        <TableHead>Tenant</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {safeRequests.map((req) => (
                        <TableRow key={req.id}>
                            <TableCell className="flex items-center gap-3">
                                {req.property?.images?.[0] ? (
                                    <img
                                        src={req.property.images[0]}
                                        alt={req.property.location ?? "Property"}
                                        className="w-12 h-12 rounded-md object-cover"
                                    />
                                ) : null}
                                {req.property?.location ?? "Unknown property"}
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">{req.tenant?.name ?? "Unknown tenant"}</span>
                                    <span className="text-xs text-muted-foreground">{req.tenant?.email ?? "-"}</span>
                                </div>
                            </TableCell>
                            <TableCell>${(req.property?.price ?? 0).toLocaleString()}</TableCell>
                            <TableCell>
                                <Badge variant={statusVariant[req.status]}>{req.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                {req.status === "PENDING" && (
                                    <div className="flex gap-2 justify-center">
                                        <Button size="lg" onClick={() => setPendingAction({ id: req.id, type: "approve" })}>
                                            Approve
                                        </Button>
                                        <Button size="lg" variant="outline" onClick={() => setPendingAction({ id: req.id, type: "reject" })}>
                                            Reject
                                        </Button>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <AlertDialog open={!!pendingAction} onOpenChange={(open) => !open && setPendingAction(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {pendingAction?.type === "approve" ? "Approve this request?" : "Reject this request?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {pendingAction?.type === "approve"
                                ? "The tenant will be notified and can proceed to checkout to confirm the rental."
                                : "The tenant will be notified this request was declined. This can't be undone."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirm} disabled={isProcessing}>
                            {isProcessing ? <Spinner /> : "Confirm"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}