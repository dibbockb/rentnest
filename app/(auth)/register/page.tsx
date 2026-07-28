'use client'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { useAuth } from '@/lib/auth-context'
// import { registerSchema, type RegisterInput } from '@/lib/schemas'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Mail, Lock, User as UserIcon, Home, Users } from 'lucide-react'

export default function RegisterPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    // const { register: registerUser } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const defaultRole = (searchParams.get('role') as 'TENANT' | 'LANDLORD') || 'TENANT'

    //     const {
    //         register,
    //         handleSubmit,
    //         formState: { errors },
    //         watch,
    //         setValue,
    //     } = useForm<RegisterInput>({
    //         resolver: zodResolver(registerSchema),
    //         defaultValues: { role: defaultRole },
    //     })
    // 
    //     const selectedRole = watch('role')

    const onSubmit = async (data: any) => {
        setIsLoading(true)
        try {
            // await registerUser(data.name, data.email, data.password, data.role)
            toast.success('Registration successful!')
            const dashboardMap: { [key: string]: string } = {
                TENANT: '/dashboard/tenant',
                LANDLORD: '/dashboard/landlord',
                ADMIN: '/dashboard/admin',
            }
            router.push(dashboardMap[data.role] || '/dashboard/tenant')
        } catch (error) {
            toast.error('Registration failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <Home className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-bold">RentNest</span>
                </Link>

                {/* Card */}
                <Card className="p-8">
                    <h1 className="text-3xl font-bold text-foreground text-center">Create Account</h1>
                    <p className="text-center text-muted-foreground mb-8">
                        Join RentNest and start your rental journey
                    </p>

                    <form onSubmit={() => { }} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="text-sm font-medium text-foreground block mb-2">Full Name</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="John Doe"
                                    className="pl-10"
                                />
                            </div>
                            {/* {errors.name && (
                                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                            )} */}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="pl-10"
                                />
                            </div>
                            {/* {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                            )} */}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium text-foreground block mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                />
                            </div>
                            {/* {errors.password && (
                                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                            )} */}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="text-sm font-medium text-foreground block mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                />
                            </div>
                            {/* {errors.confirmPassword && (
                                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                            )} */}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground block mb-3">Role :</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    // onClick={() => setValue('role', 'TENANT')}
                                    className={`p-3 rounded-lg border transition flex flex-col items-center gap-2 hover:bg-neutral-100`}

                                //    {selectedRole === 'TENANT'
                                //     ? 'border-primary bg-primary/10'
                                //     : 'border-border bg-muted/50 hover:border-border'
                                //     }`}
                                >
                                    <Users className="w-5 h-5" />
                                    <span className="text-sm font-semibold">Tenant</span>
                                </button>
                                <button
                                    type="button"
                                    // onClick={() => setValue('role', 'LANDLORD')}
                                    className={`p-3 rounded-lg border transition flex flex-col items-center gap-2 hover:bg-neutral-100`}

                                // ${selectedRole === 'LANDLORD'
                                //     ? 'border-primary bg-primary/10'
                                //     : 'border-border bg-muted/50 hover:border-border'
                                //     }`}
                                >
                                    <Home className="w-5 h-5" />
                                    <span className="text-sm font-semibold">Landlord</span>
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full h-10" disabled={isLoading}>
                            {isLoading ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </form>

                    {/* Sign In Link */}
                    <div className="text-center mt-6">
                        <p className="text-muted-foreground">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary hover:underline font-semibold">
                                Log in
                            </Link>
                        </p>
                    </div>
                </Card>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link href="/" className="text-muted-foreground hover:text-foreground transition">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
