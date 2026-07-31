export default function Loading() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-neutral-500/20">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="space-y-4 text-center">
                        <div className="flex justify-center">
                            <div className="relative w-12 h-12">
                                <div className="absolute inset-0 border-4 border-muted-foreground/20 rounded-full" />
                                <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">Loading...</h2>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
