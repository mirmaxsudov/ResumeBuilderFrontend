"use client";

import React, { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Google",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      content: "I used this resume builder to apply for my dream job at Google. The ATS-optimized template helped me get past the initial screening, and I landed the position within 2 weeks!",
      result: "Got hired at Google"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Marketing Manager",
      company: "Netflix",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      content: "The AI suggestions were incredibly helpful. It highlighted keywords I was missing and helped me showcase my achievements better. I received 3 job offers within a month.",
      result: "Received 3 job offers"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Airbnb",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      content: "As a designer, I was skeptical about using a template, but the modern designs are beautiful and professional. The real-time preview helped me perfect every detail.",
      result: "Landed role at Airbnb"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Product Manager",
      company: "Microsoft",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      content: "The resume score tracking feature was a game-changer. I could see exactly what was working and what needed improvement. My interview rate increased by 300%.",
      result: "300% more interviews"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Data Scientist",
      company: "Amazon",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      content: "Perfect for technical roles! The template helped me highlight my technical skills and projects effectively. I got my dream job at Amazon within weeks.",
      result: "Hired at Amazon"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loved by Job Seekers Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our resume builder has helped thousands of professionals land their dream jobs at top companies.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-gray-700 mb-4 italic">
                "{testimonial.content}"
              </blockquote>

              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                {testimonial.result}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Testimonial */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Quote className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Featured Success Story
            </h3>
          </div>

          <div className="flex items-center justify-center mb-8">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 mr-4"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="text-center flex-1">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gray-300 rounded-full mr-6"></div>
                <div className="text-left">
                  <h4 className="text-xl font-semibold text-gray-900">{currentTestimonial.name}</h4>
                  <p className="text-gray-600">{currentTestimonial.role} at {currentTestimonial.company}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <blockquote className="text-lg text-gray-700 mb-6 italic max-w-2xl mx-auto">
                "{currentTestimonial.content}"
              </blockquote>

              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                {currentTestimonial.result}
              </div>
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 ml-4"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50k+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
