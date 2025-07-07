"use client"

import { Eye, Edit, MoreVertical, Briefcase, Calendar } from "lucide-react";
import { Button } from "../dashboard/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../dashboard/ui/dropdown-menu";
import useMyNotice from "@/hooks/useMyNotice";
import { useCareerProfile } from "@/store/zustand/useCareerProfile";
import { useEffect, useRef, useState } from "react";
import { ExperienceItemResponse } from "@/types/careerProfile/CareerProfileType";
import { updateExperience } from "@/api/requests/profile/profile.api";
import { NoticeEnum } from "@/enums/NoticeEnum";
import EmploymentEditModal from "./EmploymentEditModal";

const CareerExperience = () => {
    const { contextHolder, showMessage } = useMyNotice();
    // Zustand
    const data = useCareerProfile(state => state.data);
    const setZustandExperiences = useCareerProfile(state => state.setExperiences);

    // states
    // Title
    const [title, setTitle] = useState<string>("Experience");
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
    // Experience items
    const [experiences, setExperiences] = useState<ExperienceItemResponse[]>([]);
    // Edit modal states
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const [editedEmploymentItems, setEditedEmploymentItems] = useState<ExperienceItemResponse[]>([]);
    // Refs
    const titleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (saveLoading) {
            handleSaveEmployment()
            setSaveLoading(false);
        }
    }, [saveLoading]);

    useEffect(() => {
        if (data.experience) {
            setTitle(data.experience.title);
            setExperiences(data.experience.items);

            const transformedItems = data.experience.items.map(item => ({
                id: item.id,
                jobTitle: item.jobTitle,
                companyName: "",
                startDate: item.startDate,
                endDate: item.endDate,
                priority: item.priority,
                description: item.description,
                currentJob: item.currentJob,
            }));
            setEditedEmploymentItems(transformedItems);
        }
    }, [data]);

    useEffect(() => {
        if (isEditingTitle && titleRef.current)
            titleRef.current.focus();
    }, [isEditingTitle]);

    const handleTitleSave = () => {
        if (!title) {
            showMessage("You should enter title", NoticeEnum.ERROR);
            return;
        }

        setIsEditingTitle(false);
        handleSaveJustTitle();
    }

    const handleTitleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") handleTitleSave();
        if (e.key === "Escape") setIsEditingTitle(false);
    }

    // Saves or updates
    const handleSaveJustTitle = async () => {
        if (!title) {
            showMessage("You should enter title", NoticeEnum.SUCCESS);
            return;
        }
        try {
            const response = await updateExperience(data.id, {
                title,
                items: experiences
            });
            setZustandExperiences(response.data);
            showMessage("Successfully updated", NoticeEnum.SUCCESS);
        } catch (e) {
            showMessage("Something went wrong!")
        } finally {
            setSaveLoading(false);
        }
    }

    const handleEditEmployment = () => {
        setIsEditModalOpen(true);
        setIsDropdownOpen(false);
    };

    const handleSaveEmployment = async () => {
        try {
            setSaveLoading(true);

            const apiItems = editedEmploymentItems.map(item => ({
                id: item.id === null ? null : item.id, // preserve null for new, number for existing
                jobTitle: item.jobTitle,
                startDate: item.startDate,
                endDate: item.currentJob ? "" : item.endDate,
                priority: item.priority,
                description: item.description,
                currentJob: item.currentJob,
            }));

            const response = await updateExperience(data.id, {
                title,
                items: apiItems
            });

            setZustandExperiences(response.data);
            setExperiences(response.data.items);
            showMessage("Employment history updated successfully", NoticeEnum.SUCCESS);
        } catch (e) {
            console.log(e);
            showMessage("Failed to update employment history", NoticeEnum.ERROR);
        } finally {
            setSaveLoading(false);
        }
    };

    return <>
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
                {isEditingTitle ? (
                    <input
                        ref={titleRef}
                        className="border rounded-lg py-1 px-3 text-sm font-normal text-gray-900"
                        value={title}
                        onChange={(e) =>
                            setTitle(d => e.target.value)
                        }
                        onBlur={handleTitleSave}
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
                )}
                <DropdownMenu open={isDropdownOpen} onOpenChange={() => {
                    setIsDropdownOpen(!isDropdownOpen)
                }}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4 text-black" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#fff]" align="end">
                        <DropdownMenuItem className="cursor-pointer" onClick={(e) => {
                            e.stopPropagation();
                            setIsDropdownOpen(false);
                            handleEditEmployment();
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
                {experiences.map((exp, index) => (
                    <div
                        key={exp.id}
                        className={`border-l-2 ${exp.currentJob ? "border-blue-500" : "border-gray-300"
                            } pl-4 ml-2`}
                    >
                        <div className="flex items-center mb-1">
                            <Briefcase
                                size={16}
                                className={`${exp.currentJob ? "text-blue-600" : "text-gray-500"
                                    } mr-2`}
                            />
                            <h3 className="font-medium text-gray-900">
                                {exp.jobTitle}
                            </h3>
                            {exp.currentJob && (
                                <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">Current</span>
                            )}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                            <Calendar size={14} className="mr-1" />
                            <span>{exp.startDate} - {exp.currentJob ? "Present" : exp.endDate}</span>
                        </div>
                        <p className="text-gray-700">{exp.description}</p>
                    </div>
                ))}
            </div>
        </div>

        <EmploymentEditModal
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            saveLoading={saveLoading}
            editedItems={editedEmploymentItems}
            setEditedItems={setEditedEmploymentItems}
            setSaveLoading={setSaveLoading}
            handleUpdate={handleSaveEmployment}
        />

        {contextHolder}
    </>
}

export default CareerExperience;