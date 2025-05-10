import { SaveIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Button from '@mui/material/Button';

const ManageAccount = () => {
    return (
        <>
            <h1 className="text-1xl font-normal text-gray-500 mt-[20px]">
                Account
            </h1>
            <div className="bg-[#fff] p-[20px] rounded-[10px] flex justify-between flex-col items-center gap-[2 0px] shadow-md mt-[10px]"    >
                <div className="grid grid-cols-2 gap-[20px] w-full">
                    <Label className="text-gray-500 text-sm font-normal w-full">
                        First Name
                        <Input type="text" className="mt-[5px] w-full" placeholder="Enter your first name" />
                    </Label>
                    <Label className="text-gray-500 text-sm font-normal w-full">
                        Last Name
                        <Input type="text" className="mt-[5px] w-full" placeholder="Enter your last name" />
                    </Label>
                </div>
                <div className="w-full grid grid-cols-2 gap-[20px] items-center my-[20px]">
                    <Label className="text-gray-500 text-sm font-normal w-full">
                        Email
                        <Input type="email" className="mt-[5px] w-full" placeholder="Enter your email" />
                    </Label>
                    <div>
                        <p className="text-gray-500 text-[12px] font-normal w-full mt-[20px]">
                            Use this email to log in to your Resume.io account and receive notifications.
                        </p>
                    </div>
                </div>
                <div className="flex justify-end w-full">
                    <Button
                        loading
                        variant="text"
                        loadingPosition="end"
                    >
                        Save
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ManageAccount;