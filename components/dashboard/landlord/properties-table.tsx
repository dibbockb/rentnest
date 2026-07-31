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
import { Spinner } from "@/components/ui/spinner"
import { Pencil, Trash2 } from "lucide-react"
import { deleteProperty } from "@/app/(dashboard)/landlord-dashboard/_actions/deleteProperty"
import { EditPropertyModal } from "./edit-property-modal"

type Property = {
    id: string
    location: string
    price: number
    is_available: boolean
    images: string[]
    category_id: string
    created_at: string
}

export function PropertiesTable({ properties }: { properties?: Property[] | null }) {
    const router = useRouter()
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
    const [editTarget, setEditTarget] = useState<Property | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const safeProperties = Array.isArray(properties) ? properties : []

    const handleDelete = async () => {
        if (!deleteTargetId) return
        setIsDeleting(true)
        const result = await deleteProperty(deleteTargetId)
        if (result.success) {
            toast.success("Property deleted.")
            router.refresh()
        } else {
            toast.error(result.message || "Could not delete property.")
        }

        setIsDeleting(false)
        setDeleteTargetId(null)
    }

    if (safeProperties.length === 0) {
        return <p className="text-muted-foreground">You haven&apos;t listed any properties yet.</p>
    }


    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Property</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Availability</TableHead>
                        <TableHead>Listed On</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {safeProperties.map((property) => (
                        <TableRow onClick={() => { router.push(`/property/${property.id}`) }} key={property.id}>
                            <TableCell className="flex items-center gap-3">
                                {property.images?.[0] ? (
                                    <img
                                        src={property.images[0]}
                                        alt={property.location}
                                        className="w-12 h-12 rounded-md object-cover"
                                    />
                                ) : <span className="w-12 h-12 rounded-md object-cover bg-secondary"></span>}
                                <span className="">{property.location}</span>
                            </TableCell>
                            <TableCell>${property.price.toLocaleString()}</TableCell>
                            <TableCell>
                                <Badge variant={property.is_available ? "default" : "secondary"}>
                                    {property.is_available ? "Available" : "Unavailable"}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                                {new Date(property.created_at).toLocaleDateString("en-GB", {
                                    day: "numeric", month: "short", year: "numeric"
                                })}
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2 justify-center">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setEditTarget(property)
                                        }}
                                    >
                                        <Pencil className="w-4 h-4 mr-1" />
                                        Edit
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="destructive"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setDeleteTargetId(property.id)
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >

            {editTarget && (
                <EditPropertyModal
                    property={editTarget}
                    open={!!editTarget}
                    onOpenChange={(open) => !open && setEditTarget(null)}
                />
            )
            }

            <AlertDialog
                open={!!deleteTargetId}
                onOpenChange={(open) => !open && setDeleteTargetId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this property?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently remove the listing. Any pending requests
                            for this property will also be affected. This can&apos;t be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? <Spinner /> : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}