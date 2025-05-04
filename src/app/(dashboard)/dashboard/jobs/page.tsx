import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/dashboard/ui/button";
import RecommendedJobs from "@/components/dashboard/recommended-jobs";

export default function JobsPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Jobs</h1>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center">
            <Filter size={16} className="mr-2" /> Filter
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Plus size={16} className="mr-1" /> Save Job
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recommended Jobs
        </h2>
        <RecommendedJobs hideTitle={true} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Saved Jobs</h2>
        <div className="bg-gray-50 border rounded-lg p-8 text-center">
          <p className="text-gray-500">You haven't saved any jobs yet</p>
          <p className="text-gray-500">Save jobs to apply to them later</p>
        </div>
      </div>
    </>
  );
}
