'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { createPaymentSession } from "@/app/(dashboard)/dashboard/_actions/createPaymentSession"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { CreateReviewModal } from "./create-review-modal"

type RentalRequest = {
    id: string
    status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED"
    property_id: string
    created_at: string
    property: {
        id: string;
        location: string;
        price: number;
        images: string[];
    }
}

const statusVariant: Record<RentalRequest["status"], "secondary" | "default" | "destructive"> = {
    PENDING: "secondary",
    APPROVED: "default",
    REJECTED: "destructive",
    COMPLETED: "default",
}

export function RequestsTable({ requests }: { requests: RentalRequest[] }) {
    if (requests.length === 0) {
        return <p className="text-muted-foreground">You haven&apos;t sent any rental requests yet.</p>
    }

    const [isProcessing, setIsprocessing] = useState(false)
    const [reviewTarget, setReviewTarget] = useState<{ requestId: string; propertyId: string } | null>(null)
    const [processingId, setProcessingId] = useState<string | null>(null)
    const router = useRouter()

    const handleCheckout = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        setProcessingId(id)
        setIsprocessing(true)
        const result = await createPaymentSession(id)
        if (!result) {
            toast.error("Could not create payment session.")
            setIsprocessing(false)
            setProcessingId(null)
            return
        }
        router.push(result)
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.map((req) => (
                        <TableRow key={req.id} onClick={() => { (router.push(`/property/${req.property_id}`)) }}>
                            <TableCell className="flex items-center gap-3">
                                <span className="w-12 h-12 rounded-md bg-muted">
                                    {req.property.images?.[0] ? (
                                        <Image
                                            width={50}
                                            height={50}
                                            src={req.property.images[0]}
                                            alt={req.property.location}
                                            className="w-12 h-12 rounded-md object-cover"
                                        />
                                    ) : <span className="w-12 h-12 rounded-md object-cover bg-secondary">{req.property.location}</span>}
                                </span>
                                {req.property.location}
                            </TableCell>
                            <TableCell>$ {req.property.price.toLocaleString()}</TableCell>
                            <TableCell>
                                {new Date(req.created_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: '2-digit',
                                    year: 'numeric'
                                })}
                            </TableCell>
                            <TableCell>
                                <Badge variant={statusVariant[req.status]}>{req.status}</Badge>
                            </TableCell>
                            <TableCell className="align-middle text-center">
                                {req.status === "APPROVED" && (
                                    <Button
                                        size="sm"
                                        onClick={(e) => handleCheckout(e, req.id)}
                                    >
                                        {processingId === req.id ? <Spinner /> : "Pay Now"}
                                    </Button>
                                )}
                                {req.status === "COMPLETED" && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setReviewTarget({ requestId: req.id, propertyId: req.property_id })
                                        }}
                                    >
                                        Leave Review
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {reviewTarget && (
                <CreateReviewModal
                    propertyId={reviewTarget.propertyId}
                    open={!!reviewTarget}
                    onOpenChange={(open) => !open && setReviewTarget(null)}
                />
            )}
        </>


    )
}