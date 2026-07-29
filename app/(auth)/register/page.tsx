'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Mail, Lock, User as UserIcon, Home, Users } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterInput, RegisterSchema } from '@/lib/schemas/register'
import { Spinner } from '@/components/ui/spinner'
import { registerAction } from '../_actions/authActions'
import { useAuthStore } from '@/lib/useAuthStore'
import jwt from "jsonwebtoken"


export default function RegisterPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const defaultRole = (searchParams.get('role') as 'TENANT' | 'LANDLORD') || 'TENANT'
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<RegisterInput>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: { role: defaultRole }
    })
    const selectedRole = watch('role')
    const setUser = useAuthStore((state) => state.setUser)

    const onSubmit = async (data: RegisterInput) => {
        setIsLoading(true)
        try {
            const result = await registerAction(data)
            if (result?.success) {
                const decodedUser: any = jwt.decode(result.data.accessToken)
                setUser({
                    id: decodedUser.id,
                    name: decodedUser.name || "User",
                    email: decodedUser.email || "",
                    role: decodedUser.role
                })
                router.push("/dashboard")
                router.refresh()
                toast.success('Registration successful!')
            } else {
                toast.error(result?.message || "Registration failed.")
            }
        } catch (error) {
            toast.error('Registration failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <Home className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-bold">RentNest</span>
                </Link>

                <Card className="p-8">
                    <h1 className="text-3xl font-bold text-foreground text-center">Create Account</h1>
                    <p className="text-center text-muted-foreground mb-8">
                        Join RentNest and start your rental journey
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div>
                            <label className="text-sm font-medium text-foreground block mb-2">Full Name</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    {...register('name')}
                                    type="text"
                                    placeholder="John Doe"
                                    className="pl-10"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    {...register('email')}
                                    type="email"
                                    placeholder="you@example.com"
                                    className="pl-10"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground block mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    {...register('password')}
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground block mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    {...register('confirmPassword')}
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground block mb-3">Role :</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setValue('role', 'TENANT', { shouldValidate: true })}
                                    className={`p-3 rounded-lg border transition flex flex-col items-center gap-2 ${selectedRole === 'TENANT'
                                        ? 'border bg-primary/10'
                                        : 'border bg-muted/50'
                                        }`}
                                >
                                    <Users className="w-5 h-5" />
                                    <span className="text-sm font-semibold">Tenant</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setValue('role', 'LANDLORD', { shouldValidate: true })}
                                    className={`p-3 rounded-lg border transition flex flex-col items-center gap-2 ${selectedRole === 'LANDLORD'
                                        ? 'border bg-primary/10'
                                        : 'border bg-muted/50'
                                        }`}
                                >
                                    <Home className="w-5 h-5" />
                                    <span className="text-sm font-semibold">Landlord</span>
                                </button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-10" disabled={isLoading}>
                            {isLoading ? <Spinner /> : 'Create Account'}
                        </Button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-muted-foreground">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary hover:underline font-semibold">
                                Log in
                            </Link>
                        </p>
                    </div>
                </Card>

                <div className="text-center mt-6">
                    <Link href="/" className="text-muted-foreground hover:text-foreground transition">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
