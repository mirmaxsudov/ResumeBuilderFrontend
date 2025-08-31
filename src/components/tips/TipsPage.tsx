"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Lightbulb, 
  Target, 
  CheckCircle, 
  AlertCircle, 
  BookOpen, 
  Star,
  ArrowRight,
  Clock,
  Users,
  TrendingUp,
  FileText,
  Palette,
  Zap,
  Eye,
  Search,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Languages
} from "lucide-react";

const TipsPage = () => {
  const [activeCategory, setActiveCategory] = useState("resume-writing");

  const categories = [
    { id: "resume-writing", name: "Resume Writing", icon: FileText },
    { id: "ats-optimization", name: "ATS Optimization", icon: Search },
    { id: "design-tips", name: "Design & Formatting", icon: Palette },
    { id: "content-tips", name: "Content Strategy", icon: BookOpen },
    { id: "industry-tips", name: "Industry Specific", icon: Briefcase }
  ];

  const tips = {
    "resume-writing": [
      {
        title: "Start with a Strong Summary",
        description: "Your professional summary should be a compelling 2-3 sentence overview that highlights your key achievements and value proposition.",
        icon: Star,
        difficulty: "Beginner",
        timeToRead: "3 min read"
      },
      {
        title: "Use Action Verbs",
        description: "Begin bullet points with strong action verbs like 'achieved', 'developed', 'implemented', 'managed', and 'increased' to show impact.",
        icon: Zap,
        difficulty: "Beginner",
        timeToRead: "2 min read"
      },
      {
        title: "Quantify Your Achievements",
        description: "Include specific numbers, percentages, and metrics to demonstrate the impact of your work. For example: 'Increased sales by 25%'.",
        icon: TrendingUp,
        difficulty: "Intermediate",
        timeToRead: "4 min read"
      },
      {
        title: "Keep It Concise",
        description: "Aim for 1-2 pages maximum. Be selective about what you include and focus on the most relevant experience for the position.",
        icon: Clock,
        difficulty: "Beginner",
        timeToRead: "3 min read"
      },
      {
        title: "Tailor for Each Job",
        description: "Customize your resume for each position by highlighting relevant skills and experiences that match the job description.",
        icon: Target,
        difficulty: "Intermediate",
        timeToRead: "5 min read"
      }
    ],
    "ats-optimization": [
      {
        title: "Use Standard Section Headers",
        description: "Use common section titles like 'Work Experience', 'Education', 'Skills' that ATS systems can easily recognize and parse.",
        icon: CheckCircle,
        difficulty: "Beginner",
        timeToRead: "2 min read"
      },
      {
        title: "Include Relevant Keywords",
        description: "Carefully read job descriptions and include relevant keywords naturally throughout your resume to improve ATS matching.",
        icon: Search,
        difficulty: "Intermediate",
        timeToRead: "4 min read"
      },
      {
        title: "Avoid Complex Formatting",
        description: "Stick to simple, clean formatting. Avoid tables, graphics, and unusual fonts that ATS systems might not process correctly.",
        icon: AlertCircle,
        difficulty: "Beginner",
        timeToRead: "3 min read"
      },
      {
        title: "Use Standard File Formats",
        description: "Save your resume as a PDF or Word document (.docx) to ensure compatibility with ATS systems.",
        icon: FileText,
        difficulty: "Beginner",
        timeToRead: "2 min read"
      },
      {
        title: "Test Your Resume",
        description: "Use ATS testing tools to check how your resume will be parsed and make adjustments based on the results.",
        icon: Eye,
        difficulty: "Advanced",
        timeToRead: "6 min read"
      }
    ],
    "design-tips": [
      {
        title: "Choose the Right Font",
        description: "Use professional fonts like Arial, Calibri, or Times New Roman in 10-12pt size for optimal readability.",
        icon: Palette,
        difficulty: "Beginner",
        timeToRead: "2 min read"
      },
      {
        title: "Maintain Consistent Spacing",
        description: "Use consistent margins (0.5-1 inch) and spacing between sections to create a clean, professional appearance.",
        icon: CheckCircle,
        difficulty: "Beginner",
        timeToRead: "3 min read"
      },
      {
        title: "Use Bullet Points Effectively",
        description: "Use bullet points to break up text and make information easy to scan. Keep each point concise and impactful.",
        icon: Star,
        difficulty: "Beginner",
        timeToRead: "3 min read"
      },
      {
        title: "Limit Colors and Graphics",
        description: "For most industries, stick to black text on white background. Use color sparingly and only if appropriate for your field.",
        icon: AlertCircle,
        difficulty: "Beginner",
        timeToRead: "2 min read"
      },
      {
        title: "Ensure Mobile Compatibility",
        description: "Test how your resume looks on different devices and screen sizes to ensure it's readable everywhere.",
        icon: Eye,
        difficulty: "Intermediate",
        timeToRead: "4 min read"
      }
    ],
    "content-tips": [
      {
        title: "Focus on Recent Experience",
        description: "Emphasize your most recent and relevant work experience. Older positions can be summarized briefly.",
        icon: Clock,
        difficulty: "Beginner",
        timeToRead: "3 min read"
      },
      {
        title: "Highlight Transferable Skills",
        description: "Identify and emphasize skills that are valuable across different roles and industries.",
        icon: TrendingUp,
        difficulty: "Intermediate",
        timeToRead: "4 min read"
      },
      {
        title: "Include Relevant Certifications",
        description: "List professional certifications and licenses that are relevant to your target position.",
        icon: Award,
        difficulty: "Beginner",
        timeToRead: "2 min read"
      },
      {
        title: "Show Career Progression",
        description: "Demonstrate how you've grown and advanced in your career through promotions and increased responsibilities.",
        icon: TrendingUp,
        difficulty: "Intermediate",
        timeToRead: "4 min read"
      },
      {
        title: "Address Employment Gaps",
        description: "Be prepared to explain any gaps in employment. Consider including relevant activities during those periods.",
        icon: Calendar,
        difficulty: "Intermediate",
        timeToRead: "5 min read"
      }
    ],
    "industry-tips": [
      {
        title: "Tech Industry Focus",
        description: "Emphasize technical skills, programming languages, and specific technologies. Include GitHub links and project portfolios.",
        icon: Zap,
        difficulty: "Intermediate",
        timeToRead: "5 min read"
      },
      {
        title: "Creative Industry Approach",
        description: "Showcase your portfolio and creative projects. Use more visual elements and focus on design skills.",
        icon: Palette,
        difficulty: "Intermediate",
        timeToRead: "4 min read"
      },
      {
        title: "Finance Industry Standards",
        description: "Emphasize quantitative skills, certifications (CFA, CPA), and experience with financial software and regulations.",
        icon: TrendingUp,
        difficulty: "Intermediate",
        timeToRead: "4 min read"
      },
      {
        title: "Healthcare Industry Requirements",
        description: "Highlight licenses, certifications, patient care experience, and knowledge of healthcare systems and regulations.",
        icon: Users,
        difficulty: "Intermediate",
        timeToRead: "4 min read"
      },
      {
        title: "Education Sector Focus",
        description: "Emphasize teaching experience, certifications, curriculum development, and student outcomes.",
        icon: GraduationCap,
        difficulty: "Intermediate",
        timeToRead: "4 min read"
      }
    ]
  };

  const commonMistakes = [
    {
      mistake: "Spelling and Grammar Errors",
      impact: "High",
      solution: "Always proofread your resume multiple times and use spell-check tools."
    },
    {
      mistake: "Generic Objective Statements",
      impact: "Medium",
      solution: "Replace with a compelling professional summary tailored to the position."
    },
    {
      mistake: "Including Irrelevant Information",
      impact: "Medium",
      solution: "Focus only on experience and skills relevant to the target position."
    },
    {
      mistake: "Using Passive Language",
      impact: "High",
      solution: "Use active voice and strong action verbs to demonstrate leadership and initiative."
    },
    {
      mistake: "Poor Formatting",
      impact: "Medium",
      solution: "Use consistent formatting, proper spacing, and professional fonts."
    }
  ];

  const quickTips = [
    "Keep your resume to 1-2 pages maximum",
    "Use bullet points for easy scanning",
    "Include quantifiable achievements",
    "Customize for each job application",
    "Proofread multiple times",
    "Use professional email addresses",
    "Include relevant keywords naturally",
    "Focus on recent and relevant experience"
  ];

  const filteredTips = tips[activeCategory as keyof typeof tips] || [];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Resume Writing Tips & Best Practices
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert advice to help you create a compelling resume that stands out and gets you hired.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">50+</div>
              <div className="text-gray-600">Expert Tips</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">5</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">10K+</div>
              <div className="text-gray-600">Users Helped</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tip Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      activeCategory === category.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <category.icon className="w-5 h-5" />
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Quick Tips */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h3>
                <div className="space-y-2">
                  {quickTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tips Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {categories.find(cat => cat.id === activeCategory)?.name} Tips
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {filteredTips.map((tip, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <tip.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{tip.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {tip.difficulty}
                            </span>
                            <span className="text-xs text-gray-500">{tip.timeToRead}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Resume Mistakes to Avoid</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="grid md:grid-cols-1 gap-4">
                  {commonMistakes.map((mistake, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{mistake.mistake}</h4>
                          <span className={`text-xs px-2 py-1 rounded ${
                            mistake.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {mistake.impact} Impact
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{mistake.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Resources */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/templates" className="block">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Palette className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Resume Templates</h3>
                        <p className="text-gray-600 text-sm mb-2">Browse our collection of professional templates</p>
                        <div className="flex items-center text-green-600 text-sm font-medium">
                          <span>View Templates</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/career-advice" className="block">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Career Advice</h3>
                        <p className="text-gray-600 text-sm mb-2">Get expert career guidance and insights</p>
                        <div className="flex items-center text-purple-600 text-sm font-medium">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Apply these tips and create a resume that stands out from the competition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Start Building Now
              </button>
            </Link>
            <Link href="/templates">
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
                Browse Templates
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TipsPage;
