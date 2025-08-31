"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, Download, Star } from "lucide-react";

const TemplatesSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Templates" },
    { id: "professional", name: "Professional" },
    { id: "creative", name: "Creative" },
    { id: "modern", name: "Modern" },
    { id: "minimal", name: "Minimal" }
  ];

  const templates = [
    {
      id: 1,
      name: "Professional Classic",
      category: "professional",
      image: "/api/placeholder/400/500",
      rating: 4.9,
      downloads: "12.5k",
      description: "Clean and traditional design perfect for corporate roles",
      popular: true
    },
    {
      id: 2,
      name: "Modern Minimal",
      category: "minimal",
      image: "/api/placeholder/400/500",
      rating: 4.8,
      downloads: "8.2k",
      description: "Simple and elegant design that focuses on content",
      popular: false
    },
    {
      id: 3,
      name: "Creative Portfolio",
      category: "creative",
      image: "/api/placeholder/400/500",
      rating: 4.7,
      downloads: "6.8k",
      description: "Stand out with this creative and visually appealing template",
      popular: false
    },
    {
      id: 4,
      name: "Executive Pro",
      category: "professional",
      image: "/api/placeholder/400/500",
      rating: 4.9,
      downloads: "15.3k",
      description: "Premium template designed for senior-level positions",
      popular: true
    },
    {
      id: 5,
      name: "Tech Savvy",
      category: "modern",
      image: "/api/placeholder/400/500",
      rating: 4.6,
      downloads: "5.1k",
      description: "Perfect for technology and engineering professionals",
      popular: false
    },
    {
      id: 6,
      name: "Startup Ready",
      category: "modern",
      image: "/api/placeholder/400/500",
      rating: 4.8,
      downloads: "7.4k",
      description: "Dynamic template ideal for startup and entrepreneurial roles",
      popular: false
    }
  ];

  const filteredTemplates = activeCategory === "all"
    ? templates
    : templates.filter(template => template.category === activeCategory);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional Resume Templates
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose from our collection of professionally designed templates that are optimized for ATS systems and designed to impress hiring managers.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${activeCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100"
            >
              {/* Template Image */}
              <div className="relative overflow-hidden">
                <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-gray-400 text-center p-8">
                    <div className="w-32 h-40 bg-gray-300 rounded mx-auto mb-4"></div>
                    <p className="text-sm">Template Preview</p>
                  </div>
                </div>

                {/* Popular Badge */}
                {template.popular && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Popular
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                    <Link href="/resume-templates">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
                        <span>Use Template</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6">
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

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {template.downloads} downloads
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

        {/* CTA */}
        <div className="text-center">
          <Link href="/resume-templates">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center space-x-2 mx-auto">
              <span>View All Templates</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <p className="text-gray-600 mt-4">
            All templates are free to use • No hidden fees
          </p>
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
