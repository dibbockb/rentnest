'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/lib/useAuthStore'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from 'sonner'
import { logoutUser } from '@/app/(auth)/_actions/authActions'

export function Navbar() {
    const { user, logout } = useAuthStore()
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = async () => {
        logoutUser()
        logout()
        toast.success(`Logged out.`)
    }

    return (
        <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">
                    <Link href="/" className="flex items-center gap-2 font-semibold text-lg tracking-tight hover:opacity-80 transition-opacity">
                        <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                            <Home className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="text-foreground hidden sm:inline">RentNest</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        <Link href="/" className="text-sm text-foreground/80 hover:text-foreground px-3 py-2 transition">
                            Home
                        </Link>
                        <Link href="/browse" className="text-sm text-foreground/80 hover:text-foreground px-3 py-2 transition">
                            Browse
                        </Link>
                        <Link href="/dashboard" className="text-sm text-foreground/80 hover:text-foreground px-3 py-2 transition">
                            Dashboard
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <User className="w-4 h-4" />
                                        <span className="sr-only">User menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>
                                        <div className="flex flex-col space-y-1 text-center">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <Link href="/dashboard">
                                        <DropdownMenuItem className="hover:text-red-600">
                                            <LayoutDashboard className="w-4 h-5 mr-2" />
                                            Dashboard
                                        </DropdownMenuItem></Link>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="hover:text-red-600">
                                        <LogOut className="w-4 h-5 mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button size="lg" variant="ghost">
                                        Log In
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="lg">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-muted transition"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {isOpen && (
                    <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-sm">
                        <div className="px-4 py-3 space-y-2">
                            <Link
                                href="/"
                                className="block px-3 py-2 text-sm text-center text-foreground hover:bg-muted rounded-lg transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/browse"
                                className="block px-3 py-2 text-sm text-center text-foreground hover:bg-muted rounded-lg transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Browse Properties
                            </Link>
                            <div className="h-px bg-border/40 my-2" />

                            {user ? (
                                <div className="space-y-3 pt-1">
                                    <div className="flex items-center gap-3 px-3 py-2">
                                        <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            <User className="size-4" aria-hidden="true" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-foreground">
                                                {user.name}
                                            </p>
                                            <p className="truncate text-xs text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block">
                                        <Button variant="outline" size="sm" className="w-full h-8">
                                            Dashboard
                                        </Button>
                                    </Link>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full text-center gap-2 hover:text-destructive h-8 "
                                        onClick={() => {
                                            logout()
                                            setIsOpen(false)
                                        }}
                                    >
                                        <LogOut className="w-4 h-10" />
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2 pt-1">
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" size="lg" className="w-full">
                                            Log In
                                        </Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsOpen(false)}>
                                        <Button size="lg" className="w-full">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}