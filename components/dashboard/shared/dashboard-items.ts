import { LayoutDashboard, Home, Users, ClipboardList, BanknoteCheck, ChartNoAxesGantt, House } from "lucide-react"

export const tenantNavItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Requests", href: "/dashboard/requests", icon: ClipboardList },
    { label: "My Reviews", href: "/dashboard/my-reviews", icon: ChartNoAxesGantt },
    { label: "Payment History", href: "/dashboard/payment-history", icon: BanknoteCheck },
]

export const landlordNavItems = [
    { label: "Overview", href: "/landlord-dashboard", icon: LayoutDashboard },
    { label: "My Properties", href: "/landlord-dashboard/properties", icon: Home },
    { label: "Incoming Requests", href: "/landlord-dashboard/requests", icon: ClipboardList },
]

export const adminNavItems = [
    { label: "Overview", href: "/admin-dashboard", icon: LayoutDashboard },
    { label: "Manage Requests", href: "/admin-dashboard/requests", icon: ClipboardList },
    { label: "Users", href: "/admin-dashboard/users", icon: Users },
    { label: "Properties", href: "/admin-dashboard/properties", icon: House },
]