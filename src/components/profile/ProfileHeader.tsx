import GenerateProfileIcon from "@/helpers/GenerateProfileIcon";
import { useAppSelector } from "@/hooks/hooks";
import { useState } from "react";
import { Button } from "../dashboard/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/dashboard/ui/dialog";
import ProfileImageEditor from "@/components/profile/ProfileImageEditorProps ";
import { Edit, Eye, } from "lucide-react";

const ProfileHeader = () => {
    const { user } = useAppSelector((state) => state.auth);
    const [loadings, setLoadings] = useState({
        openProfileImageEditor: false
    });

    const handleSaveProfileImage = async (croppedBlob: Blob) => {
        console.log("Saving profile image...");
        setLoadings({ ...loadings, openProfileImageEditor: false });
    };

    return <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"  ></div>
        <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end">
                <div className="absolute -top-16 left-6 w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-md bg-white cursor-pointer" onClick={() => setLoadings({ ...loadings, openProfileImageEditor: true })}>
                    {
                        GenerateProfileIcon({ firstName: user.firstName, lastName: user.lastname })
                    }
                </div>
                <div className="mt-20 md:mt-0 md:ml-36 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {user.firstName || "User"} {user.lastname || "user"}
                            </h1>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex space-x-3">
                            <Button
                                variant="outline"
                                className="rounded-full hover:bg-blue-50 btn-hover"
                            >
                                <Eye size={16} className="mr-2" /> Show Resume
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm btn-hover text-white">
                                <Edit size={16} className="mr-2" /> Edit Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Dialog open={loadings.openProfileImageEditor} onOpenChange={(open) => setLoadings({ ...loadings, openProfileImageEditor: open })}>
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
}

export default ProfileHeader;