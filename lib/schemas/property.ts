import * as z from "zod"

export const PropertySchema = z.object({
    location: z.string().min(3, { error: "Location must be at least 3 characters." }),
    price: z.number({ error: "Price must be a number." }).min(1, { error: "Price must be greater than 0." }),
    category_name: z.string().min(1, { error: "Please select a category." }),
    images: z.array(z.string().url({ message: "Each image must be a valid URL." })).min(1, { error: "Add at least one image." }),
})

export type PropertyInput = z.infer<typeof PropertySchema>