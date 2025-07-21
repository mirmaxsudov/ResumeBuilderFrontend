"use client";

import {Eye, Edit, MoreVertical} from "lucide-react";
import {Button} from "../dashboard/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../dashboard/ui/dropdown-menu";
import useMyNotice from "@/hooks/useMyNotice";
import {useCareerProfile} from "@/store/zustand/useCareerProfile";
import {useEffect, useRef, useState} from "react";
import {EducationItemResponseType} from "@/types/careerProfile/CareerProfileType";
import {Input} from "@/components/dashboard/ui/input";

const CareerEducation = () => {
    const {showMessage} = useMyNotice();
    // Zustand
    const data = useCareerProfile(state => state.data);
    const setZustandEducation = useCareerProfile(state => state.setEducation);

    // Title
    const [title, setTitle] = useState<string>("Education");
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);

    // Education items
    const [educationItems, setEducationItems] = useState<EducationItemResponseType[]>([]);
    // Edit
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const [editedEducationItems, setEditedEducationItems] = useState<EducationItemResponseType[]>([]);

    const titleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!data.education) return;

        const education = data.education;

        setTitle(education.title);
        setEducationItems(education.items);

        const transformedItems = education.items.map(item => {
            return {
                id: item.id,
                title: item.title,
                degree: item.degree,
                startDate: item.startDate,
                endDate: item.endDate,
                city: item.city,
                description: item.description,
                priority: item.priority,
                currentStudy: item.currentStudy
            }
        });
        setEditedEducationItems(transformedItems);
    }, [data]);

    useEffect(() => {
        if (isEditingTitle && titleRef.current)
            titleRef.current.focus();
    }, [isEditingTitle]);

    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            // ToDo: Save title
        }
        if (e.key === "Escape") {
            setIsEditingTitle(false);
        }
    }

    return <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
            {
                isEditingTitle ? (
                    <Input ref={titleRef}
                           className={"border rounded-lg py-1 px-3 text-sm font-normal text-gray-900"}
                           value={title}
                           onChange={e => setTitle(e.target.value)}
                           onBlur={() => {
                               setIsEditingTitle(false)
                           }}
                           onKeyDown={handleTitleKeyDown}
                    />
                ) : (
                    <h2
                        className="text-lg font-semibold mb-4 text-gray-900 cursor-pointer"
                        onClick={() => setIsEditingTitle(true)}
                        title={title}
                    >
                        {title}
                    </h2>
                )
            }
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4 text-black"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#fff]" align="end">
                    <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        <Edit className="mr-2 h-4 w-4"/>
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        console.log("Select clicked");
                    }}>
                        <Eye className="mr-2 h-4 w-4"/>
                        <span>Select</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className="space-y-6">
            {/* {content.education.map((edu, index) => (
                <div
                    key={edu.id}
                    className={`border-l-2 ${index === 0 ? "border-blue-500" : "border-gray-300"
                        } pl-4 ml-2`}
                >
                    <>
                        <div className="flex items-center mb-1">
                            <GraduationCap
                                size={16}
                                className={`${index === 0 ? "text-blue-600" : "text-gray-500"
                                    } mr-2`}
                            />
                            <h3 className="font-medium text-gray-900">
                                {edu.degree}
                            </h3>
                        </div>
                        <p className="text-gray-700 mb-1">{edu.institution}</p>
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                            <Calendar size={14} className="mr-1" />
                            <span>{edu.period}</span>
                        </div>
                        <p className="text-gray-700">{edu.description}</p>
                    </>
                </div>
            ))} */}
        </div>
    </div>
}

export default CareerEducation;