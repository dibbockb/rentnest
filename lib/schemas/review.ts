import * as z from "zod"

export const ReviewSchema = z.object({
    stars: z.number().min(1).max(5, { error: "Rating must be between 1 and 5." }),
    content: z.string().min(10, { error: "Review must be at least 10 characters." }),
})

export type ReviewInput = z.infer<typeof ReviewSchema>