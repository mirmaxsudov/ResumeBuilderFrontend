"use client";

import { Eye, Edit, MoreVertical } from "lucide-react";
import { Button } from "../dashboard/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../dashboard/ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";
import useMyNotice from "@/hooks/useMyNotice";
import { NoticeEnum } from "@/enums/NoticeEnum";
import { useCareerProfile } from "@/store/zustand/useCareerProfile";
import { LangaugeResponseItem } from "@/types/careerProfile/CareerProfileType";
import { lanLevelToNum } from "@/helpers/LanLevelToNum";
import CareerLanguageEditModal from "./CareerLanguageEditModal";
import { updateLanguages } from "@/api/requests/profile/profile.api";

export default function CareerLanguage() {
    const data = useCareerProfile((s) => s.data)!;
    const setLanguageStore = useCareerProfile((s) => s.setLangauges);
    const { contextHolder, showMessage } = useMyNotice();

    const [title, setTitle] = useState<string>(data.language?.title || "");
    const [items, setItems] = useState<LangaugeResponseItem[]>([]);
    const [editedItems, setEditedItems] = useState<LangaugeResponseItem[]>([]);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const titleRef = useRef<HTMLInputElement>(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);

    useEffect(() => {
        if (isEditingTitle && titleRef.current) titleRef.current.focus();
    }, [isEditingTitle]);

    useEffect(() => {
        if (data && data.language) {
            setTitle(data.language.title);
            setItems(data.language.items);
        }
    }, [data])

    useEffect(() => {
        if (saveLoading)
            save();
    }, [saveLoading])

    const save = async () => {
        try {
            const response = await updateLanguages(data.id, {
                title,
                items: editedItems.filter(item => item.name || item.level)
            })
            setLanguageStore(response.data);
            showMessage("Successfully updated", NoticeEnum.SUCCESS);
        } catch (e) {
            showMessage("Something went wrong", NoticeEnum.ERROR);
        } finally {
            setSaveLoading(false);
        }
    };

    const handleTitleSave = async () => {
        if (!title.trim()) {
            showMessage("Title cannot be empty", NoticeEnum.ERROR);
            setTitle(data.language!.title);
        } else {
            setIsEditingTitle(false);
            await save();
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
                {isEditingTitle ? (
                    <input
                        ref={titleRef}
                        className="border rounded-lg py-1 px-3 text-sm"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleTitleSave}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleTitleSave();
                            if (e.key === "Escape") setIsEditingTitle(false);
                        }}
                    />
                ) : (
                    <h2
                        className="text-lg font-semibold cursor-pointer"
                        onClick={() => setIsEditingTitle(true)}
                    >
                        {title}
                    </h2>
                )}

                <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white" align="end">
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditModalOpen(true);
                                setIsDropdownOpen(false);
                                setEditedItems(items);
                            }}
                        >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation();
                                showMessage("Select soon", NoticeEnum.INFO);
                                setIsDropdownOpen(false);
                            }}
                        >
                            <Eye className="mr-2 h-4 w-4" /> Select
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="space-y-3">
                {items?.map(item => {
                    return <>
                        <div key={item.id}>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-900">{item.name}</span>
                                <span className="text-gray-500 text-sm">
                                    {item.level}
                                </span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full transition-all duration-300">
                                <div
                                    className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                                    style={{ width: `${lanLevelToNum(item.level)}%` }}
                                ></div>
                            </div>
                        </div>
                    </>
                })}
            </div>
            <CareerLanguageEditModal
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                setIsDropdownOpen={setIsDropdownOpen}
                saveLoading={saveLoading}
                setSaveLoading={setSaveLoading}
                editedItems={editedItems}
                setEditedItems={setEditedItems}
            />
            {contextHolder}
        </div>
    );
}