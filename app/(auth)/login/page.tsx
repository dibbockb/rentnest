'use client'

import { useActionState, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Mail, Lock, Home } from 'lucide-react'
import { loginAction } from '../_actions/authActions'
import { Spinner } from '@/components/ui/spinner'
import { useAuthStore } from '@/lib/useAuthStore'
import { jwtDecode } from 'jwt-decode'

export default function LoginPage() {
    const router = useRouter()
    const setUser = useAuthStore((state) => state.setUser)
    const [state, action, pending] = useActionState(loginAction, false)

    useEffect(() => {
        if (!state) return

        if (state.success) {
            const decodedUser: any = jwtDecode(state.data.accessToken)
            setUser({
                id: decodedUser.id,
                name: decodedUser.name || "User",
                email: decodedUser.email || "",
                role: decodedUser.role
            })

            toast.success(state.message || "Logged in successfully.")
            router.push('/')
            router.refresh()
        } else {
            toast.error(state.message || "Unable to login.")
        }
    }, [state, setUser, router])

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <Home className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-bold">RentNest</span>
                </Link>

                <Card className="p-8">
                    <h1 className="text-3xl font-bold text-foreground text-center">Welcome Back!</h1>
                    <p className="text-center text-muted-foreground mb-8">
                        Log in to your account
                    </p>

                    <form action={action} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="jhondoe@gmail.com"
                                    className="pl-10"
                                />
                            </div>
                            {/* {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                            )} */}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground block mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="your strong password"
                                    className="pl-10"
                                />
                            </div>
                            {/* {errors.password && (
                                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                            )} */}
                        </div>

                        <Button type="submit" className="w-full h-10">
                            {pending ? <Spinner /> : "Log In"}
                        </Button>
                    </form>

                    <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
                        <p className="text-xs font-semibold text-foreground mb-2">Demo Credentials:</p>
                        <div className="space-y-1 text-xs text-muted-foreground">
                            <p><strong>Tenant:</strong> tenant@rentnest.com</p>
                            <p><strong>Landlord:</strong> landlord@rentnest.com</p>
                            <p><strong>Admin:</strong> admin@rentnest.com</p>
                            <p><strong>Password:</strong> 123</p>
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-muted-foreground">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-primary hover:underline font-semibold">
                                Sign up
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
