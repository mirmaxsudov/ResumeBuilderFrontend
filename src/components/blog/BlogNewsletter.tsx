"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";

const BlogNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Our Community!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              You've successfully subscribed to our newsletter. You'll receive our latest career insights, 
              resume tips, and job search strategies directly in your inbox.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">What you'll get:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Weekly career advice and industry insights</li>
                <li>• Exclusive resume writing tips and templates</li>
                <li>• Interview preparation strategies</li>
                <li>• Job market trends and opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Ahead in Your Career
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the latest career insights, resume tips, and job search strategies 
            delivered directly to your inbox every week.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100 text-sm">Career Articles</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-2">50k+</div>
              <div className="text-blue-100 text-sm">Subscribers</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-100 text-sm">Success Rate</div>
            </div>
          </div>

          <p className="text-blue-200 text-sm mt-8">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogNewsletter;
