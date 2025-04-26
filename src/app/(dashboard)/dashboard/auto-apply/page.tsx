import {Rocket} from "lucide-react"
import {Button} from "@/components/dashboard/ui/button";

export default function AutoApplyPage() {
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Auto Apply</h1>
            </div>

            <div className="bg-gray-50 border rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Rocket className="text-blue-500" size={24}/>
                </div>
                <h2 className="text-lg font-medium mb-2">Activate Auto Apply</h2>
                <p className="text-gray-500 mb-4">Apply to jobs with a single click and get more interviews</p>
                <Button className="bg-blue-500 hover:bg-blue-600">Activate Auto Apply</Button>
            </div>
        </>
    )
}