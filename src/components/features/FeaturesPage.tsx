"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Star,
  ArrowRight,
  Play,
  Code,
  BarChart3,
  Globe,
  Lock,
  RefreshCw,
  Sparkles
} from "lucide-react";

const FeaturesPage = () => {
  const [activeTab, setActiveTab] = useState("builder");

  const features = {
    builder: [
      {
        icon: Target,
        title: "ATS-Optimized Templates",
        description: "Our templates are specifically designed to pass Applicant Tracking Systems and get your resume in front of hiring managers.",
        benefits: ["98% ATS compatibility", "Keyword optimization", "Clean formatting", "Industry-specific layouts"]
      },
      {
        icon: Zap,
        title: "AI-Powered Suggestions",
        description: "Get intelligent recommendations for content, keywords, and formatting to make your resume stand out from the competition.",
        benefits: ["Smart content suggestions", "Keyword analysis", "Industry insights", "Performance optimization"]
      },
      {
        icon: Eye,
        title: "Real-time Preview",
        description: "See exactly how your resume will look as you build it, with instant updates and professional formatting.",
        benefits: ["Live preview", "Multiple formats", "Print-ready", "Mobile responsive"]
      },
      {
        icon: Download,
        title: "Multiple Export Formats",
        description: "Download your resume as PDF, Word, or plain text. Perfect for any application system or platform.",
        benefits: ["PDF format", "Word document", "Plain text", "Print optimized"]
      }
    ],
    editor: [
      {
        icon: Code,
        title: "Rich Text Editor",
        description: "Advanced text editing with formatting options, bullet points, and professional typography.",
        benefits: ["Rich formatting", "Bullet points", "Typography options", "Text alignment"]
      },
      {
        icon: RefreshCw,
        title: "Auto-save & Sync",
        description: "Your work is automatically saved and synced across all your devices, so you never lose progress.",
        benefits: ["Auto-save", "Cloud sync", "Version history", "Cross-device access"]
      },
      {
        icon: BarChart3,
        title: "Resume Score Tracking",
        description: "Get real-time feedback on your resume's effectiveness with our comprehensive scoring system.",
        benefits: ["Performance metrics", "Improvement suggestions", "ATS compatibility score", "Industry benchmarks"]
      },
      {
        icon: Sparkles,
        title: "Smart Content Suggestions",
        description: "AI-powered suggestions help you write compelling content that highlights your achievements.",
        benefits: ["Action verbs", "Achievement examples", "Industry keywords", "Professional language"]
      }
    ],
    templates: [
      {
        icon: Palette,
        title: "Professional Templates",
        description: "Choose from dozens of professionally designed templates for every industry and career level.",
        benefits: ["50+ templates", "Industry-specific", "Career-level appropriate", "Modern designs"]
      },
      {
        icon: Users,
        title: "Customizable Layouts",
        description: "Easily customize colors, fonts, spacing, and layout to match your personal brand.",
        benefits: ["Color customization", "Font selection", "Layout options", "Brand consistency"]
      },
      {
        icon: Globe,
        title: "Multi-language Support",
        description: "Create resumes in multiple languages with our international template collection.",
        benefits: ["Multiple languages", "Cultural adaptation", "International formats", "Translation support"]
      },
      {
        icon: FileText,
        title: "Cover Letter Builder",
        description: "Create matching cover letters that complement your resume and increase your chances of getting hired.",
        benefits: ["Matching designs", "Template variety", "Content suggestions", "Professional formatting"]
      }
    ],
    security: [
      {
        icon: Shield,
        title: "Secure & Private",
        description: "Your data is encrypted and secure. We never share your personal information with third parties.",
        benefits: ["Data encryption", "Privacy protection", "Secure storage", "No data sharing"]
      },
      {
        icon: Lock,
        title: "Account Security",
        description: "Advanced security features protect your account and personal information.",
        benefits: ["Two-factor authentication", "Secure login", "Password protection", "Account recovery"]
      },
      {
        icon: Smartphone,
        title: "Mobile-Friendly Editor",
        description: "Create and edit your resume on any device. Our responsive design works perfectly on phones and tablets.",
        benefits: ["Mobile optimized", "Touch-friendly", "Responsive design", "Cross-platform"]
      },
      {
        icon: Clock,
        title: "24/7 Access",
        description: "Access your resumes anytime, anywhere with our cloud-based platform.",
        benefits: ["Always available", "Cloud storage", "Instant access", "No downloads needed"]
      }
    ]
  };

  const tabs = [
    { id: "builder", name: "Resume Builder", icon: FileText },
    { id: "editor", name: "Advanced Editor", icon: Code },
    { id: "templates", name: "Templates", icon: Palette },
    { id: "security", name: "Security & Access", icon: Shield }
  ];

  const stats = [
    { number: "50+", label: "Professional Templates" },
    { number: "98%", label: "ATS Success Rate" },
    { number: "24/7", label: "Cloud Access" },
    { number: "100%", label: "Secure & Private" }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for Professional Resumes
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Everything you need to create a winning resume that gets you hired. 
              From AI-powered suggestions to ATS-optimized templates, we've got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Tabs */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Feature Content */}
          <div className="grid md:grid-cols-2 gap-8">
            {features[activeTab as keyof typeof features].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                See It in Action
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Watch how easy it is to create a professional resume with our intuitive builder. 
                From template selection to final export, the entire process takes just minutes.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Choose from 50+ professional templates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Get AI-powered content suggestions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Real-time preview and editing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Export in multiple formats</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Demo Video</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Resume Builder?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare our features with traditional resume building methods and see why professionals choose us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Traditional Methods</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-red-500" />
                  <span>Manual formatting</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-red-500" />
                  <span>No ATS optimization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-red-500" />
                  <span>Limited templates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-red-500" />
                  <span>Time-consuming</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Resume Builder</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Professional templates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>ATS-optimized</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>AI suggestions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Quick & easy</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Results</h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>98% success rate</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>More interviews</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Professional look</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Time saved</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already created winning resumes with our powerful features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center space-x-2">
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/templates">
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
                View Templates
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;