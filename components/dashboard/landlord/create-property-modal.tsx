'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { PropertySchema, type PropertyInput } from "@/lib/schemas/property"
import { createProperty } from "@/app/(dashboard)/landlord-dashboard/_actions/createProperty"
import { Spinner } from "@/components/ui/spinner"


export function CreatePropertyModal() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [imageInput, setImageInput] = useState("")
    const [images, setImages] = useState<string[]>([])

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PropertyInput>({
        resolver: zodResolver(PropertySchema),
        defaultValues: {
            location: "",
            price: 0,
            category_name: "",
            images: []
        },
    })

    const addImage = () => {
        const trimmed = imageInput.trim()
        if (!trimmed) return
        const updated = [...images, trimmed]
        setImages(updated)
        setValue("images", updated, { shouldValidate: true })
        setImageInput("")
    }

    const removeImage = (index: number) => {
        const updated = images.filter((_, i) => i !== index)
        setImages(updated)
        setValue("images", updated, { shouldValidate: true })
    }

    const onSubmit = async (data: PropertyInput) => {
        const result = await createProperty(data)

        if (result.success) {
            toast.success("Property listed successfully!")
            reset()
            setImages([])
            setOpen(false)
            router.refresh()
        } else {
            toast.error(result.message || "Could not create property.")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-12">
                    <Plus className="w-4 h-4 mr-2" />
                    New Property
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>List a New Property</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">

                    {/* Location */}
                    <div>
                        <label className="text-sm font-medium block mb-1">Location</label>
                        <Input {...register("location")} placeholder="e.g. Dhanmondi, Dhaka" />
                        {errors.location && (
                            <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="text-sm font-medium block mb-1">Monthly Rent</label>
                        <Input
                            type="number"
                            placeholder="e.g. 25000"
                            {...register("price", { valueAsNumber: true })}
                        />
                        {errors.price && (
                            <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="text-sm font-medium block mb-1">Category</label>
                        <Input {...register("category_name")} placeholder="e.g. Apartment, Studio, Duplex" />
                        {errors.category_name && (
                            <p className="text-sm text-red-500 mt-1">{errors.category_name.message}</p>
                        )}
                    </div>

                    {/* Images */}
                    <div>
                        <label className="text-sm font-medium block mb-1">Image URLs</label>
                        <div className="flex gap-2">
                            <Input
                                className="max-w-100%"
                                value={imageInput}
                                onChange={(e) => setImageInput(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault()
                                        addImage()
                                    }
                                }}
                            />
                            <Button type="button" variant="outline" onClick={addImage}>Add</Button>
                        </div>
                        {errors.images && (
                            <p className="text-sm text-red-500 mt-1">{errors.images.message}</p>
                        )}
                        {images.length > 0 && (
                            <ul className="mt-2 space-y-1 max-w-98">
                                {images.map((url, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <img src={url} className="w-8 h-8 rounded object-cover" />
                                        <span className="truncate flex-1">{url}</span>
                                        <button type="button" onClick={() => removeImage(i)}>
                                            <X className="w-4 h-4 text-red-500" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
                        {isSubmitting ? <Spinner></Spinner> : "Create Property"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}