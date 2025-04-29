import type React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import Link from "next/link"
import {UserCircle, Bell} from "lucide-react"
import {Button} from "@/components/dashboard/ui/button";
import Sidebar from "@/components/dashboard/sidebar";

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "Resume.io Dashboard",
    description: "Resume builder and job search platform",
}

export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode
    }>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="fixed top-0 left-0 right-0 h-16 border-b border-gray-200 bg-white z-30 shadow-sm">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between h-full">
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="flex items-center">
                            <div className="bg-blue-600 text-white font-bold rounded-lg p-1 mr-1">R</div>
                            <span className="font-semibold text-gray-800">resume.io</span>
                        </Link>
                        <nav className="hidden md:flex space-x-6">
                            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                Find a New Job
                            </Link>
                            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                Excel at Your Job
                            </Link>
                            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                Switch Career
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button className="bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm btn-hover">
                            Upgrade Now
                        </Button>
                        <Link href="/profile" className="relative">
                            <Bell className="h-5 w-5 text-gray-600 hover:text-blue-600 transition-colors"/>
                            <span
                                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                        </Link>
                        <Link
                            href="/profile"
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                        >
                            <UserCircle className="h-6 w-6"/>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="flex pt-16">
                <Sidebar/>
                <main className="flex-1 ml-0 md:ml-64 min-h-[calc(100vh-64px)] overflow-auto bg-gray-50">
                    <div className="max-w-6xl mx-auto p-6 animate-fadeIn">{children}</div>
                </main>
            </div>
        </div>
        </body>
        </html>
    )
}