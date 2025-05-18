"use client";

import OnboardingSteps from "@/components/dashboard/onboarding-steps";
import RecommendedJobs from "@/components/dashboard/recommended-jobs";
import RolePrompt from "@/components/dashboard/role-prompt";
import DocumentsSection from "@/components/dashboard/documents-section";
import { NextPage } from "next";
import { useAppSelector } from "@/hooks/hooks";

const Dashboard: NextPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hi, {user.firstName || "User"}!</h1>
          <p className="text-gray-500">
            Complete these steps to land your next role
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">0 of 4 Completed</div>
          <div className="text-sm text-blue-500">Show</div>
        </div>
      </div>
      <OnboardingSteps />
      <RecommendedJobs />
      <RolePrompt />
      <DocumentsSection />
    </>
  )
}

export default Dashboard;