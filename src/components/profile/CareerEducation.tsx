"use client";

import { Eye, Edit, MoreVertical, GraduationCap, Calendar } from "lucide-react";
import { Button } from "../dashboard/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../dashboard/ui/dropdown-menu";
import useMyNotice from "@/hooks/useMyNotice";
import { useCareerProfile } from "@/store/zustand/useCareerProfile";
import { useEffect, useRef, useState } from "react";
import { EducationItemResponseType, EducationRequestItem } from "@/types/careerProfile/CareerProfileType";
import { Input } from "@/components/dashboard/ui/input";
import { NoticeEnum } from "@/enums/NoticeEnum";
import { updateEducation } from "@/api/requests/profile/profile.api";
import EducationEditModal from "./EducationEditModal";
import formatDate, { formatDateWithoutHour } from "@/helpers/formatDate";

const CareerEducation = () => {
    const { showMessage } = useMyNotice();
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
    const [editedEducationItems, setEditedEducationItems] = useState<EducationRequestItem[]>([]);

    const titleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (saveLoading) {
            handleSaveEducation();
        }
    }, [saveLoading]);

    useEffect(() => {
        if (!data.education) return;

        const education = data.education;

        setTitle(education.title);
        setEducationItems(education.items);

        const transformedItems: EducationRequestItem[] = education.items.map(item => ({
            id: item.id,
            title: item.title,
            degree: item.degree,
            startDate: item.startDate,
            endDate: item.endDate,
            city: item.city,
            description: item.description,
            priority: item.priority,
            currentStudy: !!item.currentStudy,
        }));
        setEditedEducationItems(transformedItems);
    }, [data]);

    useEffect(() => {
        if (isEditingTitle && titleRef.current)
            titleRef.current.focus();
    }, [isEditingTitle]);

    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleTitleSave();
        }
        if (e.key === "Escape") {
            setIsEditingTitle(false);
        }
    }

    const handleTitleSave = async () => {
        if (!title || !title.trim()) {
            showMessage("You should enter title", NoticeEnum.ERROR);
            return;
        }

        setIsEditingTitle(false);
        await handleSaveJustTitle();
    };

    const handleSaveJustTitle = async () => {
        try {
            const apiItems: EducationRequestItem[] = educationItems.map(item => ({
                id: item.id,
                title: item.title,
                degree: item.degree,
                startDate: item.startDate,
                endDate: item.currentStudy ? "" : item.endDate,
                city: item.city,
                description: item.description,
                priority: item.priority,
                currentStudy: item.currentStudy,
            }));

            const response = await updateEducation(data.id, {
                title: title.trim(),
                items: apiItems,
            });
            setZustandEducation(response.data);
            showMessage("Successfully updated", NoticeEnum.SUCCESS);
        } catch (e) {
            showMessage("Something went wrong", NoticeEnum.ERROR);
        } finally {
            setSaveLoading(false);
        }
    };

    const handleEditEducation = () => {
        setIsEditModalOpen(true);
        setIsDropdownOpen(false);
    };

    const handleSaveEducation = async () => {
        try {
            const apiItems: EducationRequestItem[] = editedEducationItems.map(item => ({
                id: item.id === null ? null : item.id,
                title: item.title,
                degree: item.degree,
                startDate: item.startDate,
                endDate: item.currentStudy ? "" : item.endDate,
                city: item.city,
                description: item.description,
                priority: item.priority,
                currentStudy: item.currentStudy,
            }));

            const response = await updateEducation(data.id, {
                title,
                items: apiItems,
            });

            setZustandEducation(response.data);
            setEducationItems(response.data.items);
            showMessage("Education updated successfully", NoticeEnum.SUCCESS);
        } catch (e) {
            console.log(e);
            showMessage("Failed to update education", NoticeEnum.ERROR);
        } finally {
            setSaveLoading(false);
        }
    };

    return <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
            {
                isEditingTitle ? (
                    <Input ref={titleRef}
                        className={"border rounded-lg py-1 px-3 text-sm font-normal text-gray-900"}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onBlur={() => {
                            handleTitleSave();
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
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4 text-black" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#fff]" align="end">
                    <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        handleEditEducation();
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
            {educationItems.map((edu) => (
                <div
                    key={edu.id}
                    className={`border-l-2 ${edu.currentStudy ? "border-blue-500" : "border-gray-300"} pl-4 ml-2`}
                >
                    <div className="flex items-center mb-1">
                        <GraduationCap size={16} className={`${edu.currentStudy ? "text-blue-600" : "text-gray-500"} mr-2`} />
                        <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                        {edu.currentStudy && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">Current</span>
                        )}
                    </div>
                    <p className="text-gray-700 mb-1">{edu.title}{edu.city ? `, ${edu.city}` : ""}</p>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                        <Calendar size={14} className="mr-1" />
                        <span>{formatDateWithoutHour(new Date(edu.startDate))} - {!edu.currentStudy ? "Present" : formatDateWithoutHour(new Date(edu.endDate))}</span>
                    </div>
                    <p className="text-gray-700">{edu.description}</p>
                </div>
            ))}
        </div>
        <EducationEditModal
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            saveLoading={saveLoading}
            editedItems={editedEducationItems}
            setEditedItems={setEditedEducationItems}
            setSaveLoading={setSaveLoading}
        />
    </div>
}

export default CareerEducation;
