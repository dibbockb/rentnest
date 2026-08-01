'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { redirect, useRouter } from "next/navigation"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import Image from "next/image"

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

const statusVariant: Record<RentalRequest["status"], "secondary" | "default" | "destructive" | "default"> = {
    PENDING: "secondary",
    APPROVED: "default",
    REJECTED: "destructive",
    COMPLETED: "default",
}

export function AllRequestsTable({ requests }: { requests: RentalRequest[] }) {
    if (requests.length === 0) {
        return <p className="text-muted-foreground">No requests yet.</p>
    }

    const router = useRouter()
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {requests.map((req) => (
                    <TableRow key={req.id} onClick={() => { (router.push(`/property/${req.property_id}`)) }}>
                        <TableCell className="flex items-center gap-3">
                            {req.property.images?.[0] ? (
                                <Image
                                    width={50}
                                    height={50}
                                    src={req.property.images[0]}
                                    alt={req.property.location}
                                    className="w-12 h-12 rounded-md object-cover"
                                />
                            ) : <span className="w-12 h-12 rounded-md object-cover bg-secondary"></span>}
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
                        <TableCell className="text-right">



                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}