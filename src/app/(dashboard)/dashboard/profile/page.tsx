import {
  Edit,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  Mail,
  Phone,
  Globe,
  Download,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/dashboard/ui/button";

export default function ProfilePage() {
  return (
    <div className="animate-fadeIn">
      <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end">
            <div className="absolute -top-16 left-6 w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-md bg-white">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Profile"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <div className="mt-20 md:mt-0 md:ml-36 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Akbarxoja Joraxojayev
                  </h1>
                  <p className="text-gray-600">Software Engineer</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <Button
                    variant="outline"
                    className="rounded-full hover:bg-blue-50 btn-hover"
                  >
                    <Download size={16} className="mr-2" /> Download Resume
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm btn-hover">
                    <Edit size={16} className="mr-2" /> Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Contact Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">akbarjoraxojayev@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">+998 (93) 0757018</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900">San Francisco, CA</p>
                </div>
              </div>
              <div className="flex items-start">
                <Globe className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a href="#" className="text-blue-600 hover:underline">
                    akbarjoraxojayev@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-blue-600 hover:bg-blue-50"
              >
                <Edit size={14} className="mr-1" /> Edit
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                JavaScript
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                React
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                Node.js
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                TypeScript
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                HTML/CSS
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                Git
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                REST APIs
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                SQL
              </span>
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Languages</h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-blue-600 hover:bg-blue-50"
              >
                <Edit size={14} className="mr-1" /> Edit
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-900">English</span>
                  <span className="text-gray-500 text-sm">Native</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-600 rounded-full w-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-900">Spanish</span>
                  <span className="text-gray-500 text-sm">Intermediate</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-600 rounded-full w-3/5"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-900">French</span>
                  <span className="text-gray-500 text-sm">Basic</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-600 rounded-full w-2/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">About</h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-blue-600 hover:bg-blue-50"
              >
                <Edit size={14} className="mr-1" /> Edit
              </Button>
            </div>
            <p className="text-gray-700">
              Experienced Software Engineer with a passion for building scalable
              web applications. Skilled in JavaScript, React, and Node.js.
              Strong problem-solving abilities and a team player with excellent
              communication skills. Looking for opportunities to contribute to
              innovative projects and continue growing as a developer.
            </p>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Experience
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-blue-600 hover:bg-blue-50"
              >
                <Edit size={14} className="mr-1" /> Edit
              </Button>
            </div>
            <div className="space-y-6">
              <div className="border-l-2 border-blue-500 pl-4 ml-2">
                <div className="flex items-center mb-1">
                  <Briefcase size={16} className="text-blue-600 mr-2" />
                  <h3 className="font-medium text-gray-900">
                    Senior Software Engineer
                  </h3>
                </div>
                <p className="text-gray-700 mb-1">TechCorp Inc.</p>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Calendar size={14} className="mr-1" />
                  <span>Jan 2021 - Present</span>
                </div>
                <p className="text-gray-700">
                  Led the development of a React-based dashboard application.
                  Implemented new features and optimized performance. Mentored
                  junior developers and conducted code reviews.
                </p>
              </div>
              <div className="border-l-2 border-gray-300 pl-4 ml-2">
                <div className="flex items-center mb-1">
                  <Briefcase size={16} className="text-gray-500 mr-2" />
                  <h3 className="font-medium text-gray-900">
                    Software Engineer
                  </h3>
                </div>
                <p className="text-gray-700 mb-1">WebSolutions LLC</p>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Calendar size={14} className="mr-1" />
                  <span>Mar 2018 - Dec 2020</span>
                </div>
                <p className="text-gray-700">
                  Developed and maintained web applications using React and
                  Node.js. Collaborated with designers and product managers to
                  implement new features. Improved application performance by
                  30%.
                </p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Education</h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-blue-600 hover:bg-blue-50"
              >
                <Edit size={14} className="mr-1" /> Edit
              </Button>
            </div>
            <div className="space-y-6">
              <div className="border-l-2 border-blue-500 pl-4 ml-2">
                <div className="flex items-center mb-1">
                  <GraduationCap size={16} className="text-blue-600 mr-2" />
                  <h3 className="font-medium text-gray-900">
                    Master of Science in Computer Science
                  </h3>
                </div>
                <p className="text-gray-700 mb-1">Stanford University</p>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Calendar size={14} className="mr-1" />
                  <span>2016 - 2018</span>
                </div>
                <p className="text-gray-700">
                  Specialized in Software Engineering and Artificial
                  Intelligence. Graduated with honors.
                </p>
              </div>
              <div className="border-l-2 border-gray-300 pl-4 ml-2">
                <div className="flex items-center mb-1">
                  <GraduationCap size={16} className="text-gray-500 mr-2" />
                  <h3 className="font-medium text-gray-900">
                    Bachelor of Science in Computer Science
                  </h3>
                </div>
                <p className="text-gray-700 mb-1">
                  University of California, Berkeley
                </p>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Calendar size={14} className="mr-1" />
                  <span>2012 - 2016</span>
                </div>
                <p className="text-gray-700">
                  Dean's List, GPA 3.8/4.0. Active member of the Computer
                  Science Club.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Certifications
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-blue-600 hover:bg-blue-50"
              >
                <Edit size={14} className="mr-1" /> Edit
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <Award className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    AWS Certified Solutions Architect
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Amazon Web Services • 2022
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    Google Cloud Professional Developer
                  </h3>
                  <p className="text-gray-500 text-sm">Google Cloud • 2021</p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    React Advanced Certification
                  </h3>
                  <p className="text-gray-500 text-sm">Meta • 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
