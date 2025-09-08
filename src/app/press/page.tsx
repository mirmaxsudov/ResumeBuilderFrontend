import React from "react";
import dynamic from "next/dynamic";
import { Download, Mail, Calendar, Users, Award, Globe } from "lucide-react";

// Dynamic imports for better performance
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const PressPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Press & Media
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Stay updated with the latest news, press releases, and media resources from Resume Builder.
            </p>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Company Overview</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Resume Builder is the leading platform helping millions of professionals create compelling resumes and advance their careers.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">2M+</div>
                <p className="text-gray-600">Active Users</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">50+</div>
                <p className="text-gray-600">Resume Templates</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">150+</div>
                <p className="text-gray-600">Countries Served</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">95%</div>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Latest Press Releases</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay informed about our latest announcements, product updates, and company milestones.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Resume Builder Reaches 2 Million Users Milestone
                    </h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>December 15, 2023</span>
                    </div>
                    <p className="text-gray-600">
                      Resume Builder celebrates a major milestone as it reaches 2 million active users worldwide. 
                      The platform continues to empower professionals with cutting-edge resume creation tools and 
                      career development resources.
                    </p>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                      Read More
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      New AI-Powered Resume Optimization Features Launched
                    </h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>November 28, 2023</span>
                    </div>
                    <p className="text-gray-600">
                      Resume Builder introduces advanced AI-powered features that help users create more 
                      effective resumes by analyzing job descriptions and suggesting relevant keywords and phrases.
                    </p>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                      Read More
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Resume Builder Expands to 150+ Countries
                    </h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>October 12, 2023</span>
                    </div>
                    <p className="text-gray-600">
                      Resume Builder announces global expansion with support for multiple languages and 
                      localized resume formats for international job markets.
                    </p>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Media Resources */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Media Resources</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Download our press kit, logos, and other media resources for journalists and media professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Press Kit</h3>
                <p className="text-gray-600 mb-6">
                  Complete press kit with company information, key statistics, and executive bios.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Download PDF
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Logo Package</h3>
                <p className="text-gray-600 mb-6">
                  High-resolution logos in various formats for print and digital use.
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Download ZIP
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Executive Photos</h3>
                <p className="text-gray-600 mb-6">
                  Professional headshots of our executive team for media use.
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Download ZIP
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Product Screenshots</h3>
                <p className="text-gray-600 mb-6">
                  High-quality screenshots of our resume builder platform.
                </p>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Download ZIP
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Fact Sheet</h3>
                <p className="text-gray-600 mb-6">
                  Quick reference guide with key company facts and statistics.
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Download PDF
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Media Contact</h3>
                <p className="text-gray-600 mb-6">
                  Get in touch with our PR team for interviews and media inquiries.
                </p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Media Coverage */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Recent Media Coverage</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See what leading publications are saying about Resume Builder and our impact on the job market.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-sm text-gray-500 mb-2">TechCrunch</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  "Resume Builder Revolutionizes Job Application Process"
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  The platform's AI-powered features are changing how professionals approach resume creation...
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Read Article →
                </a>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-sm text-gray-500 mb-2">Forbes</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  "How AI is Transforming Resume Writing"
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Resume Builder leads the charge in using artificial intelligence to help job seekers...
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Read Article →
                </a>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-sm text-gray-500 mb-2">The Wall Street Journal</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  "Startup Spotlight: Resume Builder's Global Expansion"
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  The company's rapid growth and international expansion strategy...
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Read Article →
                </a>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-sm text-gray-500 mb-2">Fast Company</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  "The Future of Job Applications"
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  How technology is reshaping the traditional job application process...
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Read Article →
                </a>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-sm text-gray-500 mb-2">Business Insider</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  "Resume Builder Reaches 2M Users"
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  The platform's impressive growth and user engagement metrics...
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Read Article →
                </a>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-sm text-gray-500 mb-2">VentureBeat</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  "AI-Powered Career Tools on the Rise"
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  How artificial intelligence is transforming career development...
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Read Article →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-xl text-gray-600 mb-8">
              For media inquiries, interview requests, or press-related questions, please contact our PR team.
            </p>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Press Contact</h3>
                  <div className="space-y-3 text-left">
                    <p className="text-gray-600">
                      <strong>Email:</strong><br />
                      press@resumebuilder.com
                    </p>
                    <p className="text-gray-600">
                      <strong>Phone:</strong><br />
                      +1 (555) 123-4567
                    </p>
                    <p className="text-gray-600">
                      <strong>Address:</strong><br />
                      123 Resume Street<br />
                      Uzbekistan, Tashkent 94105
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h3>
                  <div className="space-y-3 text-left">
                    <a href="#" className="block text-blue-600 hover:text-blue-700">
                      Company Fact Sheet
                    </a>
                    <a href="#" className="block text-blue-600 hover:text-blue-700">
                      Executive Bios
                    </a>
                    <a href="#" className="block text-blue-600 hover:text-blue-700">
                      Product Information
                    </a>
                    <a href="#" className="block text-blue-600 hover:text-blue-700">
                      Investor Relations
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PressPage;
