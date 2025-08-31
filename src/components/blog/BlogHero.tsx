"use client";

import React from "react";
import { BookOpen, Users, TrendingUp } from "lucide-react";

const BlogHero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              <BookOpen className="w-4 h-4 mr-2" />
              Expert Career Insights
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Career Success
            <span className="text-blue-600 block">Starts Here</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover expert advice on resume writing, interview strategies, career development,
            and job search tips from industry professionals. Stay ahead in your career journey.
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span>500+ Articles</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span>Updated Weekly</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>Expert Writers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
