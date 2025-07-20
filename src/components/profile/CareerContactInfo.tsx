"use client";

import React, {useEffect, useRef, useState} from "react";
import {Edit, Eye, Globe, Mail, MapPin, MoreVertical, Phone,} from "lucide-react";
import {Button} from "../dashboard/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "../dashboard/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../dashboard/ui/dialog";
import {UpdateContactRequestType} from "@/types/careerProfile/CareerProfileType";
import {updateContact} from "@/api/requests/profile/profile.api";
import useMyNotice from "@/hooks/useMyNotice";
import {NoticeEnum} from "@/enums/NoticeEnum";
import {useAppSelector} from "@/hooks/hooks";
import {useCareerProfile} from "@/store/zustand/useCareerProfile";

export default function CareerContactInfo() {
    const {showMessage} = useMyNotice();
    const {user} = useAppSelector(state => state.auth);
    const setCareerContact = useCareerProfile(state => state.setCareerContact);
    const careerData = useCareerProfile(state => state.data);

    const [editForm, setEditForm] = useState<UpdateContactRequestType>({
        title: careerData?.contactTitle || "Contact Information",
        phoneNumber: careerData?.phoneNumber || "",
        location: careerData?.address || "",
        website: careerData?.website || "",
        websiteLink: careerData?.websiteLink || "",
    });

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const titleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (careerData) {
            setEditForm({
                title: careerData.contactTitle || "Contact Information",
                phoneNumber: careerData.phoneNumber || "",
                location: careerData.address || "",
                website: careerData.website || "",
                websiteLink: careerData.websiteLink || "",
            });
        }
    }, [careerData]);

    useEffect(() => {
        if (isEditingTitle && titleRef.current) {
            titleRef.current.focus();
        }
    }, [isEditingTitle]);

    const handleTitleSave = async () => {
        if (!editForm.title || !editForm.title.trim()) {
            showMessage("Title should not be empty.", NoticeEnum.ERROR);
            return;
        }

        setIsEditingTitle(false);
        await update({...editForm, title: editForm.title});
    };

    const handleTitleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") handleTitleSave();
        if (e.key === "Escape") setIsEditingTitle(false);
    };

    const openEditModal = () => {
        setEditForm({
            title: careerData?.contactTitle || "Contact Information",
            phoneNumber: careerData?.phoneNumber || "",
            location: careerData?.address || "",
            website: careerData?.website || "",
            websiteLink: careerData?.websiteLink || "",
        });
        setIsEditModalOpen(true);
        setIsDropdownOpen(false);
    };

    const handleEditFormSave = async () => {
        setIsEditModalOpen(false);
        await update(editForm);
    };

    const handleEditFormChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const {name, value} = e.target;
        setEditForm((prev) => ({...prev, [name]: value}));
    };

    const update = async (payload: UpdateContactRequestType) => {
        setSaveLoading(true);
        try {
            if (!careerData) return;
            payload.title = payload.title.trim();
            const response = await updateContact(payload, careerData.id);
            setCareerContact(payload);
            showMessage(response.data, NoticeEnum.SUCCESS);
        } catch (e) {
            showMessage("Something went wrong", NoticeEnum.ERROR);
        } finally {
            setSaveLoading(false);
        }
    };

    const displayTitle = careerData?.contactTitle || "Contact Information";
    const displayPhone = careerData?.phoneNumber || "";
    const displayLocation = careerData?.address || "";
    const displayWebsite = careerData?.website || "";
    const displayWebsiteLink = careerData?.websiteLink || "";

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center">
                {isEditingTitle ? (
                    <input
                        ref={titleRef}
                        className="border rounded-lg py-1 px-3 text-sm font-normal text-gray-900"
                        value={editForm.title}
                        onChange={(e) =>
                            setEditForm((d) => ({...d, title: e.target.value}))
                        }
                        onBlur={handleTitleSave}
                        onKeyDown={handleTitleKeyDown}
                    />
                ) : (
                    <h2
                        className="text-lg font-semibold mb-4 text-gray-900 cursor-pointer"
                        onClick={() => setIsEditingTitle(true)}
                        title={displayTitle}
                    >
                        {displayTitle}
                    </h2>
                )}

                <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4 text-black"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem
                            className="hover:cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                openEditModal();
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <Edit className="h-4 w-4"/>
                                <span>Edit</span>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => console.log("Select clicked")}>
                            <Eye className="h-4 w-4 mr-2"/>
                            <span>Select</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="space-y-3">
                <div className="flex items-start">
                    <Mail className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0"/>
                    <div className="flex-1 min-w-0 max-w-[100%]">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="break-words">
                            {user.email}
                        </p>
                    </div>
                </div>
                <div className="flex items-start">
                    <Phone className="w-5 h-5 text-gray-500 mt-0.5 mr-3"/>
                    <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-gray-900">
                            {displayPhone || "+998 (__) _______"}
                        </p>
                    </div>
                </div>
                <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-3"/>
                    <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-gray-900 break-words">
                            {displayLocation || "Unknown"}
                        </p>
                    </div>
                </div>
                <div className="flex items-start">
                    <Globe className="w-5 h-5 text-gray-500 mt-0.5 mr-3"/>
                    <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <a
                            href={displayWebsiteLink || "#"}
                            className="text-blue-600 hover:underline break-words"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {displayWebsite || "No Website"}
                        </a>
                    </div>
                </div>
            </div>

            <Dialog
                open={isEditModalOpen}
                onOpenChange={(open) => {
                    setIsEditModalOpen(open);
                    if (!open) {
                        setIsDropdownOpen(false);
                    }
                }}
            >
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Edit Contact Information</DialogTitle>
                        <DialogDescription>
                            Update your contact details below.
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        className="space-y-4"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            await handleEditFormSave();
                        }}
                    >
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full border rounded-md px-3 py-2 bg-gray-100"
                                value={user.email}
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                className="w-full border rounded-md px-3 py-2"
                                value={editForm.phoneNumber}
                                onChange={handleEditFormChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                className="w-full border rounded-md px-3 py-2"
                                value={editForm.location}
                                onChange={handleEditFormChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Website</label>
                            <input
                                type="text"
                                name="website"
                                className="w-full border rounded-md px-3 py-2"
                                value={editForm.website}
                                onChange={handleEditFormChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Website Link</label>
                            <input
                                type="text"
                                name="websiteLink"
                                className="w-full border rounded-md px-3 py-2"
                                value={editForm.websiteLink}
                                onChange={handleEditFormChange}
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
        </div>
    );
}
