import {DollarSign, BarChart} from "lucide-react"
import {Button} from "@/components/dashboard/ui/button";

export default function SalaryAnalyzerPage() {
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Salary Analyzer</h1>
            </div>

            <div className="bg-gray-50 border rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="text-blue-500" size={24}/>
                </div>
                <h2 className="text-lg font-medium mb-2">Analyze your salary potential</h2>
                <p className="text-gray-500 mb-4">Compare your salary with industry standards and get insights</p>
                <Button className="bg-blue-500 hover:bg-blue-600">Start Analysis</Button>
            </div>

            <div className="mt-8 border rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Salary Trends</h2>
                    <Button variant="outline" size="sm">
                        <BarChart size={16} className="mr-2"/> View Details
                    </Button>
                </div>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Salary data visualization will appear here</p>
                </div>
            </div>
        </>
    )
}