'use client'

import { Navbar } from '@/components/shared/navbar'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('[v0] Error caught:', error.message)
    }, [error])

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center space-y-6 max-w-md">
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">Oops!</h1>
                            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Something went wrong</h2>
                            <p className="text-muted-foreground">
                                An unexpected error occurred. Please try again or contact support if the problem persists.
                            </p>
                        </div>

                        {process.env.NODE_ENV === 'development' && (
                            <div className="bg-muted/50 border border-border rounded-lg p-4 text-left">
                                <p className="text-xs font-mono text-muted-foreground wrap-break-word">
                                    {error.message}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                            <Button onClick={() => reset()} size="lg">
                                Try Again
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => window.location.href = '/'}>
                                Go Home
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
