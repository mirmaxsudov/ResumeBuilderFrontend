"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, Eye, Mail, ArrowRight, TrendingUp, BookOpen } from "lucide-react";

const BlogSidebar = () => {
  const [email, setEmail] = useState("");

  const popularArticles = [
    {
      id: 1,
      title: "How to Answer 'Tell Me About Yourself' in Job Interviews",
      category: "Interview Tips",
      publishDate: "2024-01-10",
      readTime: "6 min read",
      views: "15.2k",
      href: "/blog/how-to-answer-tell-me-about-yourself"
    },
    {
      id: 2,
      title: "The Ultimate Guide to ATS-Optimized Resumes in 2024",
      category: "Resume Writing",
      publishDate: "2024-01-12",
      readTime: "12 min read",
      views: "8.9k",
      href: "/blog/ultimate-guide-ats-resumes-2024"
    },
    {
      id: 3,
      title: "Salary Negotiation: How to Get What You're Worth",
      category: "Career Advice",
      publishDate: "2024-01-16",
      readTime: "12 min read",
      views: "11.2k",
      href: "/blog/salary-negotiation-get-what-youre-worth"
    },
    {
      id: 4,
      title: "Networking Strategies for Career Growth",
      category: "Career Advice",
      publishDate: "2024-01-18",
      readTime: "10 min read",
      views: "7.8k",
      href: "/blog/networking-strategies-career-growth"
    }
  ];

  const categories = [
    { name: "Resume Writing", count: 45, href: "/blog/category/resume-writing" },
    { name: "Interview Tips", count: 38, href: "/blog/category/interview-tips" },
    { name: "Career Advice", count: 52, href: "/blog/category/career-advice" },
    { name: "Job Search", count: 41, href: "/blog/category/job-search" },
    { name: "Professional Development", count: 29, href: "/blog/category/professional-development" },
    { name: "Industry Insights", count: 33, href: "/blog/category/industry-insights" }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <aside className="space-y-8">
      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Mail className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Stay Updated</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Get the latest career insights and resume tips delivered to your inbox.
        </p>
        <form onSubmit={handleNewsletterSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Popular Articles */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Popular Articles</h3>
        </div>
        <div className="space-y-4">
          {popularArticles.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="block group hover:bg-gray-50 rounded-lg p-3 -m-3 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{formatDate(article.publishDate)}</span>
                  </div>
                  <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {article.views}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/blog/popular"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium mt-4"
        >
          View All Popular
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <BookOpen className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Categories</h3>
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 transition-colors group"
            >
              <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                {category.name}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/blog/categories"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium mt-4"
        >
          View All Categories
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Blog Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Articles</span>
            <span className="text-sm font-medium text-gray-900">500+</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Monthly Readers</span>
            <span className="text-sm font-medium text-gray-900">50k+</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Expert Writers</span>
            <span className="text-sm font-medium text-gray-900">25+</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Success Rate</span>
            <span className="text-sm font-medium text-gray-900">95%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
