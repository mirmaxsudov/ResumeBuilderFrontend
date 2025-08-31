import React from "react";
import dynamic from "next/dynamic";
import { MapPin, Clock, DollarSign, Users, Heart, Zap, Award, Globe } from "lucide-react";

// Dynamic imports for better performance
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Help us empower millions of professionals worldwide to create compelling resumes and advance their careers.
            </p>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Culture</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're building a team of passionate individuals who believe in the power of helping others succeed. 
                Our culture is built on collaboration, innovation, and a shared mission to democratize career success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Health & Wellness</h3>
                <p className="text-gray-600">Comprehensive health insurance, dental, vision, and mental health support</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible Work</h3>
                <p className="text-gray-600">Remote work options, flexible hours, and unlimited PTO</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Growth</h3>
                <p className="text-gray-600">Learning budget, conference attendance, and career development programs</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Great Team</h3>
                <p className="text-gray-600">Work with passionate, talented individuals who care about your success</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Impact</h3>
                <p className="text-gray-600">Help millions of people advance their careers worldwide</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Competitive Pay</h3>
                <p className="text-gray-600">Attractive salary packages with equity and performance bonuses</p>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Open Positions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready to make a difference? Check out our current openings and find the perfect role for you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Senior Frontend Developer</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        San Francisco, CA
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Full-time
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        $120,000 - $160,000
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Engineering
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Join our engineering team to build beautiful, responsive user interfaces that help millions create their perfect resumes.
                </p>
                
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Apply Now
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Product Manager</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        Remote
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Full-time
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        $100,000 - $140,000
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Product
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Lead product strategy and execution for our resume builder platform, working closely with engineering and design teams.
                </p>
                
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Apply Now
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">UX/UI Designer</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        San Francisco, CA
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Full-time
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        $90,000 - $130,000
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      Design
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Create intuitive and beautiful user experiences that help users create professional resumes with ease.
                </p>
                
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Apply Now
                </button>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Don't see a position that fits? We're always looking for talented individuals to join our team.
              </p>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                Send Us Your Resume
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Help us empower millions of professionals worldwide to create compelling resumes and advance their careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                View All Positions
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CareersPage;
