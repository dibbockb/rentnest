'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { UpdatePropertySchema, type UpdatePropertyInput } from "@/lib/schemas/property"
import { updateProperty } from "@/app/(dashboard)/landlord-dashboard/_actions/updateProperty"

type Property = {
    id: string
    location: string
    price: number
}

export function EditPropertyModal({
    property,
    open,
    onOpenChange,
}: {
    property: Property
    open: boolean
    onOpenChange: (open: boolean) => void
}) {

    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UpdatePropertyInput>({
        resolver: zodResolver(UpdatePropertySchema),
        defaultValues: {
            location: property.location,
            price: property.price,
        },
    })

    const onSubmit = async (data: UpdatePropertyInput) => {
        const payload = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined && v !== "")
        ) as UpdatePropertyInput

        const result = await updateProperty(property.id, payload)

        if (result.success) {
            toast.success("Property updated.")
            onOpenChange(false)
            router.refresh()
        } else {
            toast.error(result.message || "Could not update property.")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Property</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
                    <div>
                        <label className="text-sm font-medium block mb-1">Location</label>
                        <Input {...register("location")} placeholder="e.g. Dhanmondi, Dhaka" />
                        {errors.location && (
                            <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-1">Monthly Rent (৳)</label>
                        <Input
                            type="number"
                            {...register("price", { valueAsNumber: true })}
                        />
                        {errors.price && (
                            <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-1">Category</label>
                        <Input {...register("category_name")} placeholder="e.g. Apartment, Studio" />
                        {errors.category_name && (
                            <p className="text-sm text-red-500 mt-1">{errors.category_name.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full h-10" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}