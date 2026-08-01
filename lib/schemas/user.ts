import * as z from "zod"

export const UpdateUserSchema = z.object({
    name: z.string().min(2, { error: "Name must be at least 2 characters." }).optional(),
    email: z.string().email({ error: "Please enter a valid email." }).optional(),
    role: z.enum(["TENANT", "LANDLORD", "ADMIN"]).optional(),
    is_banned: z.boolean().optional(),
})

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>