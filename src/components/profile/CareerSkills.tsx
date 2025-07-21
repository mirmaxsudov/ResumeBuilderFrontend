"use client";

import {Edit, Eye, MoreVertical} from "lucide-react";
import {Button} from "../dashboard/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../dashboard/ui/dropdown-menu";
import {useCareerProfile} from "@/store/zustand/useCareerProfile";
import useMyNotice from "@/hooks/useMyNotice";
import {NoticeEnum} from "@/enums/NoticeEnum";
import {useEffect, useRef, useState} from "react";
import {
    Dialog,
    DialogDescription,
    DialogTitle,
    DialogContent,
    DialogHeader,
    DialogFooter
} from "../dashboard/ui/dialog";
import clsx from "clsx";
import {TagsInput} from "./TagsInput";
import {updateSkills} from "@/api/requests/profile/profile.api";
import {Input} from "@/components/dashboard/ui/input";

const CareerSkills = () => {
    const {showMessage} = useMyNotice();
    const data = useCareerProfile(state => state.data);
    const setSkills = useCareerProfile(state => state.setSkills);
    const [skills, setCareerSkills] = useState<string[]>([]);
    const [title, setTitle] = useState(data.skillsTitle);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const titleRef = useRef<HTMLInputElement>(null);
    const [editedSkills, setEditedSkills] = useState<string[]>([]);

    useEffect(() => {
        if (data) {
            setTitle(data.skillsTitle);
            setCareerSkills(data.skills);
        }
    }, [data])

    useEffect(() => {
        if (isEditingTitle && titleRef.current)
            titleRef.current.focus();
    }, [isEditingTitle]);

    const handleTitleSave = async () => {
        if (!title || !title.trim()) {
            showMessage("Title could not be empty");
            return;
        }
        setIsEditingTitle(false);
        await updateJustTitle();
    };

    const handleTitleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") handleTitleSave();
        if (e.key === "Escape") setIsEditingTitle(false);
    };

    const handleEditFormSave = async () => await update()

    const updateJustTitle = async () => {
        setSaveLoading(true);
        try {
            if (!title) {
                showMessage("Skills title could not be empty");
                return;
            }
            const req = {
                title: title.trim(),
                skills
            }

            const response = await updateSkills(data.id, req);
            setSkills(title, skills);
            showMessage(response.data, NoticeEnum.SUCCESS);
        } catch (e) {
            showMessage("Something went wrong", NoticeEnum.ERROR);
        } finally {
            setSaveLoading(false);
        }
    }

    const update = async () => {
        setSaveLoading(true);
        try {
            if (!title) {
                showMessage("Skills title could not be empty");
                return;
            }
            const req = {
                title,
                skills: editedSkills
            }

            const response = await updateSkills(data.id, req);
            setCareerSkills(editedSkills);
            setSkills(title, editedSkills);
            showMessage(response.data, NoticeEnum.SUCCESS);
        } catch (e) {
            showMessage("Something went wrong", NoticeEnum.ERROR);
        } finally {
            setSaveLoading(false);
        }
    }

    return <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
            {isEditingTitle ? (
                <Input ref={titleRef}
                       className={"border rounded-lg py-1 px-3 text-sm font-normal text-gray-900"}
                       value={title}
                       onChange={e => setTitle(e.target.value)}
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
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4 text-black"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#fff]" align="end">
                    <DropdownMenuItem className="cursor-pointer" onClick={(e) => {
                        e.stopPropagation();
                        setIsEditModalOpen(true);
                        setIsDropdownOpen(false);
                        setEditedSkills(skills);

                    }}>
                        <Edit className="mr-2 h-4 w-4"/>
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={(e) => {
                        e.stopPropagation();
                        showMessage("Exists soon", NoticeEnum.INFO)
                    }}>
                        <Eye className="mr-2 h-4 w-4"/>
                        <span>Select</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        {(
            <div className="flex flex-wrap gap-2">
                {
                    skills?.map((skill, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                            {skill}
                        </span>
                    ))}
            </div>
        )}
        <p className={clsx("text-gray-700", [
            {
                "text-center": skills?.length === 0
            }
        ])}>{skills?.length === 0 && "There is no skills"}</p>

        <Dialog
            open={isEditModalOpen}
            onOpenChange={open => {
                setIsEditModalOpen(open);
                if (!open)
                    setIsDropdownOpen(false);
            }}>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Edit Summary Information</DialogTitle>
                    <DialogDescription>
                        Update your skills below.
                    </DialogDescription>
                </DialogHeader>
                <form
                    className="space-y-4 max-h-[500px] overflow-y-auto"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setIsEditModalOpen(false);
                        await handleEditFormSave();
                    }}
                >
                    <div>
                        <label className="block text-sm font-medium mb-1">Skills</label>
                        <TagsInput tags={editedSkills} setTags={setEditedSkills}/>
                    </div>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={saveLoading}>
                            {saveLoading ? 'Saving...' : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
}

export default CareerSkills;