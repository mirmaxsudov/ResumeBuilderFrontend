"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Share2,
    Search,
    ChevronRight,
    Menu,
    UserCircle,
    Settings,
    User,
    File,
    FileUser,
    NotebookPen, Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/dashboard/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/dashboard/ui/sheet";
import { useAppSelector } from "@/hooks/hooks";
import GenerateProfileIcon from "@/helpers/GenerateProfileIcon";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import Role from "@/enums/Role";
import { GrUserAdmin } from "react-icons/gr";
import { BiChat } from "react-icons/bi";

type SidebarState = "expanded" | "collapsed" | "hidden";

interface SidebarProps {
    onStateChange?: (state: SidebarState) => void;
}

export default function Sidebar({ onStateChange }: SidebarProps) {
    const { user } = useAppSelector((state) => state.auth);
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [sidebarState, setSidebarState] = useState<SidebarState>("expanded");
    const [expandedSubmenus, setExpandedSubmenus] = useState<Set<string>>(new Set());

    useEffect(() => onStateChange?.(sidebarState), [sidebarState, onStateChange])

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
                e.preventDefault();
                setSidebarState((prev) => {
                    switch (prev) {
                        case "expanded":
                            return "collapsed";
                        case "collapsed":
                            return "hidden";
                        case "hidden":
                            return "expanded";
                        default:
                            return "expanded";
                    }
                });
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    const handleStateChange = (newState: SidebarState) => {
        setSidebarState(newState);
    };

    const toggleSubmenu = (itemLabel: string) => {
        setExpandedSubmenus(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemLabel))
                newSet.delete(itemLabel);
            else
                newSet.add(itemLabel);
            return newSet;
        });
    };

    const profileItems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link href="/dashboard/profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link href="/dashboard/account" className="flex items-center gap-2">
                    <UserCircle className="w-4 h-4" />
                    <span>Account</span>
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link href="/dashboard/settings" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                </Link>
            ),
        },
    ];

    const sidebarItems = [
        {
            icon: LayoutDashboard, label: "Dashboard", href: "/dashboard",
            allowedRoles: [Role.HR, Role.ADMIN, Role.USER, Role.SUPER_ADMIN, Role.MANAGER]
        },
        {
            icon: Users,
            label: "Users",
            href: "/dashboard/users?role=all",
            hasSubmenu: true,
            submenuItems: [
                {
                    icon: GrUserAdmin,
                    href: "/dashboard/users?role=admin",
                    label: "Admins"
                }, {
                    icon: User,
                    href: "/dashboard/users?role=user",
                    label: "Users"
                }, {
                    icon: UserCircle,
                    href: "/dashboard/users?role=hr",
                    label: "HRs"
                }
            ],
            allowedRoles: [Role.ADMIN, Role.SUPER_ADMIN]
        },
        {
            icon: BiChat,
            label: "Hr chats",
            href: "/dashboard/hr-chats",
            allowedRoles: [Role.ADMIN, Role.SUPER_ADMIN]
        },
        {
            icon: File,
            label: "Resumes",
            href: "/dashboard/resumes",
            hasSubmenu: true,
            submenuItems: [
                { icon: FileUser, label: "My Resumes", href: "/resume/my-resumes" },
                { icon: FileText, label: "Resumes", href: "/resume/create-resume" },
            ],
            allowedRoles: [Role.HR, Role.ADMIN, Role.USER, Role.SUPER_ADMIN, Role.MANAGER]
        },
        {
            icon: NotebookPen, label: "Cover Pages", href: "/cover-page",
            hasSubmenu: true,
            submenuItems: [
                { icon: FileText, label: "My Cover Pages", href: "/cover-page" },
                { icon: FileText, label: "Create Cover Page", href: "/cover-page/create" },
            ],
            allowedRoles: [Role.HR, Role.ADMIN, Role.USER, Role.SUPER_ADMIN, Role.MANAGER]
        },
        {
            icon: Share2,
            label: "Resume Distribution",
            href: "/dashboard/resume-distribution",
            allowedRoles: [Role.HR, Role.ADMIN, Role.USER, Role.SUPER_ADMIN, Role.MANAGER]
        },
        {
            icon: Search,
            label: "Job Search Method",
            href: "/dashboard/job-search-method",
            allowedRoles: [Role.HR, Role.ADMIN, Role.USER, Role.SUPER_ADMIN, Role.MANAGER]
        },
        {
            icon: UserCircle, label: "Profile", href: "/dashboard/profile",
            allowedRoles: [Role.HR, Role.ADMIN, Role.USER, Role.SUPER_ADMIN, Role.MANAGER]
        },
    ];

    const SidebarContent = () => (
        <>
            <div className="p-4 border-b border-gray-200">
                {sidebarState !== "hidden" && (
                    <Dropdown
                        menu={{ items: profileItems }}
                        placement="bottomRight"
                        trigger={['click']}
                        overlayClassName="sidebar-profile-dropdown"
                    >
                        <div
                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            <div className="w-10 h-10">
                                {GenerateProfileIcon({
                                    firstName: user.firstName,
                                    lastName: user.lastname,
                                    size: 30,
                                    isRound: true
                                })}
                            </div>
                            {sidebarState === "expanded" && (
                                <div>
                                    <div
                                        className="font-medium">{user.firstName || "User"} {user.lastname || "user"}</div>
                                    <div className="text-xs text-gray-500">{user.role}</div>
                                </div>
                            )}
                        </div>
                    </Dropdown>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 absolute top-4 right-4"
                    onClick={() => handleStateChange(
                        sidebarState === "expanded"
                            ? "collapsed"
                            : sidebarState === "collapsed"
                                ? "hidden"
                                : "expanded"
                    )}
                >
                </Button>
            </div>
            <nav className="p-2 overflow-y-auto flex-1">
                <ul className="space-y-1">
                    {sidebarItems
                        .filter(value => {
                            return value.allowedRoles && value.allowedRoles.includes(user.role)
                        })
                        .map((item) => {
                            const isActive = pathname === item.href || pathname === (`${item.href}/`);
                            const isSubmenuExpanded = expandedSubmenus.has(item.label);

                            return (
                                <li key={item.label}>
                                    <Link
                                        href={item.hasSubmenu ? "#" : item.href}
                                        className={`flex items-center justify-between space-x-3 px-3 py-2 rounded-lg ${isActive
                                            ? "nav-item-active bg-blue-50 text-blue-600"
                                            : "nav-item-inactive"
                                            } nav-item`}
                                        onClick={(e) => {
                                            if (item.hasSubmenu) {
                                                e.preventDefault();
                                                toggleSubmenu(item.label);
                                            } else {
                                                setMobileOpen(false);
                                            }
                                        }}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <item.icon
                                                size={18}
                                                className={isActive ? "text-blue-600" : "text-gray-500"}
                                            />
                                            {sidebarState === "expanded" && <span>{item.label}</span>}
                                        </div>
                                        {sidebarState === "expanded" && item.hasSubmenu && (
                                            <ChevronRight
                                                size={16}
                                                className={`transition-transform duration-200 ${isActive ? "text-blue-600" : "text-gray-400"
                                                    } ${isSubmenuExpanded ? "rotate-90" : ""}`}
                                            />
                                        )}
                                    </Link>

                                    {/* Submenu Items */}
                                    {item.hasSubmenu && isSubmenuExpanded && sidebarState === "expanded" && item.submenuItems && (
                                        <ul className="ml-6 mt-1 list-none space-y-1">
                                            {item.submenuItems.map((subItem) => {
                                                const isSubActive = pathname === subItem.href || pathname === (`${subItem.href}/`);
                                                return (
                                                    <li key={subItem.label} className="list-none">
                                                        <Link
                                                            href={subItem.href}
                                                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm ${isSubActive
                                                                ? "nav-item-active bg-blue-50 text-blue-600"
                                                                : "nav-item-inactive text-gray-600 hover:text-gray-900"
                                                                } nav-item`}
                                                            onClick={() => setMobileOpen(false)}
                                                        >
                                                            {subItem.icon && (
                                                                <subItem.icon
                                                                    size={16}
                                                                    className={isSubActive ? "text-blue-600" : "text-gray-500"}
                                                                />
                                                            )}
                                                            <span>{subItem.label}</span>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </li>
                            );
                        }
                        )
                    }
                </ul>
            </nav>
        </>
    );

    const MobileMenuTrigger = () => (
        <div className="fixed top-3 left-4 z-40 md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-lg shadow-sm"
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
        </div>
    );

    return (
        <>
            <MobileMenuTrigger />
            <aside
                className={`fixed top-16 left-0 h-[calc(100vh-64px)] hidden md:flex flex-col bg-white z-20 overflow-hidden shadow-sm transition-all duration-300 ${sidebarState === "expanded"
                    ? "w-64"
                    : sidebarState === "collapsed"
                        ? "w-20"
                        : "w-0"
                    }`}
            >
                <SidebarContent />
            </aside>
        </>
    );
}