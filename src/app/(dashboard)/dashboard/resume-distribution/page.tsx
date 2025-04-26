import {Share2} from "lucide-react"
import {Button} from "@/components/dashboard/ui/button";

export default function ResumeDistributionPage() {
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Resume Distribution</h1>
            </div>

            <div className="bg-gray-50 border rounded-lg p-8">
                <div className="flex items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                        <Share2 className="text-blue-500" size={24}/>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-medium mb-2">Ready to give your job search a boost and get more
                            exposure?</h2>
                        <p className="text-gray-500 mb-4">
                            Choose your resume and we'll send it to hundreds of recruiters in your field in just a few
                            clicks
                        </p>
                        <Button className="bg-blue-500 hover:bg-blue-600">Start Distribution</Button>
                    </div>
                </div>
            </div>

            <div className="mt-8 border rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Distribution History</h2>
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <p className="text-gray-500">You haven't distributed any resumes yet</p>
                </div>
            </div>
        </>
    )
}
