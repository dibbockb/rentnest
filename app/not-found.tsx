"use client"

import { Navbar } from '@/components/shared/navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-6xl sm:text-7xl font-bold text-foreground mb-2">404</h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">Page Not Found</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
              </p>
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
