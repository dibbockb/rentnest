'use client'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { loginSchema, type LoginInput } from '@/lib/schemas'
// import { useAuth } from '@/lib/auth-context'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Mail, Lock, Home } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()
    // const { login } = useAuth()
    const [isLoading, setIsLoading] = useState(false)


    const onSubmit = async (data: any) => {
        setIsLoading(true)
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
                    <h1 className="text-3xl font-bold text-foreground text-center">Welcome Back!</h1>
                    <p className="text-center text-muted-foreground mb-8">
                        Sign in to your account
                    </p>

                    <form onSubmit={() => { console.log(`form submitted`) }} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder="jhondoe@gmail.com"
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
                                    placeholder="your strong password"
                                    className="pl-10"
                                />
                            </div>
                            {/* {errors.password && (
                                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                            )} */}
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full h-10" disabled={isLoading}>
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
                        <p className="text-xs font-semibold text-foreground mb-2">Demo Credentials:</p>
                        <div className="space-y-1 text-xs text-muted-foreground">
                            <p><strong>Tenant:</strong> tenant@example.com</p>
                            <p><strong>Landlord:</strong> landlord@example.com</p>
                            <p><strong>Admin:</strong> admin@example.com</p>
                            <p><strong>Password:</strong> password123</p>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center mt-6">
                        <p className="text-muted-foreground">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-primary hover:underline font-semibold">
                                Sign up
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
