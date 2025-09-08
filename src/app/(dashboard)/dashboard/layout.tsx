'use client'

import type React from "react";
import Link from "next/link";
import { UserCircle, Bell, LogOut, User, Briefcase, Settings, Share2, ArrowRight, ArrowLeftRight } from "lucide-react";
import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import Sidebar from "@/components/dashboard/sidebar";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { clearAuth } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import { logout } from "@/api/requests/auth/auth.api";
import { NotificationDropdown } from "@/components/dashboard/NotificationDropdown";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarState, setSidebarState] = useState<"expanded" | "collapsed" | "hidden">("expanded");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    dispatch(clearAuth());
    router.push("/login");
  };

  const items: MenuProps['items'] = [
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
        <Link href="/dashboard/become-hr" className="flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          <span>Become HR</span>
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link href="/dashboard/switch-role" className="flex items-center gap-2">
          <ArrowLeftRight className="w-4 h-4" />
          <span>Switch Role</span>
        </Link>
      )
    },
    {
      key: '4',
      label: (
        <Link href="/dashboard/settings" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Link>
      )
    },
    {
      type: 'divider',
    },
    {
      key: '5',
      label: (
        <button onClick={handleLogout} className="flex items-center gap-2 w-full text-red-500">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-card z-30 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between h-full">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <div className="bg-blue-600 text-white font-bold rounded-lg p-1 mr-1">
                R
              </div>
              <span className="font-semibold text-foreground">Resume</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* <ThemeToggle /> */}
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full text-white shadow-sm btn-hover">
              Upgrade Now
            </Button>
            <NotificationDropdown />
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              trigger={['click']}
              overlayClassName="user-dropdown"
            >
              <button className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                <UserCircle className="h-6 w-6" />
              </button>
            </Dropdown>
          </div>
        </div>
      </header>
      <div className="flex pt-16">
        <Sidebar onStateChange={setSidebarState} />
        <main
          className={`flex-1 min-h-[calc(100vh-64px)] overflow-auto bg-background transition-all duration-300 ${sidebarState === "expanded"
            ? "md:ml-64"
            : sidebarState === "collapsed"
              ? "md:ml-20"
              : "md:ml-0"
            }`}
        >
          <div className="max-w-full mx-auto p-6 animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
