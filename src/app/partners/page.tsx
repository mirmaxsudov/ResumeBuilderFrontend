import React from "react";
import dynamic from "next/dynamic";
import { Handshake, Users, Globe, Award, Mail, ArrowRight } from "lucide-react";

// Dynamic imports for better performance
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const PartnersPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Partner With Us
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join forces with Resume Builder to help millions of professionals advance their careers worldwide.
            </p>
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Partner With Us?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We offer comprehensive partnership programs designed to create mutual value and drive success for both parties.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Access to 2M+ Users</h3>
                <p className="text-gray-600">
                  Tap into our growing community of professionals actively seeking career advancement tools and resources.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Reach</h3>
                <p className="text-gray-600">
                  Expand your market presence with our international user base across 150+ countries.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Proven Success</h3>
                <p className="text-gray-600">
                  Partner with a platform that has helped millions of users create compelling resumes and land their dream jobs.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible Partnerships</h3>
                <p className="text-gray-600">
                  Choose from various partnership models that align with your business goals and objectives.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Dedicated Support</h3>
                <p className="text-gray-600">
                  Get personalized support from our partnership team to ensure your success and growth.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation Focus</h3>
                <p className="text-gray-600">
                  Collaborate with a company that continuously innovates and stays ahead of industry trends.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Types */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Partnership Programs</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We offer various partnership opportunities tailored to different business needs and objectives.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Affiliate Partnership</h3>
                <p className="text-gray-600 mb-6">
                  Earn commissions by promoting Resume Builder to your audience. Perfect for content creators, 
                  career coaches, and educational institutions.
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Competitive commission rates</li>
                  <li>Marketing materials and support</li>
                  <li>Real-time tracking and analytics</li>
                  <li>Flexible payment terms</li>
                </ul>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Learn More
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Technology Integration</h3>
                <p className="text-gray-600 mb-6">
                  Integrate our resume builder technology into your platform or application. Ideal for HR software, 
                  job boards, and career platforms.
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>API access and documentation</li>
                  <li>Custom branding options</li>
                  <li>Technical support and training</li>
                  <li>Revenue sharing opportunities</li>
                </ul>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Learn More
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Solutions</h3>
                <p className="text-gray-600 mb-6">
                  Provide resume building services to your employees or clients. Perfect for corporations, 
                  universities, and staffing agencies.
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Custom pricing and packages</li>
                  <li>White-label solutions</li>
                  <li>Dedicated account management</li>
                  <li>Training and onboarding support</li>
                </ul>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Learn More
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Content Partnership</h3>
                <p className="text-gray-600 mb-6">
                  Collaborate on content creation and distribution. Great for media outlets, blogs, and 
                  educational content creators.
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Co-branded content opportunities</li>
                  <li>Guest posting and cross-promotion</li>
                  <li>Expert interviews and insights</li>
                  <li>Shared marketing campaigns</li>
                </ul>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Partner Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our partners have grown their businesses and expanded their reach through our partnership programs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold text-lg">C</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">CareerBoost University</h4>
                    <p className="text-sm text-gray-600">Educational Institution</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Partnering with Resume Builder has significantly enhanced our career services. 
                  Our students now have access to professional resume tools, leading to improved job placement rates."
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Result:</strong> 40% increase in student job placement
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold text-lg">J</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">JobMatch Pro</h4>
                    <p className="text-sm text-gray-600">Job Board Platform</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "The integration of Resume Builder into our platform has created a seamless experience 
                  for our users and increased our engagement metrics significantly."
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Result:</strong> 60% increase in user engagement
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-bold text-lg">H</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">HR Solutions Inc.</h4>
                    <p className="text-sm text-gray-600">HR Software Company</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Our enterprise clients love the resume builder integration. It's become a key 
                  differentiator for our HR software suite."
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Result:</strong> 25% increase in enterprise sales
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Process */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">How to Get Started</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our partnership process is simple and designed to get you up and running quickly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Us</h3>
                <p className="text-gray-600">
                  Reach out to our partnership team to discuss your goals and explore opportunities.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Evaluate Options</h3>
                <p className="text-gray-600">
                  We'll work together to identify the best partnership model for your business needs.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Set Up & Launch</h3>
                <p className="text-gray-600">
                  We'll help you get set up with the necessary tools, training, and support to succeed.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Grow Together</h3>
                <p className="text-gray-600">
                  We'll provide ongoing support and optimization to help you maximize your partnership success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss how we can create value together and help millions of professionals advance their careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Contact Partnership Team
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Download Partnership Guide
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PartnersPage;
