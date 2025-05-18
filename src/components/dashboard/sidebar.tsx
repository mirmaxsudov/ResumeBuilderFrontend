"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ChevronLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/dashboard/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/dashboard/ui/sheet";
import { useAppSelector } from "@/hooks/hooks";

type SidebarState = "expanded" | "collapsed" | "hidden";

interface SidebarProps {
  onStateChange?: (state: SidebarState) => void;
}

export default function Sidebar({ onStateChange }: SidebarProps) {
  const { user } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarState, setSidebarState] = useState<SidebarState>("expanded");

  useEffect(() => {
    onStateChange?.(sidebarState);
  }, [sidebarState, onStateChange]);

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

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    {
      icon: FileText,
      label: "Documents",
      href: "/dashboard/documents",
      hasSubmenu: true,
    },
    { icon: Briefcase, label: "Jobs", href: "/dashboard/jobs" },
    { icon: LineChart, label: "Job Tracker", href: "/dashboard/job-tracker" },
    { icon: Send, label: "Auto Apply", href: "/dashboard/auto-apply" },
    { icon: MessageSquare, label: "Interview Prep", href: "/dashboard/interview-prep" },
    { icon: DollarSign, label: "Salary Analyzer", href: "/dashboard/salary-analyzer" },
    {
      icon: Share2,
      label: "Resume Distribution",
      href: "/dashboard/resume-distribution",
    },
    {
      icon: Search,
      label: "Job Search Method",
      href: "/dashboard/job-search-method",
      hasSubmenu: true,
    },
    { icon: HelpCircle, label: "Coaching", href: "/dashboard/coaching" },
    { icon: UserCircle, label: "Profile", href: "/dashboard/profile" },
    { icon: MoreHorizontal, label: "Other", href: "/dashboard/other", hasSubmenu: true },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {sidebarState !== "hidden" && (
          <Link href={"/dashboard/profile"} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
              Aj
            </div>
            {sidebarState === "expanded" && (
              <div>
                <div className="font-medium">{user.firstName || "User"} {user.lastname || "user"}</div>
                <div className="text-xs text-gray-500">{user.role}</div>
              </div>
            )}
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleStateChange(
            sidebarState === "expanded"
              ? "collapsed"
              : sidebarState === "collapsed"
                ? "hidden"
                : "expanded"
          )}
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${sidebarState === "hidden" ? "rotate-180" : ""}`} />
        </Button>
      </div>
      <nav className="p-2 overflow-y-auto flex-1">
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between space-x-3 px-3 py-2 rounded-lg ${isActive
                    ? "nav-item-active bg-blue-50 text-blue-600"
                    : "nav-item-inactive"
                    } nav-item`}
                  onClick={() => setMobileOpen(false)}
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
                      className={isActive ? "text-blue-600" : "text-gray-400"}
                    />
                  )}
                </Link>
              </li>
            );
          })}
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