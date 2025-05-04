import { Search } from "lucide-react";
import { Button } from "@/components/dashboard/ui/button";

export default function JobSearchMethodPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Job Search Method</h1>
      </div>

      <div className="bg-gray-50 border rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="text-blue-500" size={24} />
        </div>
        <h2 className="text-lg font-medium mb-2">Optimize your job search</h2>
        <p className="text-gray-500 mb-4">
          Learn effective methods to find and apply for jobs
        </p>
        <Button className="bg-blue-500 hover:bg-blue-600">
          Explore Methods
        </Button>
      </div>
    </>
  );
}
