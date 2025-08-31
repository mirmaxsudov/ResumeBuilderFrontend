"use client";

import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";

const BlogSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const categories = [
    "All Categories",
    "Resume Writing",
    "Interview Tips",
    "Career Advice",
    "Job Search",
    "Professional Development",
    "Industry Insights"
  ];

  const popularTags = [
    "ATS Optimization",
    "Cover Letters",
    "Networking",
    "Salary Negotiation",
    "Remote Work",
    "Career Change",
    "Leadership",
    "Skills Development"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Search:", { searchQuery, selectedCategory, selectedTag });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedTag("");
  };

  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSearch} className="space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Tag Filter */}
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Tags</option>
              {popularTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>

            {/* Clear Filters */}
            {(selectedCategory || selectedTag) && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {popularTags.slice(0, 6).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  selectedTag === tag
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
};

export default BlogSearch;
