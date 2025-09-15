"use client";

import CoverLetterN1 from "@/@CoverLetter/components/CoverLetterN1";
import CoverLetterEnum from "@/enums/CoverLetterEnum";
import { NoticeEnum } from "@/enums/NoticeEnum";
import { Button } from "@/components/dashboard/ui/button";
import { Label } from "@/components/dashboard/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/dashboard/ui/dialog";
import { ScrollArea } from "@/components/dashboard/ui/scroll-area";
import { Separator } from "@/components/dashboard/ui/separator";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/dashboard/ui/input";
import { Textarea } from "@/components/dashboard/ui/textarea";
import type { CoverLetterResponseType } from "@/types/coverLetter/CoverLetterType";
import { Download, FilePlus2, Save, Share2, Sparkles, Wand2 } from "lucide-react";
import useMyNotice from "@/hooks/useMyNotice";
import { useRouter, useSearchParams } from "next/navigation";
import CoverLetterApi from '@/api/requests/cover-letter/coverLetterApi';
import { useAppSelector } from "@/hooks/hooks";
import { createQuery } from "@/helpers/createQuery";
import LoadingAnimation from "@/helpers/LoadingAnimation";

const CoverLetterCreatePage = () => {
    const [title, setTitle] = useState("Cover Letter Title");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<CoverLetterEnum>(CoverLetterEnum.COVER_LETTER_N1);
    const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
    const [isInit, setInit] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        if (new URLSearchParams(window.location.search).get("id"))
            return false;
        return new URLSearchParams(window.location.search).get("type") === "new";
    });
    const hasInitializedRef = useRef<boolean>(false);
    const { showMessage } = useMyNotice();
    const router = useRouter();
    const searchParams = useSearchParams();

    const { user } = useAppSelector(state => state.auth);

    const [formData, setFormData] = useState<CoverLetterResponseType>({
        id: null,
        title: "Cover Letter Title",
        firstname: user.firstName,
        lastname: user.lastname,
        address: "",
        jobTitle: "",
        email: user.email,
        phoneNumber: "",
        companyName: "",
        managerName: "",
        letterDetails: "",
        type: CoverLetterEnum.COVER_LETTER_N1,
    });

    const titleInputRef = useRef<HTMLInputElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isEditingTitle && titleInputRef.current) {
            titleInputRef.current.focus();
            titleInputRef.current.select();
        }
    }, [isEditingTitle]);

    const createQueryFun = useCallback(createQuery, [searchParams]);


    useEffect(() => {
        const spId = searchParams?.get("id") ?? (typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("id") : null);

        if (!spId) {
            const spType = searchParams?.get("type") ?? (typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("type") : null);
            const isNew = spType === "new";
            if (isNew && !hasInitializedRef.current) {
                hasInitializedRef.current = true;
                setInit(true);
                initCoverLetter().finally(() => setInit(false));
            }
        } else {
            fetchCoverLettersById(+spId);
        }
    }, [searchParams]);

    const fetchCoverLettersById = async (id: number) => {
        if (!id)
            return;

        try {
            const response = await CoverLetterApi.getById(id);
            setFormData(response.data);
        } catch (error) {
        }
    }

    const initCoverLetter = async () => {
        const response = await CoverLetterApi.create(formData);
        setFormData(response.data);
        const newQuery = createQueryFun("type", "update", searchParams);
        router.replace(`?${newQuery}`);
    };


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

    const handleChange = (field: keyof CoverLetterResponseType, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        showMessage("Saved", NoticeEnum.SUCCESS);
    };

    const handleNew = () => {
        const reset: CoverLetterResponseType = {
            id: null,
            title: "Untitled Cover Letter",
            firstname: "",
            lastname: "",
            address: "",
            jobTitle: "",
            email: "",
            phoneNumber: "",
            companyName: "",
            managerName: "",
            letterDetails: "",
            type: selectedTemplate,
        };
        setTitle(reset.title);
        setFormData(reset);
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(`${formData.firstname} ${formData.lastname} - ${formData.title}`);
            showMessage("Link copied", NoticeEnum.SUCCESS);
        } catch {
            showMessage("Copy failed", NoticeEnum.ERROR);
        }
    };

    const handleDownload = () => {
        window.print();
    };

    const renderPreview = () => {
        const dataForPreview: CoverLetterResponseType = {
            ...formData,
            title,
            type: selectedTemplate,
        };
        switch (selectedTemplate) {
            case CoverLetterEnum.COVER_LETTER_N1:
            default:
                return <CoverLetterN1 data={dataForPreview} />;
        }
    };

    const renderPreviewForTemplate = (template: CoverLetterEnum) => {
        const dataForPreview: CoverLetterResponseType = {
            ...formData,
            title,
            type: template,
        };
        switch (template) {
            case CoverLetterEnum.COVER_LETTER_N1:
            default:
                return <CoverLetterN1 data={dataForPreview} />;
        }
    };

    const templates: Array<{ key: CoverLetterEnum; name: string }> = [
        { key: CoverLetterEnum.COVER_LETTER_N1, name: "Elegant Stripe" },
    ];

    if (isInit) {
        return (
            <>
                <LoadingAnimation title="Creating" />
            </>
        );
    }

    return (
        <div className="bg-[#F3F4F6] min-h-screen w-full">
            <div className="p-4">
                <div className="bg-white rounded-xl border p-3 md:p-4 mb-4 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-6 md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/dashboard" passHref>
                                <Button onClick={() => router.back()} asChild variant="outline" className="bg-[#1976D2] hover:bg-[#1565C0] text-white">
                                    <p className="flex items-center gap-2">← Back</p>
                                </Button>
                            </Link>
                            {isEditingTitle ? (
                                <Input
                                    ref={titleInputRef}
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                        handleChange("title", e.target.value);
                                    }}
                                    onBlur={handleTitleBlur}
                                    onKeyDown={handleTitleKeyDown}
                                    className="w-full max-w-sm h-[36px]"
                                />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl md:text-2xl font-bold cursor-text" onClick={handleTitleClick}>
                                        {title}
                                    </h2>
                                    <Sparkles className="h-4 w-4 text-[#1976D2]" />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            <Button variant="outline" onClick={handleNew} className="gap-2"><FilePlus2 className="h-4 w-4" />New</Button>
                            <Button variant="outline" onClick={handleSave} className="gap-2"><Save className="h-4 w-4" />Save</Button>
                            <Button variant="outline" onClick={handleShare} className="gap-2"><Share2 className="h-4 w-4" />Share</Button>
                            <Button onClick={handleDownload} className="gap-2"><Download className="h-4 w-4" />Download</Button>
                            <Separator orientation="vertical" className="h-6" />
                            <Button variant="outline" className="gap-2" onClick={() => setIsTemplateDialogOpen(true)}>
                                <Wand2 className="h-4 w-4" /> Choose Template
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Left: Form */}
                    <div className="bg-white rounded-xl border p-4 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstname">First name</Label>
                                <Input id="firstname" value={formData.firstname} onChange={(e) => handleChange("firstname", e.target.value)} placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastname">Last name</Label>
                                <Input id="lastname" value={formData.lastname} onChange={(e) => handleChange("lastname", e.target.value)} placeholder="Doe" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="jobTitle">Job title</Label>
                                <Input id="jobTitle" value={formData.jobTitle} onChange={(e) => handleChange("jobTitle", e.target.value)} placeholder="Software Engineer" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} placeholder="123 Main St, City, Country" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="john.doe@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" value={formData.phoneNumber} onChange={(e) => handleChange("phoneNumber", e.target.value)} placeholder="+1234567890" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company">Company</Label>
                                <Input id="company" value={formData.companyName} onChange={(e) => handleChange("companyName", e.target.value)} placeholder="Tech Solutions Inc." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="manager">Hiring Manager</Label>
                                <Input id="manager" value={formData.managerName} onChange={(e) => handleChange("managerName", e.target.value)} placeholder="Jane Smith" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="letter">Letter</Label>
                                <Textarea id="letter" value={formData.letterDetails} onChange={(e) => handleChange("letterDetails", e.target.value)} rows={12} placeholder="Write your cover letter here..." />
                            </div>
                        </div>
                    </div>

                    {/* Right: Live Preview */}
                    <div className="bg-white rounded-xl border p-4 md:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Live preview</h3>
                            <span className="text-sm text-muted-foreground">Template: {selectedTemplate}</span>
                        </div>
                        <div ref={previewRef} className="overflow-auto max-h-[calc(100vh-280px)]">
                            {renderPreview()}
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
                <DialogContent className="max-w-5xl bg-[#fff]">
                    <DialogHeader>
                        <DialogTitle>Select a cover letter template</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[70vh]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
                            {templates.map((tpl) => (
                                <button
                                    key={tpl.key}
                                    className={`group relative rounded-lg border hover:border-[#1976D2] hover:shadow transition overflow-hidden bg-white`}
                                    onClick={() => {
                                        setSelectedTemplate(tpl.key);
                                        setFormData((prev) => ({ ...prev, type: tpl.key }));
                                        setIsTemplateDialogOpen(false);
                                    }}
                                >
                                    <div className="absolute top-2 right-2 z-10 rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium shadow">{tpl.name}</div>
                                    <div className="h-[320px] w-full overflow-hidden">
                                        <div className="scale-[0.8] origin-top-left bg-red-200">
                                            {renderPreviewForTemplate(tpl.key)}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CoverLetterCreatePage;
