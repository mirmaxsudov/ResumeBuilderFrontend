"use client";

import { Eye, Edit, MoreVertical } from "lucide-react";
import { Button } from "../dashboard/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../dashboard/ui/dropdown-menu";
import useMyNotice from "@/hooks/useMyNotice";
import { useCareerProfile } from "@/store/zustand/useCareerProfile";
import { useEffect, useRef, useState } from "react";
import { updateSummary } from "@/api/requests/profile/profile.api";
import { NoticeEnum } from "@/enums/NoticeEnum";
import clsx from "clsx";
import { Dialog, DialogHeader, DialogDescription, DialogTitle, DialogContent, DialogFooter } from "../dashboard/ui/dialog";
import { Textarea } from "../dashboard/ui/textarea";

const CareerAbout = () => {
    const { contextHolder, showMessage } = useMyNotice();
    const setSummary = useCareerProfile(state => state.setSummary);
    const { summary, id } = useCareerProfile(state => state.data);
    const [editForm, setEditForm] = useState<{
        title: string,
        summary: string,
        newSummary: string
    }>({
        title: summary?.title || "About",
        summary: summary?.summary || "",
        newSummary: ""
    });

    console.log(summary);

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const titleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (summary) {
            setEditForm({
                title: summary?.title || "Contact Information",
                summary: summary?.summary || "",
                newSummary: ""
            });
        }
    }, [summary]);

    useEffect(() => {
        if (isEditingTitle && titleRef.current) {
            titleRef.current.focus();
        }
    }, [isEditingTitle]);

    const handleTitleSave = async () => {
        setIsEditingTitle(false);
        await update();
    };

    const handleTitleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") handleTitleSave();
        if (e.key === "Escape") setIsEditingTitle(false);
    };

    const handleEditFormSave = async () => {
        setEditForm({ ...editForm, newSummary: "" })
        await update()
    }

    const update = async () => {
        setSaveLoading(true);
        try {
            if (!editForm) return;
            const response = await updateSummary(id, editForm.newSummary || editForm.summary || "", editForm.title);
            setSummary(editForm);
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
                <input
                    ref={titleRef}
                    className="border rounded-lg py-1 px-3 text-sm font-normal text-gray-900"
                    value={editForm.title}
                    onChange={(e) =>
                        setEditForm((d) => ({ ...d, title: e.target.value }))
                    }
                    onBlur={handleTitleSave}
                    onKeyDown={handleTitleKeyDown}
                />
            ) : (
                <h2
                    className="text-lg font-semibold mb-4 text-gray-900 cursor-pointer"
                    onClick={() => setIsEditingTitle(true)}
                    title={editForm.title}
                >
                    {editForm.title}
                </h2>
            )}  <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4 text-black" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#fff]" align="end">
                    <DropdownMenuItem className="hover:cursor-pointer" onClick={(e) => {
                        e.stopPropagation();
                        setIsEditModalOpen(true);
                        setIsDropdownOpen(false);
                        setEditForm({ ...editForm, newSummary: editForm.summary })
                    }}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:cursor-pointer" onClick={(e) => {
                        e.stopPropagation();
                        console.log("Select clicked");
                    }}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Select</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <p className={clsx("text-gray-700", [
            {
                "text-center": !editForm.summary
            }
        ])}>{!editForm.summary ? "There is no summary" : editForm.summary}</p>

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
                        Update your summary below.
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
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <Textarea
                            className="w-full border rounded-md px-3 py-2 bg-gray-100"
                            defaultValue={editForm.newSummary || editForm.summary}
                            onChange={e => setEditForm({ ...editForm, newSummary: e.target.value })}
                        />
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
        {contextHolder}
    </div>
}

export default CareerAbout;