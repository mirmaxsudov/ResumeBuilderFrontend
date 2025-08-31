"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, Eye, ArrowRight, Star } from "lucide-react";

const FeaturedArticles = () => {
  const featuredArticles = [
    {
      id: 1,
      title: "10 Resume Mistakes That Are Costing You Interviews",
      excerpt: "Discover the most common resume mistakes that hiring managers see every day and learn how to avoid them to increase your interview chances.",
      category: "Resume Writing",
      author: "Sarah Johnson",
      authorAvatar: "/api/placeholder/40/40",
      publishDate: "2024-01-15",
      readTime: "8 min read",
      views: "12.5k",
      featured: true,
      image: "/api/placeholder/600/400",
      tags: ["ATS Optimization", "Resume Tips", "Job Search"],
      href: "/blog/10-resume-mistakes-costing-interviews"
    },
    {
      id: 2,
      title: "The Ultimate Guide to ATS-Optimized Resumes in 2024",
      excerpt: "Learn how to create resumes that pass through Applicant Tracking Systems and reach human recruiters with our comprehensive guide.",
      category: "Resume Writing",
      author: "Michael Chen",
      authorAvatar: "/api/placeholder/40/40",
      publishDate: "2024-01-12",
      readTime: "12 min read",
      views: "8.9k",
      featured: true,
      image: "/api/placeholder/600/400",
      tags: ["ATS", "Resume Writing", "Technology"],
      href: "/blog/ultimate-guide-ats-resumes-2024"
    },
    {
      id: 3,
      title: "How to Answer 'Tell Me About Yourself' in Job Interviews",
      excerpt: "Master the art of the elevator pitch with our proven framework for answering this common interview question effectively.",
      category: "Interview Tips",
      author: "Emily Rodriguez",
      authorAvatar: "/api/placeholder/40/40",
      publishDate: "2024-01-10",
      readTime: "6 min read",
      views: "15.2k",
      featured: false,
      image: "/api/placeholder/600/400",
      tags: ["Interview Tips", "Communication", "Career Advice"],
      href: "/blog/how-to-answer-tell-me-about-yourself"
    },
    {
      id: 4,
      title: "Remote Work Success: Building Your Home Office for Productivity",
      excerpt: "Transform your home workspace into a productivity powerhouse with these essential tips and setup recommendations.",
      category: "Professional Development",
      author: "David Kim",
      authorAvatar: "/api/placeholder/40/40",
      publishDate: "2024-01-08",
      readTime: "10 min read",
      views: "6.7k",
      featured: false,
      image: "/api/placeholder/600/400",
      tags: ["Remote Work", "Productivity", "Work Environment"],
      href: "/blog/remote-work-success-home-office-productivity"
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

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Articles
            </h2>
            <p className="text-lg text-gray-600">
              Our most popular and insightful career content
            </p>
          </div>
          <Link
            href="/blog/featured"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Featured
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            <Link href={featuredArticles[0].href} className="group">
              <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="lg:flex">
                  <div className="lg:w-1/2">
                    <div className="relative h-64 lg:h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                        <span className="text-white text-lg font-medium">Featured Article</span>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-medium rounded-full">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2 p-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {featuredArticles[0].category}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {formatDate(featuredArticles[0].publishDate)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {featuredArticles[0].title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {featuredArticles[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {featuredArticles[0].readTime}
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {featuredArticles[0].views} views
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900">
                          {featuredArticles[0].author}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>

          {/* Other Featured Articles */}
          {featuredArticles.slice(1).map((article) => (
            <Link key={article.id} href={article.href} className="group">
              <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Article Image</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {formatDate(article.publishDate)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
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
      </div>
    </section>
  );
};

export default FeaturedArticles;
