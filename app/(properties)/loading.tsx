import { Skeleton } from "@/components/ui/skeleton"
import { Navbar } from "@/components/shared/navbar"

export default function Loading() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Skeleton className="h-10 w-64 mb-2" />
                <Skeleton className="h-5 w-40 mb-8" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="space-y-3">
                            <Skeleton className="h-48 w-full rounded-2xl" />
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}