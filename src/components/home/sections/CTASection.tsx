"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Star, Users, Clock } from "lucide-react";

interface CTASectionProps {
  countOfUsers: number;
}

const CTASection: React.FC<CTASectionProps> = ({ countOfUsers }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main CTA */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join over {countOfUsers.toLocaleString()} professionals who have already created winning resumes and landed their dream jobs.
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4 mx-auto">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Create in Minutes</h3>
              <p className="text-blue-100 text-sm">
                Build a professional resume in under 15 minutes with our intuitive builder
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4 mx-auto">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">ATS Optimized</h3>
              <p className="text-blue-100 text-sm">
                Templates designed to pass Applicant Tracking Systems
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Proven Results</h3>
              <p className="text-blue-100 text-sm">
                98% of users report getting more interviews
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/register">
              <button className="group bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </Link>
            <Link href="/resume-templates">
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center space-x-2">
                <span>View Templates</span>
              </button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Free to get started</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Cancel anytime</span>
            </div>
          </div>

          {/* Social proof */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-blue-100 text-sm mb-4">
              Trusted by professionals at top companies
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-white font-semibold">Google</div>
              <div className="text-white font-semibold">Microsoft</div>
              <div className="text-white font-semibold">Amazon</div>
              <div className="text-white font-semibold">Netflix</div>
              <div className="text-white font-semibold">Apple</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
