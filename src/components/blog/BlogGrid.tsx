"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, Eye, Filter, ChevronLeft, ChevronRight } from "lucide-react";

const BlogGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");
  const articlesPerPage = 9;

  const allArticles = [
    {
      id: 1,
      title: "How to Write a Cover Letter That Gets You Hired",
      excerpt: "Learn the essential elements of a compelling cover letter and how to tailor it for each job application.",
      category: "Cover Letters",
      author: "Jennifer Smith",
      publishDate: "2024-01-20",
      readTime: "7 min read",
      views: "9.3k",
      href: "/blog/how-to-write-cover-letter"
    },
    {
      id: 2,
      title: "Networking Strategies for Career Growth",
      excerpt: "Build meaningful professional relationships that can accelerate your career advancement.",
      category: "Career Advice",
      author: "Robert Wilson",
      publishDate: "2024-01-18",
      readTime: "10 min read",
      views: "7.8k",
      href: "/blog/networking-strategies-career-growth"
    },
    {
      id: 3,
      title: "Salary Negotiation: How to Get What You're Worth",
      excerpt: "Master the art of salary negotiation with proven strategies and techniques.",
      category: "Career Advice",
      author: "Lisa Chen",
      publishDate: "2024-01-16",
      readTime: "12 min read",
      views: "11.2k",
      href: "/blog/salary-negotiation-get-what-youre-worth"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const sortedArticles = [...allArticles].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      case "popular":
        return parseInt(b.views.replace('k', '000')) - parseInt(a.views.replace('k', '000'));
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = sortedArticles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Latest Articles
            </h2>
            <p className="text-lg text-gray-600">
              Stay updated with the latest career insights
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentArticles.map((article) => (
            <Link key={article.id} href={article.href} className="group">
              <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Article Image</span>
                </div>
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {formatDate(article.publishDate)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {article.views}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                      <span className="text-xs font-medium text-gray-900">
                        {article.author}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;