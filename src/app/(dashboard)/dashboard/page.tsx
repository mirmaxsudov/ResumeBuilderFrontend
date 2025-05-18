import OnboardingSteps from "@/components/dashboard/onboarding-steps";
import RecommendedJobs from "@/components/dashboard/recommended-jobs";
import RolePrompt from "@/components/dashboard/role-prompt";
import DocumentsSection from "@/components/dashboard/documents-section";
import { NextPage } from "next";
import Role from "@/enums/Role";
import ServerAuthChecker from '@/components/auth/ServerAuthChecker'

const Dashboard: NextPage = () => {
  return (
    <ServerAuthChecker roles={[...Object.values(Role)]} withAuth={true}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hi, Akbarxoja!</h1>
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
    </ServerAuthChecker>
  )
}

export default Dashboard;