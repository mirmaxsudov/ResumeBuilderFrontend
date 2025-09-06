"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useAppSelector } from "@/hooks/hooks";
import ThemeToggle from "@/components/theme/ThemeToggle";

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { token, user } = useAppSelector(state => state.auth);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-card/95 backdrop-blur-md shadow-lg" : "bg-background"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">RB</span>
                        </div>
                        <span className="text-xl font-bold text-foreground">Resume Builder</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/resume-templates"
                            className="text-foreground/80 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Templates
                        </Link>
                        <Link
                            href="/features"
                            className="text-foreground/80 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Features
                        </Link>
                        <Link
                            href="/blog"
                            className="text-foreground/80 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-foreground/80 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/help"
                            className="text-foreground/80 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Help
                        </Link>
                    </div>

                    {/* Desktop CTA Buttons */}
                    {/* If not registered */}
                    {(!token && !user) ? <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle />
                        <Link
                            href="/login"
                            className="text-foreground/80 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                            Get Started Free
                        </Link>
                    </div> : <>
                        <ThemeToggle />
                        <Link
                            href="/dashboard"
                            className="md:flex hidden bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                            Go to Dashboard
                        </Link>
                    </>}

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-md text-foreground/80 hover:text-blue-600 hover:bg-accent transition-colors duration-200"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-card border-t border-border">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link
                                href="/resume-templates"
                                className="block px-3 py-2 text-foreground/80 hover:text-blue-600 hover:bg-accent rounded-md transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Templates
                            </Link>
                            <Link
                                href="/features"
                                className="block px-3 py-2 text-foreground/80 hover:text-blue-600 hover:bg-accent rounded-md transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Features
                            </Link>
                            <Link
                                href="/blog"
                                className="block px-3 py-2 text-foreground/80 hover:text-blue-600 hover:bg-accent rounded-md transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Blog
                            </Link>
                            <Link
                                href="/pricing"
                                className="block px-3 py-2 text-foreground/80 hover:text-blue-600 hover:bg-accent rounded-md transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/help"
                                className="block px-3 py-2 text-foreground/80 hover:text-blue-600 hover:bg-accent rounded-md transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Help
                            </Link>
                            {(!token && !user) ? <div className="pt-4 border-t border-border">
                                <Link
                                    href="/login"
                                    className="block px-3 py-2 text-foreground/80 hover:text-blue-600 hover:bg-accent rounded-md transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className="block px-3 py-2 bg-blue-600 text-white rounded-md font-medium mt-2 text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Get Started Free
                                </Link>
                            </div> : <>
                                <Link
                                    href="/dashboard"
                                    className="block px-3 py-2 bg-blue-600 text-white rounded-md font-medium mt-2 text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Go to Dashboard
                                </Link>
                            </>}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
