'use client'

// import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home, Menu, X, User, LogOut } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
    // const { user, logout } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = () => {
        // logout()
        router.push('/')
        setIsOpen(false)
    }

    //     const isAuth = pathname.startsWith('/auth')
    // 
    //     if (isAuth) {
    //         return null
    //     }

    const dashboardPath = 'TENANT'
    const user = false

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
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted">
                                    <User className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-foreground">UserName</span>
                                </div>
                                {dashboardPath && (
                                    <Link href={dashboardPath}>
                                        <Button size="sm" variant="outline">
                                            Dashboard
                                        </Button>
                                    </Link>
                                )}
                                <Button onClick={handleLogout} size="sm" variant="ghost" className="gap-2">
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login">
                                    <Button size="sm" variant="ghost">
                                        Log In
                                    </Button>
                                </Link>
                                <Link href="/auth/register">
                                    <Button size="sm">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-muted transition"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {isOpen && (
                    <div className="md:hidden border-t border-border/40 bg-background/50 backdrop-blur-sm">
                        <div className="px-4 py-3 space-y-2">
                            <Link
                                href="/"
                                className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/browse"
                                className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Browse Properties
                            </Link>

                            <div className="h-px bg-border/40 my-2" />

                            {user ? (
                                <>
                                    <div className="px-3 py-2 text-sm text-muted-foreground">
                                        Signed in as <span className="text-foreground font-medium">UserName</span>
                                    </div>
                                    {dashboardPath && (
                                        <Link href={dashboardPath} onClick={() => setIsOpen(false)}>
                                            <Button variant="outline" size="sm" className="w-full justify-start">
                                                Dashboard
                                            </Button>
                                        </Link>
                                    )}
                                    <Button
                                        onClick={handleLogout}
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" size="sm" className="w-full">
                                            Log In
                                        </Button>
                                    </Link>
                                    <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                                        <Button size="sm" className="w-full">
                                            Get Started
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
