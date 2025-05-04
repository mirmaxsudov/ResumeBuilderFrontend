"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

export default function OnboardingSteps() {
  const [expandedStep, setExpandedStep] = useState(0);

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? -1 : index);
  };

  return (
    <div className="space-y-4 mb-10">
      {/* Step 1 - Create Resume */}
      <div className="border rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md">
        <div
          className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 cursor-pointer"
          onClick={() => toggleStep(0)}
        >
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-blue-500" size={20} />
            <span className="font-medium">Create your first resume</span>
          </div>
          {expandedStep === 0 ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </div>

        {expandedStep === 0 && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 animate-fadeIn">
            <div className="flex items-start">
              <div className="flex-1">
                <p className="text-gray-600 mb-2">
                  Create or edit resumes with our easy-to-use builder, 20+
                  templates and advanced AI capabilities for customization and
                  job-specific tailoring.
                </p>
              </div>
              <div className="ml-4 flex items-center">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=80&width=120"
                    alt="Resume template"
                    width={120}
                    height={80}
                    className="rounded-lg border border-gray-200 shadow-sm"
                  />
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                    15%
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium">Resume</div>
                  <div className="text-sm text-gray-500">Score</div>
                </div>
                <ChevronRight className="ml-2" size={16} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Step 2 - Activate Auto Apply */}
      <div className="border rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md">
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => toggleStep(1)}
        >
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-gray-300" size={20} />
            <span className="font-medium">Activate Auto Apply</span>
          </div>
          {expandedStep === 1 ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </div>
      </div>

      {/* Step 3 - Explore Job Recommendations */}
      <div className="border rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md">
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => toggleStep(2)}
        >
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-gray-300" size={20} />
            <span className="font-medium">
              Explore your personalized job recommendations
            </span>
          </div>
          {expandedStep === 2 ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </div>
      </div>

      {/* Step 4 - Complete Assessment */}
      <div className="border rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md">
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => toggleStep(3)}
        >
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-gray-300" size={20} />
            <span className="font-medium">
              Complete your career growth assessment
            </span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-4 text-gray-500 text-sm">
              <Clock size={16} className="mr-1" />
              <span>15 min • 11 questions</span>
            </div>
            {expandedStep === 3 ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
