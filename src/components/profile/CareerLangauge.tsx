import { Eye, Edit, MoreVertical } from "lucide-react";
import { Button } from "../dashboard/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../dashboard/ui/dropdown-menu";

const CareerLangauge = () => {
    return <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Languages</h2>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4 text-black" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#fff]" align="end">
                    <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        console.log("Select clicked");
                    }}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Select</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        {(
            <div className="space-y-3">
                {/* {content.languages.map((lang, index) => (
                    <div key={index}>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-900">{lang.name}</span>
                            <span className="text-gray-500 text-sm">
                                {lang.level}
                            </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                            <div
                                className="h-2 bg-blue-600 rounded-full"
                                style={{ width: `${lang.proficiency}%` }}
                            ></div>
                        </div>
                    </div>
                ))} */}
            </div>
        )}
    </div>
}

export default CareerLangauge;