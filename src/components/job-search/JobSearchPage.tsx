"use client";

import React from "react";
import Link from "next/link";
import { Search, Briefcase, Users, FileText, MessageCircle, CheckCircle, ArrowRight, ExternalLink, Linkedin, Building } from "lucide-react";

const JobSearchPage = () => {
  const jobSearchStats = [
    { stat: "80%", label: "of jobs are never advertised", icon: Search },
    { stat: "70%", label: "of people get jobs through networking", icon: Users },
    { stat: "250+", label: "applications per job opening", icon: FileText },
    { stat: "30%", label: "higher success rate with referrals", icon: CheckCircle }
  ];

  const popularJobSites = [
    { name: "LinkedIn", url: "https://linkedin.com/jobs", description: "Professional networking and job search", icon: Linkedin },
    { name: "Indeed", url: "https://indeed.com", description: "World's largest job search engine", icon: Briefcase },
    { name: "Glassdoor", url: "https://glassdoor.com", description: "Jobs with company reviews and salaries", icon: Building }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Job Search Strategies & Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master the art of job searching with proven strategies, platform recommendations, and expert tips.
            </p>
          </div>
        </div>
      </section>

      {/* Job Search Stats */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {jobSearchStats.map((stat, index) => (
              <div key={index}>
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-green-600 mr-2" />
                  <div className="text-2xl font-bold text-green-600">{stat.stat}</div>
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Job Search Strategies */}
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Search Strategies</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Define Your Goals</h3>
                <p className="text-gray-600 mb-4">Clearly identify your target roles, industries, and companies.</p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Research your target industry</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Identify must-have requirements</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Set realistic salary expectations</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Use Multiple Methods</h3>
                <p className="text-gray-600 mb-4">Combine online platforms, networking, and direct applications.</p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Online job boards</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Professional networking</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Direct company applications</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Popular Job Sites */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Job Search Platforms</h2>
            <div className="space-y-4">
              {popularJobSites.map((site, index) => (
                <a
                  key={index}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 block"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <site.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{site.name}</h3>
                      <p className="text-gray-600 text-sm">{site.description}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-blue-600" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Create a professional resume that stands out and gets you noticed by employers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Create Professional Resume
              </button>
            </Link>
            <Link href="/interview-tips">
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-200">
                Interview Preparation
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobSearchPage;
