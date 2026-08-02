'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

type PaymentLog = {
    id: string
    method: string
    provider: string
    rental_request_id: string
    transaction_id: string
    amount: number
    status: string
    paid_at: string
    rental_request: {
        property_id: string
        status: string
    }
}

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
    COMPLETED: "default",
    PENDING: "secondary",
    FAILED: "destructive",
}

export function PaymentsTable({ payments }: { payments?: PaymentLog[] | null }) {
    const safePayments = Array.isArray(payments) ? payments : []
    const router = useRouter()

    if (safePayments.length === 0) {
        return <p className="text-muted-foreground">You do not have any payments yet.</p>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Property ID</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid At</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {safePayments.map((payment) => (
                    <TableRow key={payment.id} onClick={() => { router.push(`/property/${payment.rental_request?.property_id}`) }}>
                        <TableCell className="align-middle font-mono text-xs text-muted-foreground">
                            {payment.rental_request?.property_id?.slice(0, 8)}...
                        </TableCell>
                        <TableCell className="align-middle">{payment.method}</TableCell>
                        <TableCell className="align-middle">{payment.provider}</TableCell>
                        <TableCell className="align-middle">
                            ${(payment.amount / 100).toLocaleString()}
                        </TableCell>
                        <TableCell className="align-middle text-sm text-muted-foreground">
                            {new Date(payment.paid_at).toLocaleDateString('en-US', {
                                month: 'short', day: '2-digit', year: 'numeric'
                            })}
                        </TableCell>
                        <TableCell className="align-middle">
                            <Badge variant={statusVariant[payment.status] ?? "secondary"}>
                                {payment.status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}