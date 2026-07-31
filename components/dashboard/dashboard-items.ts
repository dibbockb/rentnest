import { LayoutDashboard, Home, Users, Settings, ClipboardList } from "lucide-react"

export const tenantNavItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Requests", href: "/dashboard/requests", icon: ClipboardList },
]

export const landlordNavItems = [
    { label: "Overview", href: "/landlord-dashboard", icon: LayoutDashboard },
    { label: "My Properties", href: "/landlord-dashboard/properties", icon: Home },
    { label: "Requests", href: "/landlord-dashboard/requests", icon: ClipboardList },
]

export const adminNavItems = [
    { label: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
    { label: "Users", href: "/admin-dashboard/users", icon: Users },
    { label: "Settings", href: "/admin-dashboard/settings", icon: Settings },
]