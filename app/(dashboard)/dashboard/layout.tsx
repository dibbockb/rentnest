'use client'

import { AnimatedSidebarProvider, AnimatedSidebarInset, AnimatedSidebarTrigger } from "@/components/motion/animated-sidebar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { tenantNavItems } from "@/components/dashboard/dashboard-items"

export default function LandlordDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <AnimatedSidebarProvider>
            <DashboardSidebar items={tenantNavItems} title="Tentant" />
            <AnimatedSidebarInset>
                <AnimatedSidebarTrigger className="m-2" />
                {children}
            </AnimatedSidebarInset>
        </AnimatedSidebarProvider>
    )
}