import React from "react";
import dynamic from "next/dynamic";
import { Users, Target, Award, Globe, Heart, Zap } from "lucide-react";

// Dynamic imports for better performance
const Navigation = dynamic(() => import("@/components/home/navigation/Navigation"));
const Footer = dynamic(() => import("@/components/home/footer/Footer"));

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Resume Builder
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Empowering millions of professionals worldwide to create compelling resumes that get them hired.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                To democratize career success by providing everyone with the tools, resources, and guidance 
                they need to create professional resumes that stand out in today's competitive job market.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
                <p className="text-gray-600">
                  To be the world's most trusted platform for career development and professional growth.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Values</h3>
                <p className="text-gray-600">
                  Innovation, integrity, user-centricity, and commitment to helping people succeed.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Promise</h3>
                <p className="text-gray-600">
                  To provide cutting-edge tools that make resume creation simple, effective, and accessible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2020, Resume Builder was born from a simple observation: too many talented 
                  professionals were struggling to create resumes that effectively showcased their skills 
                  and experience.
                </p>
                <p className="text-gray-600 mb-4">
                  Our founders, experienced in both technology and recruitment, recognized that the traditional 
                  resume creation process was outdated, time-consuming, and often resulted in generic documents 
                  that failed to capture individual strengths.
                </p>
                <p className="text-gray-600">
                  Today, we've helped over 2 million professionals create compelling resumes that have led 
                  to successful job placements across industries worldwide.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Milestones</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">2020 - Founded</h4>
                      <p className="text-gray-600 text-sm">Launched with our first resume builder platform</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">2021 - 500K Users</h4>
                      <p className="text-gray-600 text-sm">Reached our first major milestone</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">2022 - ATS Optimization</h4>
                      <p className="text-gray-600 text-sm">Introduced advanced ATS compatibility features</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">2023 - 2M+ Users</h4>
                      <p className="text-gray-600 text-sm">Expanded globally with multi-language support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
              <p className="text-xl text-gray-600">
                Numbers that tell our story of growth and success
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
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">95%</div>
                <p className="text-gray-600">Success Rate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">150+</div>
                <p className="text-gray-600">Countries Served</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the passionate individuals behind Resume Builder who are dedicated to helping you succeed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">JD</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">John Doe</h3>
                <p className="text-blue-600 mb-3">CEO & Co-Founder</p>
                <p className="text-gray-600 text-sm">
                  Former tech executive with 15+ years experience in product development and user experience.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">JS</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Jane Smith</h3>
                <p className="text-green-600 mb-3">CTO & Co-Founder</p>
                <p className="text-gray-600 text-sm">
                  Expert in AI and machine learning with a passion for building scalable technology solutions.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">MJ</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mike Johnson</h3>
                <p className="text-purple-600 mb-3">Head of Design</p>
                <p className="text-gray-600 text-sm">
                  Award-winning designer focused on creating intuitive and beautiful user experiences.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">SW</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Wilson</h3>
                <p className="text-orange-600 mb-3">Head of Customer Success</p>
                <p className="text-gray-600 text-sm">
                  Dedicated to ensuring every user has the support they need to create their perfect resume.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">DB</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">David Brown</h3>
                <p className="text-red-600 mb-3">Head of Marketing</p>
                <p className="text-gray-600 text-sm">
                  Strategic marketer with expertise in growth and brand development in the tech industry.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">LD</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lisa Davis</h3>
                <p className="text-indigo-600 mb-3">Head of Content</p>
                <p className="text-gray-600 text-sm">
                  Career expert and writer who creates valuable resources to help users advance their careers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What Drives Us</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our core values guide everything we do and help us stay focused on our mission.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">User-Centric</h3>
                <p className="text-gray-600">
                  Every decision we make is driven by what's best for our users. Their success is our success.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in everything we do, from product quality to customer support.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
                <p className="text-gray-600">
                  We believe everyone deserves access to professional tools, regardless of their background.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We continuously innovate to provide cutting-edge solutions that meet evolving needs.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrity</h3>
                <p className="text-gray-600">
                  We operate with honesty, transparency, and ethical practices in all our interactions.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Results</h3>
                <p className="text-gray-600">
                  We're focused on delivering measurable results that help our users achieve their goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Create Your Professional Resume?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join millions of professionals who trust Resume Builder to advance their careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Get Started Free
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                View Templates
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
