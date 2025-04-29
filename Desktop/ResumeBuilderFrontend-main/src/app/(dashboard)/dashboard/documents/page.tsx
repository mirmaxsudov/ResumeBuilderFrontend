import DocumentsSection from "@/components/dashboard/documents-section";

export default function DocumentsPage() {
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Documents</h1>
            </div>
            <DocumentsSection/>
        </>
    )
}
