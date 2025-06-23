import { useAppSelector } from "@/hooks/hooks";
import { Button } from "../dashboard/ui/button";
import { Edit, Eye } from "lucide-react";
import CareerProfileImage from "./CareerProfileImage";

const ProfileHeader = () => {
    const { user } = useAppSelector((state) => state.auth);

    return <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"  ></div>
        <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end">
                <CareerProfileImage />
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
    </div>
}

export default ProfileHeader;