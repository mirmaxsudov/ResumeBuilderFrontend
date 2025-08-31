"use client";

import React from "react";
import { 
  CheckCircle, 
  Zap, 
  Eye, 
  Download, 
  Smartphone, 
  Shield, 
  Palette, 
  Target,
  FileText,
  Users,
  Clock,
  Star
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "ATS-Optimized Templates",
      description: "Our templates are designed to pass Applicant Tracking Systems and get your resume in front of hiring managers.",
      color: "blue"
    },
    {
      icon: Zap,
      title: "AI-Powered Suggestions",
      description: "Get intelligent recommendations for content, keywords, and formatting to make your resume stand out.",
      color: "purple"
    },
    {
      icon: Eye,
      title: "Real-time Preview",
      description: "See exactly how your resume will look as you build it, with instant updates and professional formatting.",
      color: "green"
    },
    {
      icon: Download,
      title: "Multiple Export Formats",
      description: "Download your resume as PDF, Word, or plain text. Perfect for any application system.",
      color: "orange"
    },
    {
      icon: Smartphone,
      title: "Mobile-Friendly Editor",
      description: "Create and edit your resume on any device. Our responsive design works perfectly on phones and tablets.",
      color: "pink"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and secure. We never share your personal information with third parties.",
      color: "indigo"
    },
    {
      icon: Palette,
      title: "Professional Templates",
      description: "Choose from dozens of professionally designed templates for every industry and career level.",
      color: "teal"
    },
    {
      icon: FileText,
      title: "Cover Letter Builder",
      description: "Create matching cover letters that complement your resume and increase your chances of getting hired.",
      color: "red"
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: "Trusted by Millions",
      description: "Join thousands of professionals who have successfully landed their dream jobs"
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Create a professional resume in minutes, not hours"
    },
    {
      icon: Star,
      title: "Proven Results",
      description: "98% of users report getting more interviews after using our builder"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      green: "bg-green-100 text-green-600",
      orange: "bg-orange-100 text-orange-600",
      pink: "bg-pink-100 text-pink-600",
      indigo: "bg-indigo-100 text-indigo-600",
      teal: "bg-teal-100 text-teal-600",
      red: "bg-red-100 text-red-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Create a Winning Resume
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive resume builder provides all the tools and features you need to create a professional resume that gets you noticed.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${getColorClasses(feature.color)} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Resume Builder?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've helped millions of professionals land their dream jobs. Here's what makes us different.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h4>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              <span>Free to get started • No credit card required</span>
            </div>
            <p className="text-gray-600 mb-6">
              Join thousands of professionals who have already created winning resumes
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200">
              Start Building Your Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
