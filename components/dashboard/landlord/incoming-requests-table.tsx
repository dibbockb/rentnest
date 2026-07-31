'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type IncomingRequest = {
    id: string
    status: "PENDING" | "APPROVED" | "REJECTED"
    property: { id: string; location: string; price: number; images: string[] }
    tenant: { id: string; name: string; email: string }
}

const statusVariant: Record<IncomingRequest["status"], "secondary" | "default" | "destructive"> = {
    PENDING: "secondary",
    APPROVED: "default",
    REJECTED: "destructive",
}

export function IncomingRequestsTable({ requests }: { requests?: IncomingRequest[] | null }) {
    const safeRequests = Array.isArray(requests) ? requests : []

    if (safeRequests.length === 0) {
        return <p className="text-muted-foreground">No rental requests yet.</p>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-left">Property</TableHead>
                    <TableHead className="">Tenant</TableHead>
                    <TableHead className="">Price</TableHead>
                    <TableHead className="">Status</TableHead>
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
                        <TableCell>৳{(req.property?.price ?? 0).toLocaleString()}</TableCell>
                        <TableCell>
                            <Badge variant={statusVariant[req.status]}>{req.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            {req.status === "PENDING" && (
                                <div className="flex gap-2 justify-center">
                                    <Button size="lg" variant="outline" onClick={() => { /* TODO: reject action */ }}>
                                        Reject
                                    </Button>
                                    <Button size="lg" onClick={() => { /* TODO: approve action */ }}>
                                        Approve
                                    </Button>
                                </div>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}