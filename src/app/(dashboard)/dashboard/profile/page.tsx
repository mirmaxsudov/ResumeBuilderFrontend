"use client";

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
  Save,
} from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import ResumeLanguageLevel from "@/enums/LanguageEnum";
import { useAppSelector } from "@/hooks/hooks";
import GenerateProfileIcon from "@/helpers/GenerateProfileIcon";
import ProfileImageEditor from "@/components/profile/ProfileImageEditorProps ";
import ProfileContent from "@/components/profile/ProfileContent";

function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="animate-fadeIn">

      <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"  ></div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end">
            <div className="absolute -top-16 left-6 w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-md bg-white">
              {
                GenerateProfileIcon({ firstName: user.firstName, lastName: user.lastname })
              }
            </div>
            <div className="mt-20 md:mt-0 md:ml-36 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.firstName || "User"} {user.lastname || "user"}
                  </h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <Button
                    variant="outline"
                    className="rounded-full hover:bg-blue-50 btn-hover"
                  >
                    <Download size={16} className="mr-2" /> Download Resume
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm btn-hover text-white">
                    <Edit size={16} className="mr-2" /> Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProfileContent />
    </div>
  );
}

export default ProfilePage;