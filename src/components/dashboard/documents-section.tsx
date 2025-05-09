"use client";

import { useState } from "react";
import {
  Edit,
  FileText,
  Download,
  FileUp,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/dashboard/ui/tabs";
import { Button } from "@/components/dashboard/ui/button";

export default function DocumentsSection() {
  const [activeTab, setActiveTab] = useState("resumes");

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="resumes" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0">
              <TabsTrigger
                value="resumes"
                className={`px-4 py-2 rounded-t-lg ${
                  activeTab === "resumes"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("resumes")}
              >
                Resumes
              </TabsTrigger>
              <TabsTrigger
                value="cover-letters"
                className={`px-4 py-2 rounded-t-lg ${
                  activeTab === "cover-letters"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("cover-letters")}
              >
                Cover Letters
              </TabsTrigger>
              <TabsTrigger
                value="job-tracker"
                className={`px-4 py-2 rounded-t-lg ${
                  activeTab === "job-tracker"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("job-tracker")}
              >
                Job Tracker
              </TabsTrigger>
              <TabsTrigger
                value="job-search-help"
                className={`px-4 py-2 rounded-t-lg ${
                  activeTab === "job-search-help"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("job-search-help")}
              >
                Job Search Help
                <span className="ml-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  NEW
                </span>
              </TabsTrigger>
            </TabsList>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm btn-hover">
              <Plus size={16} className="mr-1" /> Create New
            </Button>
          </div>

          <TabsContent value="resumes" className="mt-0">
            {/* Distribution Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border rounded-xl p-4 mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600">
                  <FileUp />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    Ready to give your job search a boost and get more exposure?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Choose your resume and we'll send it to hundreds of
                    recruiters in your field in just a few clicks
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="whitespace-nowrap rounded-full hover:bg-white/50 btn-hover"
                >
                  Start Now
                </Button>
              </div>
            </div>

            {/* Resumes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Resume 1 */}
              <div className="border rounded-xl overflow-hidden bg-white shadow-sm card-hover">
                <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
                  <Image
                    src="/placeholder.svg?height=180&width=150"
                    alt="Resume preview"
                    width={150}
                    height={180}
                    className="h-full object-contain shadow-sm rounded-lg"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900">Untitled</h3>
                      <Edit
                        size={14}
                        className="ml-2 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      Updated 25 April 2023
                    </span>
                  </div>
                  <div className="mb-3">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                      84% Your resume score
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-blue-600 text-sm hover:underline cursor-pointer">
                      <FileText size={16} className="mr-2" />
                      <span>Tailor to job listing</span>
                      <span className="ml-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        NEW
                      </span>
                    </div>
                    <div className="flex items-center text-blue-600 text-sm hover:underline cursor-pointer">
                      <Download size={16} className="mr-2" />
                      <span>Download PDF</span>
                    </div>
                    <div className="flex items-center text-blue-600 text-sm hover:underline cursor-pointer">
                      <FileText size={16} className="mr-2" />
                      <span>Export to DOCX</span>
                    </div>
                    <div className="flex items-center text-blue-600 text-sm hover:underline cursor-pointer">
                      <FileText size={16} className="mr-2" />
                      <span>Export to TXT</span>
                    </div>
                    <div className="flex items-center text-blue-600 text-sm hover:underline cursor-pointer">
                      <MoreHorizontal size={16} className="mr-2" />
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Create New Resume */}
              <div className="border rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 h-full bg-white shadow-sm card-hover">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                  <Plus size={24} />
                </div>
                <h3 className="font-medium mb-2 text-gray-900">New Resume</h3>
                <p className="text-sm text-gray-600 text-center mb-4">
                  Create a tailored resume for each job application. Double your
                  chances of getting hired!
                </p>
                <Button
                  variant="outline"
                  className="rounded-full hover:bg-blue-50 btn-hover"
                >
                  Create Resume
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cover-letters">
            <div className="flex items-center justify-center h-40 border rounded-xl bg-white shadow-sm">
              <p className="text-gray-500">
                Your cover letters will appear here
              </p>
            </div>
          </TabsContent>

          <TabsContent value="job-tracker">
            <div className="flex items-center justify-center h-40 border rounded-xl bg-white shadow-sm">
              <p className="text-gray-500">
                Your tracked jobs will appear here
              </p>
            </div>
          </TabsContent>

          <TabsContent value="job-search-help">
            <div className="flex items-center justify-center h-40 border rounded-xl bg-white shadow-sm">
              <p className="text-gray-500">
                Job search help resources will appear here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
