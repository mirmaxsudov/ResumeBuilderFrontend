"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    LineChart,
    Send,
    MessageSquare,
    DollarSign,
    Share2,
    Search,
    HelpCircle,
    MoreHorizontal,
    ChevronRight,
    Menu,
    UserCircle,
} from "lucide-react"
import {useState} from "react"
import {Button} from "@/components/dashboard/ui/button"
import {Sheet, SheetContent, SheetTrigger} from "@/components/dashboard/ui/sheet"

export default function Sidebar() {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)

    const sidebarItems = [
        {icon: LayoutDashboard, label: "Dashboard", href: "/"},
        {icon: FileText, label: "Documents", href: "/documents", hasSubmenu: true},
        {icon: Briefcase, label: "Jobs", href: "/jobs"},
        {icon: LineChart, label: "Job Tracker", href: "/job-tracker"},
        {icon: Send, label: "Auto Apply", href: "/auto-apply"},
        {icon: MessageSquare, label: "Interview Prep", href: "/interview-prep"},
        {icon: DollarSign, label: "Salary Analyzer", href: "/salary-analyzer"},
        {icon: Share2, label: "Resume Distribution", href: "/resume-distribution"},
        {icon: Search, label: "Job Search Method", href: "/job-search-method", hasSubmenu: true},
        {icon: HelpCircle, label: "Coaching", href: "/coaching"},
        {icon: UserCircle, label: "Profile", href: "/profile"},
        {icon: MoreHorizontal, label: "Other", href: "/other", hasSubmenu: true},
    ]

    const SidebarContent = () => (
        <>
            <Link href={'/profile'} className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div
                        className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                        Aj
                    </div>
                    <div>
                        <div className="font-medium">Someone</div>
                        <div className="text-xs text-gray-500">Set your target role</div>
                    </div>
                </div>
            </Link>
            <nav className="p-2 overflow-y-auto flex-1">
                <ul className="space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                        return (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center justify-between space-x-3 px-3 py-2 rounded-lg ${
                                        isActive ? "nav-item-active bg-blue-50 text-blue-600" : "nav-item-inactive"
                                    } nav-item`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <item.icon size={18} className={isActive ? "text-blue-600" : "text-gray-500"}/>
                                        <span>{item.label}</span>
                                    </div>
                                    {item.hasSubmenu && (
                                        <ChevronRight size={16}
                                                      className={isActive ? "text-blue-600" : "text-gray-400"}/>
                                    )}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )

    // Mobile menu trigger that's fixed at the top left
    const MobileMenuTrigger = () => (
        <div className="fixed top-3 left-4 z-40 md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-lg shadow-sm">
                        <Menu className="h-6 w-6"/>
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                    <SidebarContent/>
                </SheetContent>
            </Sheet>
        </div>
    )

    return (
        <>
            <MobileMenuTrigger/>
            <aside
                className="fixed top-16 left-0 w-64 border-r border-gray-200 h-[calc(100vh-64px)] hidden md:flex flex-col bg-white z-20 overflow-hidden shadow-sm">
                <SidebarContent/>
            </aside>
        </>
    )
}
