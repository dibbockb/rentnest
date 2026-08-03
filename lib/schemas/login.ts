import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(3, { message: 'Password must be at least 3 characters.' }),
})

export type LoginInput = z.infer<typeof LoginSchema>