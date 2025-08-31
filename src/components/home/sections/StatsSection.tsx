"use client";

import React from "react";
import { Users, FileText, Award, TrendingUp } from "lucide-react";

interface StatsSectionProps {
  countOfUsers: number;
  countOfResumes: number;
}

const StatsSection: React.FC<StatsSectionProps> = ({ countOfUsers, countOfResumes }) => {
  const stats = [
    {
      icon: Users,
      value: countOfUsers.toLocaleString(),
      label: "Active Users",
      description: "Trusted by professionals worldwide"
    },
    {
      icon: FileText,
      value: countOfResumes.toLocaleString(),
      label: "Resumes Created",
      description: "Professional resumes built today"
    },
    {
      icon: Award,
      value: "98%",
      label: "Success Rate",
      description: "Of users get interviews"
    },
    {
      icon: TrendingUp,
      value: "4.9/5",
      label: "User Rating",
      description: "Average customer satisfaction"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-500">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
