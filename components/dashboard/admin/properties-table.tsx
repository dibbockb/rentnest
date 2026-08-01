'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Spinner } from "@/components/ui/spinner"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteProperty } from "@/app/(dashboard)/admin-dashboard/_actions/deleteProperty"

type Property = {
    id: string
    location: string
    price: number
    is_available: boolean
    images: string[]
    created_at: string
    landlord_id: string
}

export function AllPropertiesTable({ properties }: { properties?: Property[] | null }) {
    const router = useRouter()
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const safeProperties = Array.isArray(properties) ? properties : []

    const handleDelete = async () => {
        if (!deleteTargetId) return
        setIsDeleting(true)
        try {
            const result = await deleteProperty(deleteTargetId)
            if (result.success) {
                toast.success("Property deleted.")
            }
            router.refresh()
        } catch {
            toast.error("Could not delete property.")
        } finally {
            setIsDeleting(false)
            setDeleteTargetId(null)
        }
    }

    if (safeProperties.length === 0) {
        return <p className="text-muted-foreground">No properties yet.</p>
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Availability</TableHead>
                        <TableHead>Listed On</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {safeProperties.map((property) => (
                        <TableRow key={property.id}>
                            <TableCell className="align-middle">
                                <div className="flex items-center gap-3">
                                    {property.images?.[0] ? (
                                        <img
                                            src={property.images[0]}
                                            alt={property.location}
                                            className="w-12 h-12 rounded-md object-cover"
                                        />
                                    ) : (
                                        <span className="w-12 h-12 rounded-md bg-secondary" />
                                    )}
                                    <span>{property.location}</span>
                                </div>
                            </TableCell>
                            <TableCell className="align-middle">
                                ${property.price.toLocaleString()}
                            </TableCell>
                            <TableCell className="align-middle">
                                <Badge variant={property.is_available ? "default" : "secondary"}>
                                    {property.is_available ? "Available" : "Unavailable"}
                                </Badge>
                            </TableCell>
                            <TableCell className="align-middle text-sm text-muted-foreground">
                                {new Date(property.created_at).toLocaleDateString('en-US', {
                                    month: 'short', day: '2-digit', year: 'numeric'
                                })}
                            </TableCell>
                            <TableCell className="align-middle">
                                <div className="flex justify-center">
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        className="w-8 h-8 p-0"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setDeleteTargetId(property.id)
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <AlertDialog
                open={!!deleteTargetId}
                onOpenChange={(open) => !open && setDeleteTargetId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this property?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently remove the listing and all associated rental requests.
                            This can&apos;t be undone.
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