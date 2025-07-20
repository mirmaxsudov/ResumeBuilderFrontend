"use client";

import GenerateProfileIcon from "@/helpers/GenerateProfileIcon"
import {useAppSelector} from "@/hooks/hooks";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/dashboard/ui/dialog";
import {useState} from "react";
import ProfileImageEditor from "./ProfileImageEditorProps ";
import {uploadFile} from "@/api/requests/file/file.api";
import {deleteProfileImage as deleteProfileImageApi, updateCareerImages} from "@/api/requests/profile/profile.api";
import {useCareerProfile} from "@/store/zustand/useCareerProfile";
import useMyNotice from "@/hooks/useMyNotice";
import {NoticeEnum} from "@/enums/NoticeEnum";
import {Image} from "antd";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../dashboard/ui/dropdown-menu";
import {Download, Edit, Edit2Icon, Trash} from "lucide-react";
import Link from 'next/link';
import {generateProfileDownloadUrl} from "@/helpers/generateProfileDownloadUrl";

const CareerProfileImage = () => {
    const {data, setProfileImage, deleteProfileImage} = useCareerProfile(state => state)
    const [loadings, setLoadings] = useState({
        openProfileImageEditor: false,
        profileDelete: false
    });
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isEditorOpen, setEditorOpen] = useState(false);

    const {user} = useAppSelector((state) => state.auth);
    const { showMessage} = useMyNotice();

    const handleSaveProfileImage = async (croppedBlob: Blob) => {
        try {
            const imageId = await uploadFile(croppedBlob);
            const response = await updateCareerImages(data.id, imageId, "PROFILE_IMAGE");
            setProfileImage(response.data);
            showMessage("Successfully updated", NoticeEnum.SUCCESS);
            setEditorOpen(false);
        } catch (e) {
            showMessage("Something went wrong!", NoticeEnum.ERROR);
        } finally {
            setLoadings({...loadings, openProfileImageEditor: false});
        }
    };

    const deleteProfileImg = async () => {
        setLoadings({
            ...loadings,
            profileDelete: true
        })
        try {
            const response = await deleteProfileImageApi(data.id);
            deleteProfileImage();
            showMessage(response.message, NoticeEnum.SUCCESS);
        } catch (e) {
            showMessage("Something went wrong!", NoticeEnum.ERROR);
        } finally {
            setLoadings({
                ...loadings,
                profileDelete: false
            })
        }
    }

    return <>
        <div
            className="absolute -top-16 left-6 w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-md bg-white cursor-pointer group"
        >
            <div className="relative size-full">
                {data.profileImage ? <>
                    <div>
                        <Image className="size-full object-cover" src={data.profileImage.url} alt={user.firstName}/>
                    </div>
                </> : <>
                    {
                        GenerateProfileIcon({firstName: user.firstName, lastName: user.lastname})
                    }
                </>}
                <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                        <div className="absolute z-20 bg-white border-black rounded-full p-1 bottom-[4px] right-[4px]">
                            <Edit2Icon/>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#fff]" align="end">
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setEditorOpen(true);
                                setDropdownOpen(false);
                            }}>
                            <Edit className="mr-2 h-4 w-4"/>
                            <span>Upload</span>
                        </DropdownMenuItem>
                        {data.profileImage ?
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <Link
                                    download={true}
                                    target="_blank"
                                    className="flex gap-2 text-black"
                                    href={generateProfileDownloadUrl(data.id)}>
                                    <Download/>
                                    <span>
                                        Download
                                    </span>
                                </Link>
                            </DropdownMenuItem>
                            : null
                        }
                        <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={(e) => {
                            e.stopPropagation();
                            deleteProfileImg();
                        }}>
                            <Trash className="mr-2 h-4 w-4"/>
                            <span>{loadings.profileDelete ? "Deleting ..." : "Delete"}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Dialog open={isEditorOpen} onOpenChange={setEditorOpen}>
                <DialogContent className="sm:max-w-[600px] bg-[#fff]">
                    <DialogHeader>
                        <DialogTitle>Edit Profile Image</DialogTitle>
                    </DialogHeader>
                    <div>
                        <ProfileImageEditor
                            onSave={handleSaveProfileImage}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    </>
}

export default CareerProfileImage;