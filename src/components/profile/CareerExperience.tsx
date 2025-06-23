import { Eye, Edit, MoreVertical } from "lucide-react";
import { Button } from "../dashboard/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../dashboard/ui/dropdown-menu";

const CareerExperience = () => {
    return <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
                Experience
            </h2>
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
        <div className="space-y-6">
            {/* {content.experience.map((exp, index) => (
                <div
                    key={exp.id}
                    className={`border-l-2 ${index === 0 ? "border-blue-500" : "border-gray-300"
                        } pl-4 ml-2`}
                >
                    {(
                        <>
                            <div className="flex items-center mb-1">
                                <Briefcase
                                    size={16}
                                    className={`${index === 0 ? "text-blue-600" : "text-gray-500"
                                        } mr-2`}
                                />
                                <h3 className="font-medium text-gray-900">
                                    {exp.title}
                                </h3>
                            </div>
                            <p className="text-gray-700 mb-1">{exp.company}</p>
                            <div className="flex items-center text-gray-500 text-sm mb-2">
                                <Calendar size={14} className="mr-1" />
                                <span>{exp.period}</span>
                            </div>
                            <p className="text-gray-700">{exp.description}</p>
                        </>
                    )}
                </div>
            ))} */}
        </div>
    </div>
}

export default CareerExperience;