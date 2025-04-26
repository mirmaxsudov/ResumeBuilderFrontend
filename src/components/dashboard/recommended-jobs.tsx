import { ChevronRight, MapPin, Bookmark } from "lucide-react"

interface RecommendedJobsProps {
  hideTitle?: boolean
}

export default function RecommendedJobs({ hideTitle = false }: RecommendedJobsProps) {
  return (
    <div className="mb-10">
      {!hideTitle && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recommended Jobs</h2>
          <a href="#" className="text-blue-600 flex items-center hover:underline">
            See all <ChevronRight size={16} />
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Job Card 1 */}
        <div className="border rounded-xl p-4 bg-white shadow-sm card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-medium">G</span>
            </div>
            <button className="text-gray-400 hover:text-blue-500 transition-colors">
              <Bookmark size={18} />
            </button>
          </div>
          <h3 className="font-medium mb-1 text-gray-900">Software Engineer</h3>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <MapPin size={14} className="mr-1" />
            <span>Remote/San Francisco</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs text-blue-600 font-medium">
              P
            </div>
            <span className="text-xs text-gray-500">Posted 6h ago</span>
          </div>
        </div>

        {/* Job Card 2 */}
        <div className="border rounded-xl p-4 bg-white shadow-sm card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-medium">A</span>
            </div>
            <button className="text-gray-400 hover:text-blue-500 transition-colors">
              <Bookmark size={18} />
            </button>
          </div>
          <h3 className="font-medium mb-1 text-gray-900">Frontend Developer</h3>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <MapPin size={14} className="mr-1" />
            <span>New York, NY</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs text-blue-600 font-medium">
              G
            </div>
            <span className="text-xs text-gray-500">Posted 1d ago</span>
          </div>
        </div>

        {/* Job Card 3 */}
        <div className="border rounded-xl p-4 bg-white shadow-sm card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-medium">M</span>
            </div>
            <button className="text-gray-400 hover:text-blue-500 transition-colors">
              <Bookmark size={18} />
            </button>
          </div>
          <h3 className="font-medium mb-1 text-gray-900">UX/UI Designer</h3>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <MapPin size={14} className="mr-1" />
            <span>Remote</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs text-blue-600 font-medium">
              A
            </div>
            <span className="text-xs text-gray-500">Posted 2d ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
