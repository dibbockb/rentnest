import * as z from 'zod'

export const RegisterSchema = z.object({
    name: z.string().min(3, { error: 'Please enter atleast 3 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(3, { message: 'Password must be at least 3 characters.' }),
    confirmPassword: z.string().min(3, { error: 'Please confirm your password.' }),
    role: z.enum(['TENANT', 'LANDLORD'])
})
    .refine((data) => data.password === data.confirmPassword, {
        error: 'Password do not match',
        path: ['confirmPassowrd']
    })

export type RegisterInput = z.infer<typeof RegisterSchema>