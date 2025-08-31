"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  HelpCircle, 
  BookOpen, 
  MessageCircle, 
  Mail, 
  Phone, 
  ChevronDown,
  ChevronRight,
  Play,
  FileText,
  Settings,
  Download,
  Palette,
  Zap,
  Shield,
  ArrowRight,
  Star,
  Users,
  Clock
} from "lucide-react";

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const categories = [
    { id: "getting-started", name: "Getting Started", icon: HelpCircle },
    { id: "templates", name: "Templates", icon: Palette },
    { id: "editor", name: "Editor", icon: FileText },
    { id: "export", name: "Export & Download", icon: Download },
    { id: "account", name: "Account & Settings", icon: Settings },
    { id: "billing", name: "Billing & Plans", icon: Shield }
  ];

  const faqs = {
    "getting-started": [
      {
        question: "How do I create my first resume?",
        answer: "Creating your first resume is easy! Simply sign up for a free account, choose a template that fits your industry, and start filling in your information. Our step-by-step builder will guide you through the process."
      },
      {
        question: "What information should I include in my resume?",
        answer: "Your resume should include your contact information, professional summary, work experience, education, skills, and any relevant certifications or achievements. Our AI-powered suggestions will help you highlight the most important information for your target role."
      },
      {
        question: "How long should my resume be?",
        answer: "For most professionals, a one-page resume is ideal. However, if you have extensive experience (10+ years) or are applying for senior positions, a two-page resume may be appropriate. Our templates automatically adjust to fit your content."
      },
      {
        question: "Can I use the same resume for different jobs?",
        answer: "While you can use the same template, it's recommended to customize your resume for each job application. Focus on relevant skills and experiences that match the job description. Our AI suggestions help you tailor your content."
      }
    ],
    "templates": [
      {
        question: "How do I choose the right template?",
        answer: "Consider your industry and the company culture. Professional templates work well for corporate roles, while creative templates are great for design or marketing positions. All our templates are ATS-optimized, so they'll work well with applicant tracking systems."
      },
      {
        question: "Can I customize the template colors and fonts?",
        answer: "Yes! Pro and Premium users can customize colors, fonts, spacing, and layout to match their personal brand. Free users have access to basic customization options."
      },
      {
        question: "Are the templates mobile-friendly?",
        answer: "Absolutely! All our templates are designed to look great on any device. You can preview how your resume will appear on desktop, tablet, and mobile devices."
      },
      {
        question: "Do you have industry-specific templates?",
        answer: "Yes, we offer templates designed specifically for different industries including technology, healthcare, finance, education, and more. These templates include industry-appropriate sections and formatting."
      }
    ],
    "editor": [
      {
        question: "How do I add or remove sections?",
        answer: "You can easily add or remove sections using the section manager. Click the '+' button to add new sections like projects, certifications, or custom sections. You can also reorder sections by dragging and dropping them."
      },
      {
        question: "Can I undo changes?",
        answer: "Yes! Our editor includes an undo/redo feature. You can also access version history to restore previous versions of your resume. All changes are automatically saved as you work."
      },
      {
        question: "How do I format text (bold, italic, etc.)?",
        answer: "Use the rich text editor toolbar to format your text. You can make text bold, italic, or underlined. You can also create bullet points and adjust text alignment."
      },
      {
        question: "What is the resume score and how do I improve it?",
        answer: "The resume score evaluates your resume's effectiveness based on content, formatting, and ATS compatibility. To improve your score, add more details to your experience, use action verbs, and ensure all sections are complete."
      }
    ],
    "export": [
      {
        question: "What file formats can I export my resume in?",
        answer: "You can export your resume as PDF, Word document (.docx), or plain text. PDF is recommended for most applications as it maintains formatting across all devices and platforms."
      },
      {
        question: "How do I print my resume?",
        answer: "Export your resume as a PDF and then print it from your PDF viewer. Our templates are optimized for standard A4/Letter paper sizes and will print perfectly."
      },
      {
        question: "Can I share my resume with others?",
        answer: "Yes! You can generate a shareable link to your resume or download it to share via email. You can also control who has access to your shared resume."
      },
      {
        question: "What's the difference between PDF and Word export?",
        answer: "PDF maintains exact formatting and is perfect for job applications. Word format allows for further editing in Microsoft Word or similar applications, which some employers prefer."
      }
    ],
    "account": [
      {
        question: "How do I change my password?",
        answer: "Go to your account settings and click on 'Change Password'. You'll need to enter your current password and then create a new one. Make sure to use a strong password with a mix of letters, numbers, and symbols."
      },
      {
        question: "Can I use the same account on multiple devices?",
        answer: "Yes! Your account syncs across all devices. Simply log in on any device and you'll have access to all your resumes and settings."
      },
      {
        question: "How do I delete my account?",
        answer: "To delete your account, go to account settings and click 'Delete Account'. Please note that this action is permanent and will delete all your data including resumes and settings."
      },
      {
        question: "Is my data secure?",
        answer: "Absolutely! We use industry-standard encryption to protect your data. We never share your personal information with third parties and you have full control over your data."
      }
    ],
    "billing": [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All payments are processed securely through Stripe."
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to your plan features until the end of your current billing period."
      },
      {
        question: "Do you offer refunds?",
        answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund."
      },
      {
        question: "Can I change my plan later?",
        answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments."
      }
    ]
  };

  const tutorials = [
    {
      title: "Creating Your First Resume",
      duration: "5 min",
      description: "Learn how to create a professional resume from scratch using our step-by-step builder.",
      icon: Play,
      link: "#"
    },
    {
      title: "Choosing the Right Template",
      duration: "3 min",
      description: "Find the perfect template for your industry and career level.",
      icon: Palette,
      link: "#"
    },
    {
      title: "Optimizing for ATS Systems",
      duration: "7 min",
      description: "Learn how to make your resume pass through Applicant Tracking Systems.",
      icon: Zap,
      link: "#"
    },
    {
      title: "Customizing Your Resume",
      duration: "4 min",
      description: "Personalize your resume with custom colors, fonts, and layouts.",
      icon: Settings,
      link: "#"
    }
  ];

  const supportOptions = [
    {
      title: "Email Support",
      description: "Get help via email within 24 hours",
      icon: Mail,
      contact: "support@resumebuilder.com",
      response: "24 hours"
    },
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: MessageCircle,
      contact: "Available 9AM-6PM EST",
      response: "Instant"
    },
    {
      title: "Phone Support",
      description: "Speak directly with our support team",
      icon: Phone,
      contact: "+1 (555) 123-4567",
      response: "5 minutes"
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFaqs = faqs[activeCategory as keyof typeof faqs] || [];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How Can We Help You?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find answers to common questions, watch tutorials, and get support for your resume building journey.
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles, tutorials, or FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">500+</div>
              <div className="text-gray-600">Help Articles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">50+</div>
              <div className="text-gray-600">Video Tutorials</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Help Categories</h2>
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

              {/* Quick Links */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link href="/templates" className="block text-blue-600 hover:text-blue-700">
                    Browse Templates
                  </Link>
                  <Link href="/features" className="block text-blue-600 hover:text-blue-700">
                    View Features
                  </Link>
                  <Link href="/pricing" className="block text-blue-600 hover:text-blue-700">
                    Pricing Plans
                  </Link>
                  <Link href="/register" className="block text-blue-600 hover:text-blue-700">
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* FAQ Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="font-semibold text-gray-900">{faq.question}</span>
                      {expandedFaqs.includes(index) ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFaqs.includes(index) && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tutorials Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Video Tutorials</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <tutorial.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{tutorial.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{tutorial.duration}</span>
                          <Link href={tutorial.link} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Watch Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Options */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Support</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {supportOptions.map((option, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <option.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                    <div className="text-sm">
                      <div className="text-gray-900 font-medium">{option.contact}</div>
                      <div className="text-gray-500">Response: {option.response}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still Need Help?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is here to help you create the perfect resume. 
            Don't hesitate to reach out if you need assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:support@resumebuilder.com">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Contact Support</span>
              </button>
            </Link>
            <Link href="/register">
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
                Start Building
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
