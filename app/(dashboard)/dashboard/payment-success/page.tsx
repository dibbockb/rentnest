"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

const Success = () => {
    return (
        <div className="min-h-screen bg-background">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center space-y-6">
                        <div>
                            <h1 className="text-5xl sm:text-5xl font-medium text-foreground mb-2">Success!</h1>
                            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">Payment Completed!</h2>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Link href="/">
                                <Button size="lg">Go Home</Button>
                            </Link>
                            <Button size="lg" variant="outline" onClick={() => window.history.back()}>
                                Go Back
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Success