'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ReviewSchema, type ReviewInput } from "@/lib/schemas/review"
import { createReview } from "@/app/(dashboard)/dashboard/_actions/createReview"
import { Spinner } from "@/components/ui/spinner"

export function CreateReviewModal({
    propertyId,
    open,
    onOpenChange,
}: {
    propertyId: string
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const [hoveredStar, setHoveredStar] = useState(0)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ReviewInput>({
        resolver: zodResolver(ReviewSchema),
        defaultValues: { stars: 0, content: "" },
    })

    const selectedStars = watch("stars")

    const onSubmit = async (data: ReviewInput) => {
        const result = await createReview(propertyId, data)

        if (result.success) {
            toast.success("Review submitted!")
            reset()
            onOpenChange(false)
        } else {
            toast.error(result.message || "Could not submit review.")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Leave a Review</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">

                    {/* Star rating */}
                    <div>
                        <label className="text-sm font-medium block mb-2">Rating</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onMouseEnter={() => setHoveredStar(star)}
                                    onMouseLeave={() => setHoveredStar(0)}
                                    onClick={() => setValue("stars", star, { shouldValidate: true })}
                                >
                                    <Star
                                        className={`w-8 h-8 transition-colors ${star <= (hoveredStar || selectedStars)
                                            ? "fill-black text-black transition-all duration-300"
                                            : "text-muted-foreground"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        {errors.stars && (
                            <p className="text-sm text-red-500 mt-1">{errors.stars.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-1">Review</label>
                        <Textarea
                            {...register("content")}
                            placeholder="Share your experience with this property..."
                            rows={4}
                        />
                        {errors.content && (
                            <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full h-10" disabled={isSubmitting}>
                        {isSubmitting ? <Spinner></Spinner> : "Submit Review"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}