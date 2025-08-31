"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X} from "lucide-react";

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">RB</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">Resume Builder</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/resume-templates"
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Templates
                        </Link>
                        <Link
                            href="/features"
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Features
                        </Link>
                        <Link
                            href="/blog"
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/help"
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Help
                        </Link>
                    </div>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            href="/login"
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                            Get Started Free
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link
                                href="/resume-templates"
                                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Templates
                            </Link>
                            <Link
                                href="/features"
                                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Features
                            </Link>
                            <Link
                                href="/blog"
                                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Blog
                            </Link>
                            <Link
                                href="/pricing"
                                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/help"
                                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Help
                            </Link>
                            <div className="pt-4 border-t border-gray-200">
                                <Link
                                    href="/login"
                                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
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
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
