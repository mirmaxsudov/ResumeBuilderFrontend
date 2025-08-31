"use client";

import React from "react";
import Link from "next/link";
import { 
  FileText, 
  Users, 
  Briefcase, 
  Search, 
  TrendingUp, 
  Lightbulb,
  Globe,
  BookOpen
} from "lucide-react";

const BlogCategories = () => {
  const categories = [
    {
      name: "Resume Writing",
      description: "Expert tips for creating compelling resumes",
      icon: FileText,
      color: "bg-blue-500",
      count: 45,
      href: "/blog/category/resume-writing"
    },
    {
      name: "Interview Tips",
      description: "Ace your interviews with proven strategies",
      icon: Users,
      color: "bg-green-500",
      count: 38,
      href: "/blog/category/interview-tips"
    },
    {
      name: "Career Advice",
      description: "Navigate your career path successfully",
      icon: Briefcase,
      color: "bg-purple-500",
      count: 52,
      href: "/blog/category/career-advice"
    },
    {
      name: "Job Search",
      description: "Find your dream job with effective strategies",
      icon: Search,
      color: "bg-orange-500",
      count: 41,
      href: "/blog/category/job-search"
    },
    {
      name: "Professional Development",
      description: "Grow your skills and advance your career",
      icon: TrendingUp,
      color: "bg-red-500",
      count: 29,
      href: "/blog/category/professional-development"
    },
    {
      name: "Industry Insights",
      description: "Stay updated with industry trends",
      icon: Globe,
      color: "bg-indigo-500",
      count: 33,
      href: "/blog/category/industry-insights"
    },
    {
      name: "Skills Development",
      description: "Master essential workplace skills",
      icon: Lightbulb,
      color: "bg-yellow-500",
      count: 27,
      href: "/blog/category/skills-development"
    },
    {
      name: "Cover Letters",
      description: "Write compelling cover letters",
      icon: BookOpen,
      color: "bg-pink-500",
      count: 19,
      href: "/blog/category/cover-letters"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the content you need to advance your career, organized by topic
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-200"
            >
              <div className="flex items-start space-x-4">
                <div className={`${category.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">
                      {category.count} articles
                    </span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog/categories"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View All Categories
            <BookOpen className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogCategories;
