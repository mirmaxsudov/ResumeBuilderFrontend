import { HelpCircle } from "lucide-react";
import { Button } from "@/components/dashboard/ui/button";

export default function CoachingPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Coaching</h1>
      </div>

      <div className="bg-gray-50 border rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="text-blue-500" size={24} />
        </div>
        <h2 className="text-lg font-medium mb-2">Get personalized coaching</h2>
        <p className="text-gray-500 mb-4">
          Work with a career coach to accelerate your job search
        </p>
        <Button className="bg-blue-500 hover:bg-blue-600">
          Book a Session
        </Button>
      </div>
    </>
  );
}
