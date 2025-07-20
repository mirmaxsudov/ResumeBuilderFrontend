"use client";

import CoverLetterN1 from "@/@CoverLetter/components/CoverLetterN1";
import CoverLetterEnum from "@/enums/CoverLetterEnum";
import {Button} from "@/components/dashboard/ui/button";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {Input} from "@/components/dashboard/ui/input";

const CoverPage = () => {
    const [title, setTitle] = useState("Cover Letter Title");
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    const titleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditingTitle && titleInputRef.current) {
            titleInputRef.current.focus();
            titleInputRef.current.select();
        }
    }, [isEditingTitle]);

    const handleTitleClick = () => {
        setIsEditingTitle(true);
    };

    const handleTitleBlur = () => {
        setIsEditingTitle(false);
    };

    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === "Escape")
            titleInputRef.current?.blur();
    };

    return (
        <div className="bg-[#F3F4F6] h-screen w-full">
            <div className="grid grid-cols-2 gap-4 p-4">
                <div className="bg-[#fff] rounded-xl border p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <Link href="/dashboard" passHref>
                            <Button
                                asChild
                                variant="outline"
                                className="bg-[#1976D2] hover:bg-[#1565C0] text-white"
                            >
                                <a className="flex items-center gap-2">← To Dashboard</a>
                            </Button>
                        </Link>
                        <div className={"flex justify-end items-center"}>
                            {isEditingTitle ? (
                                <Input
                                    ref={titleInputRef}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    onBlur={handleTitleBlur}
                                    onKeyDown={handleTitleKeyDown}
                                    className="mx-auto w-full max-w-xs h-[24px]"
                                />
                            ) : (
                                <h2
                                    className="text-2xl inline-block font-bold cursor-text"
                                    onClick={handleTitleClick}
                                >
                                    {title}
                                </h2>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-[#fff] rounded-xl border p-6">
                        <h2 className="text-2xl font-bold">Cover Letter Template</h2>
                    </div>
                    <div className={"my-4"}>
                        <CoverLetterN1
                            data={{
                                id: null,
                                title,
                                firstname: "John",
                                lastname: "Doe",
                                address: "123 Main St, City, Country",
                                jobTitle: "Software Engineer",
                                email: "qGw4o@example.com",
                                phoneNumber: "+1234567890",
                                companyName: "Tech Solutions Inc.",
                                managerName: "Jane Smith",
                                letterDetails:
                                    "I am writing to express my interest in the Software Engineer position at Tech Solutions Inc. I believe my skills and experience make me a perfect fit for this role.",
                                type: CoverLetterEnum.COVER_LETTER_N1,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoverPage;