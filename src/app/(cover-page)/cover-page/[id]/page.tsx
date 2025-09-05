"use client";

import { Button } from "@/components/dashboard/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const CoverLetterDetailPageForAll = () => {
    const router = useRouter();
    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6">
            <div className="flex items-center gap-3 mb-6">
                <Button
                    variant="outline"
                    className="h-8 px-3 gap-1 rounded-full btn-hover"
                    onClick={() => {
                        if (typeof window !== 'undefined' && window.history.length > 1) router.back();
                        else router.push('/cover-page');
                    }}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Back</span>
                </Button>
                <h1 className="text-2xl font-semibold text-gray-900">Cover Letter</h1>
            </div>
            {/* TODO: Render the cover letter details here */}
        </div>
    );
}

export default CoverLetterDetailPageForAll;
