'use client'

import { usePathname, useRouter } from "next/navigation"
import {
    AnimatedSidebar, AnimatedSidebarContent, AnimatedSidebarGroup,
    AnimatedSidebarMenu, AnimatedSidebarMenuItem, AnimatedSidebarMenuButton,
    AnimatedSidebarHeader,
} from "@/components/motion/animated-sidebar"

type NavItem = { label: string; href: string; icon: React.ElementType }

export function DashboardSidebar({ items, title }: { items: NavItem[]; title: string }) {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <AnimatedSidebar >
            <AnimatedSidebarContent>
                <AnimatedSidebarGroup>
                    <AnimatedSidebarMenu>
                        {items.map((item) => (
                            <AnimatedSidebarMenuItem key={item.href} className="">
                                <AnimatedSidebarMenuButton
                                    icon={<item.icon className="w-5 h-5" />}
                                    isActive={pathname === item.href}
                                    onSelect={() => router.push(item.href)}
                                    className="text-base h-10"
                                >
                                    {item.label}
                                </AnimatedSidebarMenuButton>
                            </AnimatedSidebarMenuItem>
                        ))}
                    </AnimatedSidebarMenu>
                </AnimatedSidebarGroup>
            </AnimatedSidebarContent>
        </AnimatedSidebar>
    )
}