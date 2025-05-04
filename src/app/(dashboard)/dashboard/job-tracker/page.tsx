import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/dashboard/ui/button";

export default function JobTrackerPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Job Tracker</h1>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center">
            <Filter size={16} className="mr-2" /> Filter
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Plus size={16} className="mr-1" /> Add Job
          </Button>
        </div>
      </div>

      <div className="bg-gray-50 border rounded-lg p-8 text-center">
        <h2 className="text-lg font-medium mb-2">
          Track your job applications
        </h2>
        <p className="text-gray-500 mb-4">
          Keep track of all your job applications in one place
        </p>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus size={16} className="mr-1" /> Add Your First Job
        </Button>
      </div>
    </>
  );
}
