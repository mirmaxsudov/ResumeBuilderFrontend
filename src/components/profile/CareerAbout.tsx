import { Eye, Edit, MoreVertical } from "lucide-react";
import { Button } from "../dashboard/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../dashboard/ui/dropdown-menu";

const CareerAbout = () => {
    return <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">About</h2>
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
        <p className="text-gray-700">{"content.about"}</p>
    </div>
}

export default CareerAbout;