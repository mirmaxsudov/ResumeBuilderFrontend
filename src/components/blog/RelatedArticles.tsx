"use client";

import React from "react";
import Link from "next/link";
import { Clock, Eye, ArrowRight } from "lucide-react";

interface RelatedArticlesProps {
  currentSlug: string;
}

const RelatedArticles = ({ currentSlug }: RelatedArticlesProps) => {
  const relatedArticles = [
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
      title: "The Ultimate Guide to ATS-Optimized Resumes in 2024",
      excerpt: "Learn how to create resumes that pass through Applicant Tracking Systems and reach human recruiters.",
      category: "Resume Writing",
      author: "Michael Chen",
      publishDate: "2024-01-12",
      readTime: "12 min read",
      views: "8.9k",
      href: "/blog/ultimate-guide-ats-resumes-2024"
    },
    {
      id: 3,
      title: "Resume Templates: Choosing the Right One for Your Industry",
      excerpt: "Select the perfect resume template that aligns with your industry and career goals.",
      category: "Resume Writing",
      author: "Thomas Anderson",
      publishDate: "2024-01-02",
      readTime: "6 min read",
      views: "9.5k",
      href: "/blog/resume-templates-choosing-right-industry"
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
    <section className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Related Articles
        </h2>
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          View All Articles
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedArticles.map((article) => (
          <Link
            key={article.id}
            href={article.href}
            className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <article>
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Article Image</span>
              </div>
              <div className="p-6">
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
    </section>
  );
};

export default RelatedArticles;
