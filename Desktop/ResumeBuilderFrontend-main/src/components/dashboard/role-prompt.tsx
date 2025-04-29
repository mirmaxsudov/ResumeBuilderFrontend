import {Button} from "@/components/dashboard/ui/button";

export default function RolePrompt() {
    return (
        <div
            className="mb-10 bg-white border rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-24 h-24 mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                >
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Which role are you going for?</h3>
            <p className="text-gray-600 mb-6 max-w-md">
                If you tell us where you're headed, we can show you how to get there.
            </p>
            <Button
                className="bg-blue-600 hover:bg-blue-700 rounded-full px-6 py-2 shadow-sm btn-hover">Continue</Button>
        </div>
    )
}
