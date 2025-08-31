"use client";

import React from "react";
import Link from "next/link";
import { 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Star,
  ArrowRight,
  Users,
  FileText,
  Target,
  Zap,
  Eye,
  Download,
  Mail,
  Phone,
  Video,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Heart,
  Lightbulb
} from "lucide-react";

const InterviewTipsPage = () => {
  const interviewStats = [
    { stat: "7 seconds", label: "to make a first impression", icon: Eye },
    { stat: "80%", label: "of hiring decisions based on soft skills", icon: Users },
    { stat: "3-5", label: "questions to prepare for each interview", icon: Target },
    { stat: "24 hours", label: "to send thank you notes", icon: Mail }
  ];

  const interviewPhases = [
    {
      phase: "Before the Interview",
      icon: Calendar,
      tips: [
        "Research the company thoroughly",
        "Practice common interview questions",
        "Prepare your elevator pitch",
        "Plan your outfit and route",
        "Bring extra copies of your resume"
      ]
    },
    {
      phase: "During the Interview",
      icon: MessageCircle,
      tips: [
        "Arrive 10-15 minutes early",
        "Maintain good eye contact",
        "Listen carefully and ask questions",
        "Use the STAR method for answers",
        "Show enthusiasm and confidence"
      ]
    },
    {
      phase: "After the Interview",
      icon: Mail,
      tips: [
        "Send thank you notes within 24 hours",
        "Follow up on next steps",
        "Reflect on your performance",
        "Continue your job search",
        "Stay in touch with the interviewer"
      ]
    }
  ];

  const commonQuestions = [
    {
      question: "Tell me about yourself",
      category: "Personal",
      tips: "Keep it professional and relevant to the job. Focus on your career journey and key achievements."
    },
    {
      question: "Why do you want to work here?",
      category: "Motivation",
      tips: "Show you've researched the company and connect your values with their mission and culture."
    },
    {
      question: "What are your greatest strengths?",
      category: "Self-Assessment",
      tips: "Choose 2-3 strengths relevant to the job and provide specific examples of how you've used them."
    },
    {
      question: "What is your greatest weakness?",
      category: "Self-Assessment",
      tips: "Choose a real weakness, show how you're working to improve it, and relate it to growth."
    },
    {
      question: "Where do you see yourself in 5 years?",
      category: "Career Goals",
      tips: "Show ambition while being realistic. Connect your goals to the company's growth opportunities."
    },
    {
      question: "Why should we hire you?",
      category: "Value Proposition",
      tips: "Summarize your key qualifications and explain how you'll add value to the company."
    }
  ];

  const interviewTypes = [
    {
      type: "Phone Interview",
      icon: Phone,
      description: "Initial screening interview",
      tips: [
        "Find a quiet location",
        "Have your resume handy",
        "Speak clearly and professionally",
        "Prepare for common questions"
      ]
    },
    {
      type: "Video Interview",
      icon: Video,
      description: "Remote interview via video call",
      tips: [
        "Test your technology beforehand",
        "Choose a professional background",
        "Dress as you would for in-person",
        "Maintain eye contact with the camera"
      ]
    },
    {
      type: "In-Person Interview",
      icon: Users,
      description: "Traditional face-to-face interview",
      tips: [
        "Dress professionally",
        "Arrive early",
        "Bring copies of your resume",
        "Prepare thoughtful questions"
      ]
    },
    {
      type: "Panel Interview",
      icon: Users,
      description: "Interview with multiple people",
      tips: [
        "Make eye contact with everyone",
        "Address each person when answering",
        "Remember names and titles",
        "Send thank you notes to all"
      ]
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-red-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Interview Tips & Preparation Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master the art of interviewing with proven strategies, common questions, and expert preparation tips.
            </p>
          </div>
        </div>
      </section>

      {/* Interview Stats */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {interviewStats.map((stat, index) => (
              <div key={index}>
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-orange-600 mr-2" />
                  <div className="text-2xl font-bold text-orange-600">{stat.stat}</div>
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Interview Phases */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Interview Preparation Timeline</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {interviewPhases.map((phase, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <phase.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{phase.phase}</h3>
                </div>
                <ul className="space-y-3">
                  {phase.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Common Interview Questions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Interview Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {commonQuestions.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.question}</h3>
                <p className="text-gray-600 text-sm">{item.tips}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interview Types */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Types of Interviews</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interviewTypes.map((type, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <type.icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{type.type}</h3>
                    <p className="text-gray-600 text-sm">{type.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {type.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2">
                      <ArrowRight className="w-3 h-3 text-orange-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* STAR Method */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">The STAR Method</h2>
          <p className="text-gray-600 mb-6 text-center">
            Use the STAR method to structure your answers to behavioral interview questions.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-xl">S</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Situation</h3>
              <p className="text-gray-600 text-sm">Describe the context and background</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-xl">T</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Task</h3>
              <p className="text-gray-600 text-sm">Explain your responsibility and goal</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-xl">A</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Action</h3>
              <p className="text-gray-600 text-sm">Detail the steps you took</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-xl">R</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Result</h3>
              <p className="text-gray-600 text-sm">Share the outcome and impact</p>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Interview Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Do's</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Research the company thoroughly</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Prepare thoughtful questions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Dress professionally</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Arrive early</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Send thank you notes</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Don'ts</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Speak negatively about previous employers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Show up unprepared</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Use your phone during the interview</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ask about salary too early</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Forget to follow up</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Create a professional resume that gets you noticed and invited to interviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Create Professional Resume
              </button>
            </Link>
            <Link href="/tips">
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all duration-200">
                Resume Writing Tips
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InterviewTipsPage;
