"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Target, 
  Users, 
  BookOpen, 
  Star,
  ArrowRight,
  Clock,
  Award,
  Briefcase,
  GraduationCap,
  Zap,
  Lightbulb,
  Globe,
  DollarSign,
  Heart,
  CheckCircle,
  AlertCircle,
  Calendar,
  Search,
  MessageCircle,
  FileText,
  Palette,
  Eye,
  Download
} from "lucide-react";

const CareerAdvicePage = () => {
  const [activeCategory, setActiveCategory] = useState("career-development");

  const categories = [
    { id: "career-development", name: "Career Development", icon: TrendingUp },
    { id: "industry-insights", name: "Industry Insights", icon: Globe },
    { id: "skill-building", name: "Skill Building", icon: BookOpen },
    { id: "networking", name: "Networking", icon: Users },
    { id: "work-life-balance", name: "Work-Life Balance", icon: Heart }
  ];

  const articles = {
    "career-development": [
      {
        title: "How to Plan Your Career Path in 2024",
        excerpt: "Strategic career planning is more important than ever. Learn how to map out your professional journey.",
        author: "Sarah Johnson",
        date: "Jan 15, 2024",
        readTime: "8 min read",
        category: "Career Planning",
        featured: true
      },
      {
        title: "The Future of Remote Work: What You Need to Know",
        excerpt: "Remote work is here to stay. Discover how to thrive in a hybrid work environment.",
        author: "Michael Chen",
        date: "Jan 12, 2024",
        readTime: "6 min read",
        category: "Remote Work"
      },
      {
        title: "Building Your Personal Brand: A Complete Guide",
        excerpt: "Your personal brand is your professional reputation. Learn how to build and maintain it.",
        author: "Emily Rodriguez",
        date: "Jan 10, 2024",
        readTime: "10 min read",
        category: "Personal Branding"
      }
    ],
    "industry-insights": [
      {
        title: "Top 10 In-Demand Skills for 2024",
        excerpt: "Stay ahead of the curve with the most sought-after skills across industries.",
        author: "Career Insights Team",
        date: "Jan 14, 2024",
        readTime: "9 min read",
        category: "Skills",
        featured: true
      },
      {
        title: "Tech Industry Trends: What's Next in 2024",
        excerpt: "Explore the latest trends in technology and how they're shaping job opportunities.",
        author: "Alex Wong",
        date: "Jan 11, 2024",
        readTime: "8 min read",
        category: "Technology"
      },
      {
        title: "Healthcare Careers: Opportunities in a Growing Field",
        excerpt: "The healthcare industry is expanding rapidly. Discover diverse career opportunities.",
        author: "Dr. Maria Garcia",
        date: "Jan 9, 2024",
        readTime: "11 min read",
        category: "Healthcare"
      }
    ],
    "skill-building": [
      {
        title: "Mastering Soft Skills: The Key to Career Success",
        excerpt: "Technical skills get you hired, but soft skills get you promoted.",
        author: "Dr. James Wilson",
        date: "Jan 13, 2024",
        readTime: "12 min read",
        category: "Soft Skills",
        featured: true
      },
      {
        title: "Learning New Skills: A Guide to Continuous Education",
        excerpt: "In today's fast-paced world, continuous learning is essential.",
        author: "Amanda Foster",
        date: "Jan 10, 2024",
        readTime: "8 min read",
        category: "Learning"
      },
      {
        title: "Digital Skills Every Professional Needs in 2024",
        excerpt: "From basic computer literacy to advanced digital tools.",
        author: "Tech Skills Team",
        date: "Jan 8, 2024",
        readTime: "10 min read",
        category: "Digital Skills"
      }
    ],
    "networking": [
      {
        title: "Networking Strategies That Actually Work",
        excerpt: "Move beyond superficial networking to build meaningful professional relationships.",
        author: "Networking Expert",
        date: "Jan 12, 2024",
        readTime: "10 min read",
        category: "Networking",
        featured: true
      },
      {
        title: "Building Your Professional Network Online",
        excerpt: "Leverage social media and online platforms to expand your network.",
        author: "Digital Networking Pro",
        date: "Jan 9, 2024",
        readTime: "8 min read",
        category: "Online Networking"
      },
      {
        title: "Networking Events: Making the Most of In-Person Opportunities",
        excerpt: "How to prepare for and maximize your time at networking events.",
        author: "Event Networking Guide",
        date: "Jan 7, 2024",
        readTime: "7 min read",
        category: "Events"
      }
    ],
    "work-life-balance": [
      {
        title: "Achieving Work-Life Balance in a Digital World",
        excerpt: "In our always-connected world, maintaining work-life balance is challenging.",
        author: "Work-Life Balance Coach",
        date: "Jan 11, 2024",
        readTime: "11 min read",
        category: "Balance",
        featured: true
      },
      {
        title: "Stress Management Techniques for Busy Professionals",
        excerpt: "Effective stress management strategies to maintain peak performance.",
        author: "Stress Management Expert",
        date: "Jan 8, 2024",
        readTime: "9 min read",
        category: "Stress Management"
      },
      {
        title: "Setting Boundaries: Protecting Your Time and Energy",
        excerpt: "Learn how to set healthy boundaries at work and in your personal life.",
        author: "Boundary Setting Specialist",
        date: "Jan 6, 2024",
        readTime: "8 min read",
        category: "Boundaries"
      }
    ]
  };

  const careerStats = [
    {
      stat: "85%",
      label: "of jobs are filled through networking",
      icon: Users
    },
    {
      stat: "60%",
      label: "of professionals plan to change careers",
      icon: TrendingUp
    },
    {
      stat: "73%",
      label: "say soft skills are more important than hard skills",
      icon: Star
    },
    {
      stat: "40%",
      label: "increase in remote work opportunities",
      icon: Globe
    }
  ];

  const filteredArticles = articles[activeCategory as keyof typeof articles] || [];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Expert Career Advice & Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay ahead in your career with expert guidance, industry insights, and professional development strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Career Stats */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {careerStats.map((stat, index) => (
              <div key={index}>
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-purple-600 mr-2" />
                  <div className="text-2xl font-bold text-purple-600">{stat.stat}</div>
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Article Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      activeCategory === category.id
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <category.icon className="w-5 h-5" />
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Article */}
            {filteredArticles.filter(article => article.featured).map((article, index) => (
              <div key={index} className="mb-8">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">Featured</span>
                    <span className="text-gray-500 text-sm">{article.category}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{article.title}</h2>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>By {article.author}</span>
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                      Read Article
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredArticles.filter(article => !article.featured).map((article, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{article.category}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{article.author}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Advance Your Career?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Create a professional resume that showcases your skills and experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Start Building Resume
              </button>
            </Link>
            <Link href="/tips">
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200">
                Resume Writing Tips
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerAdvicePage;
