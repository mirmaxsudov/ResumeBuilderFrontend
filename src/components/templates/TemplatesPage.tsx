"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, Eye, Download, Star, Heart, ArrowRight, Grid, List } from "lucide-react";

interface TemplatesPageProps {
    countOfResumes: number;
}

const TemplatesPage: React.FC<TemplatesPageProps> = ({ countOfResumes }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedStyle, setSelectedStyle] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState("popular");

    const categories = [
        { id: "all", name: "All Categories" },
        { id: "professional", name: "Professional" },
        { id: "creative", name: "Creative" },
        { id: "modern", name: "Modern" },
        { id: "minimal", name: "Minimal" },
        { id: "executive", name: "Executive" },
        { id: "entry-level", name: "Entry Level" }
    ];

    const styles = [
        { id: "all", name: "All Styles" },
        { id: "classic", name: "Classic" },
        { id: "contemporary", name: "Contemporary" },
        { id: "bold", name: "Bold" },
        { id: "elegant", name: "Elegant" }
    ];

    const templates = [
        {
            id: 1,
            name: "Professional Classic",
            category: "professional",
            style: "classic",
            image: "/api/placeholder/400/500",
            rating: 4.9,
            downloads: 12500,
            description: "Clean and traditional design perfect for corporate roles",
            popular: true,
            free: true,
            tags: ["ATS-Optimized", "Corporate", "Traditional"]
        },
        {
            id: 2,
            name: "Modern Minimal",
            category: "minimal",
            style: "contemporary",
            image: "/api/placeholder/400/500",
            rating: 4.8,
            downloads: 8200,
            description: "Simple and elegant design that focuses on content",
            popular: false,
            free: true,
            tags: ["Clean", "Minimal", "Modern"]
        },
        {
            id: 3,
            name: "Creative Portfolio",
            category: "creative",
            style: "bold",
            image: "/api/placeholder/400/500",
            rating: 4.7,
            downloads: 6800,
            description: "Stand out with this creative and visually appealing template",
            popular: false,
            free: false,
            tags: ["Creative", "Portfolio", "Bold"]
        },
        {
            id: 4,
            name: "Executive Pro",
            category: "executive",
            style: "elegant",
            image: "/api/placeholder/400/500",
            rating: 4.9,
            downloads: 15300,
            description: "Premium template designed for senior-level positions",
            popular: true,
            free: false,
            tags: ["Executive", "Premium", "Senior"]
        },
        {
            id: 5,
            name: "Tech Savvy",
            category: "modern",
            style: "contemporary",
            image: "/api/placeholder/400/500",
            rating: 4.6,
            downloads: 5100,
            description: "Perfect for technology and engineering professionals",
            popular: false,
            free: true,
            tags: ["Tech", "Engineering", "Modern"]
        },
        {
            id: 6,
            name: "Startup Ready",
            category: "modern",
            style: "bold",
            image: "/api/placeholder/400/500",
            rating: 4.8,
            downloads: 7400,
            description: "Dynamic template ideal for startup and entrepreneurial roles",
            popular: false,
            free: true,
            tags: ["Startup", "Entrepreneur", "Dynamic"]
        },
        {
            id: 7,
            name: "Entry Level Success",
            category: "entry-level",
            style: "classic",
            image: "/api/placeholder/400/500",
            rating: 4.5,
            downloads: 3200,
            description: "Perfect for recent graduates and entry-level positions",
            popular: false,
            free: true,
            tags: ["Entry Level", "Graduate", "Simple"]
        },
        {
            id: 8,
            name: "Designer's Choice",
            category: "creative",
            style: "bold",
            image: "/api/placeholder/400/500",
            rating: 4.7,
            downloads: 5900,
            description: "Creative template perfect for designers and artists",
            popular: false,
            free: false,
            tags: ["Design", "Creative", "Artistic"]
        }
    ];

    const filteredTemplates = useMemo(() => {
        let filtered = templates;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(template =>
                template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Category filter
        if (selectedCategory !== "all") {
            filtered = filtered.filter(template => template.category === selectedCategory);
        }

        // Style filter
        if (selectedStyle !== "all") {
            filtered = filtered.filter(template => template.style === selectedStyle);
        }

        // Sort
        switch (sortBy) {
            case "popular":
                filtered = filtered.sort((a, b) => b.downloads - a.downloads);
                break;
            case "rating":
                filtered = filtered.sort((a, b) => b.rating - a.rating);
                break;
            case "newest":
                filtered = filtered.sort((a, b) => b.id - a.id);
                break;
            case "name":
                filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return filtered;
    }, [searchTerm, selectedCategory, selectedStyle, sortBy]);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Professional Resume Templates
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Choose from our collection of {templates.length}+ professionally designed templates.
                            All templates are ATS-optimized and designed to help you land your dream job.
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                            <span>✓ {countOfResumes.toLocaleString()} resumes created</span>
                            <span>✓ 98% success rate</span>
                            <span>✓ Free to get started</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters and Search */}
            <section className="py-8 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full lg:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search templates..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-4">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedStyle}
                                onChange={(e) => setSelectedStyle(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {styles.map((style) => (
                                    <option key={style.id} value={style.id}>
                                        {style.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="popular">Most Popular</option>
                                <option value="rating">Highest Rated</option>
                                <option value="newest">Newest</option>
                                <option value="name">Name A-Z</option>
                            </select>

                            {/* View Mode Toggle */}
                            <div className="flex border border-gray-300 rounded-lg">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`px-3 py-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`px-3 py-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Templates Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredTemplates.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
                            <p className="text-gray-600">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        <div className={`grid gap-8 ${viewMode === "grid"
                                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                : "grid-cols-1"
                            }`}>
                            {filteredTemplates.map((template) => (
                                <div
                                    key={template.id}
                                    className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${viewMode === "list" ? "flex" : ""
                                        }`}
                                >
                                    {/* Template Image */}
                                    <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                                        <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                            <div className="text-gray-400 text-center p-8">
                                                <div className="w-32 h-40 bg-gray-300 rounded mx-auto mb-4"></div>
                                                <p className="text-sm">Template Preview</p>
                                            </div>
                                        </div>

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 space-y-2">
                                            {template.popular && (
                                                <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                    Popular
                                                </div>
                                            )}
                                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${template.free ? "bg-green-500 text-white" : "bg-purple-500 text-white"
                                                }`}>
                                                {template.free ? "Free" : "Premium"}
                                            </div>
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                                            <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                                                <button className="bg-white text-gray-900 px-3 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-1">
                                                    <Eye className="w-4 h-4" />
                                                    <span>Preview</span>
                                                </button>
                                                <Link href="/resume-templates">
                                                    <button className="bg-blue-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1">
                                                        <span>Use</span>
                                                        <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Template Info */}
                                    <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {template.name}
                                            </h3>
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-sm text-gray-600">{template.rating}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-4">
                                            {template.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {template.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">
                                                {template.downloads.toLocaleString()} downloads
                                            </span>
                                            <Link href="/resume-templates">
                                                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1 transition-colors duration-200">
                                                    <span>Use Template</span>
                                                    <ArrowRight className="w-3 h-3" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Ready to Create Your Resume?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Choose a template and start building your professional resume in minutes.
                        All templates are optimized for ATS systems and designed to get you hired.
                    </p>
                    <Link href="/register">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                            Get Started Free
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default TemplatesPage;