"use client";

import {useEffect} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/dashboard/ui/dialog";
import {Button} from "@/components/dashboard/ui/button";
import {Label} from "@/components/dashboard/ui/label";
import {Input} from "@/components/dashboard/ui/input";
import useMyNotice from "@/hooks/useMyNotice";
import {NoticeEnum} from "@/enums/NoticeEnum";
import {changePasswordForAuth} from "@/api/requests/auth/auth.api";

const passwordSchema = z
    .object({
        oldPassword: z.string().min(1, "Old password is required"),
        newPassword: z.string().min(1, "New password is required"),
        repeatPassword: z.string().min(1, "Please repeat your new password"),
    })
    .refine((data) => data.newPassword === data.repeatPassword, {
        path: ["repeatPassword"],
        message: "Passwords do not match",
    });

type PasswordForm = z.infer<typeof passwordSchema>;

type PropsType = {
    isOpen: boolean;
    setOpenModal: (val: boolean) => void;
};

export default function ChangePasswordModalForRegisteredUser(
    {
        isOpen,
        setOpenModal,
    }: PropsType) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<PasswordForm>({
        resolver: zodResolver(passwordSchema),
    });
    const {showMessage, contextHolder} = useMyNotice();

    useEffect(() => {
        if (!isOpen) reset();
    }, [isOpen, reset]);

    const onSubmit = async (data: PasswordForm) => {
        try {
            await changePasswordForAuth(data.oldPassword, data.newPassword);
            showMessage("Password changed — you will be logged out.", NoticeEnum.SUCCESS);
            setOpenModal(false);
        } catch (e) {
            console.error(e);
            showMessage("Failed to change password");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setOpenModal}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Change Your Account Password
                    </DialogTitle>
                    <DialogDescription className="text-gray-500 text-sm mb-4">
                        After saving, you will be logged out.
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 px-4 pb-6"
                >
                    <div>
                        <Label className="text-sm font-medium">Old Password</Label>
                        <Input
                            type="password"
                            placeholder="Old password"
                            {...register("oldPassword")}
                            className="mt-1"
                        />
                        {errors.oldPassword && (
                            <p className="text-red-600 text-xs mt-1">
                                {errors.oldPassword.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label className="text-sm font-medium">New Password</Label>
                        <Input
                            type="password"
                            placeholder="New password"
                            {...register("newPassword")}
                            className="mt-1"
                        />
                        {errors.newPassword && (
                            <p className="text-red-600 text-xs mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label className="text-sm font-medium">Repeat Password</Label>
                        <Input
                            type="password"
                            placeholder="Repeat password"
                            {...register("repeatPassword")}
                            className="mt-1"
                        />
                        {errors.repeatPassword && (
                            <p className="text-red-600 text-xs mt-1">
                                {errors.repeatPassword.message}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        variant="outline"
                        className="mt-4"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Changing..." : "Change Password"}
                    </Button>
                </form>
            </DialogContent>
            {contextHolder}
        </Dialog>
    );
}