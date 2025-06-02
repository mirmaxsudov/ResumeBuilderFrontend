"use client";

import { useState } from "react";
import { Button } from "@/components/dashboard/ui/button";
import { Download, Menu, Settings } from "lucide-react";
import { useResumeScore } from "@/hooks/use-resume-score";
import { ResumeForm } from "@/components/resume/resume-form";
import { ResumePreview } from "@/components/resume/resume-preview";
import Resume1 from "@/@Resume/components/templates/Resume1";
import Resume6 from "@/@Resume/components/templates/Resume6";
import Resume7 from "@/@Resume/components/teplates/Resume7";
import Resume8 from "@/@Resume/components/templates/Resume8";

export interface PersonalDetails {
    jobTitle: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    address: string;
    cityOrState: string;
    country: string;
    postalCode: string;
    drivingLicense: string;
    placeOfBirth: string;
    dateOfBirth: string;
    nationality: string;
    isImageExists: boolean;
    image?: { id: number; url?: string };
}

export interface ProfessionalSummary {
    summary: string;
}

export interface Employment {
    id: string;
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate: string;
    isCurrentJob: boolean;
    priority: number;
    description: string;
    location?: string; // Add location field
}

export interface Education {
    id: string;
    title: string;
    degree: string;
    startDate: string;
    endDate: string;
    isCurrentStudy: boolean;
    city: string;
    description: string;
    priority: number;
}

export interface SocialLink {
    id: string;
    label: string;
    link: string;
    priority: number;
}

export type SkillLevel =
    | "NOVICE"
    | "BEGINNER"
    | "SKILLFUL"
    | "EXPERIENCED"
    | "EXPERT";

export interface Skill {
    id: string;
    skill: string;
    level: SkillLevel;
    priority: number;
}

export type LanguageLevel =
    | "NATIVE_SPEAKER"
    | "HIGHLY_PROFICIENT"
    | "VERY_GOOD_COMMAND"
    | "GOOD_WORKING_KNOWLEDGE"
    | "WORKING_KNOWLEDGE"
    | "A1"
    | "A2"
    | "B1"
    | "B2"
    | "C1"
    | "C2";

export interface Language {
    id: string;
    lang: string;
    level: LanguageLevel;
    priority: number;
}

export interface CustomSection {
    id: string;
    title: string;
    items: CustomSectionItem[];
}

export interface CustomSectionItem {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    startDate?: string;
    endDate?: string;
    priority: number;
}

export interface SectionOrder {
    id: string;
    title: string;
    type: keyof ResumeData | "custom";
    enabled: boolean;
    customSectionId?: string;
}

export interface ResumeData {
    name: string;
    info: PersonalDetails;
    summary: ProfessionalSummary;
    employment: {
        title: string;
        items: Employment[];
    };
    education: {
        title: string;
        items: Education[];
    };
    socialLink: {
        title: string;
        items: SocialLink[];
    };
    skills: {
        title: string;
        isShowExperienceLevel: boolean;
        items: Skill[];
    };
    language: {
        title: string;
        items: Language[];
    };
    customSections: CustomSection[];
}

export interface ResumeDataWithOrder extends ResumeData {
    sectionOrder: SectionOrder[];
}

export default function CreateResumePage() {
    const [resumeData, setResumeData] = useState<ResumeDataWithOrder>({
        name: "Resume Builder",
        info: {
            jobTitle: "",
            firstname: "",
            lastname: "",
            email: "",
            phoneNumber: "",
            address: "",
            cityOrState: "",
            country: "",
            postalCode: "",
            drivingLicense: "",
            placeOfBirth: "",
            dateOfBirth: "",
            nationality: "",
            isImageExists: false,
        },
        summary: {
            summary: "",
        },
        employment: {
            title: "Employment History",
            items: [],
        },
        education: {
            title: "Education",
            items: [],
        },
        socialLink: {
            title: "Social Links",
            items: [],
        },
        skills: {
            title: "Skills",
            isShowExperienceLevel: true,
            items: [],
        },
        language: {
            title: "Languages",
            items: [],
        },
        customSections: [],
        sectionOrder: [
            { id: "info", title: "Personal details", type: "info", enabled: true },
            { id: "summary", title: "Summary", type: "summary", enabled: true },
            {
                id: "employment",
                title: "Employment History",
                type: "employment",
                enabled: true,
            },
            {
                id: "education",
                title: "Educations",
                type: "education",
                enabled: true,
            },
            {
                id: "socialLink",
                title: "Social Links",
                type: "socialLink",
                enabled: true,
            },
            { id: "skills", title: "Skills", type: "skills", enabled: true },
            { id: "language", title: "Languages", type: "language", enabled: true },
        ],
    });

    const updateResumeData = (section: keyof ResumeData, data: any) => {
        setResumeData((prev) => ({
            ...prev,
            [section]: data,
        }));
    };

    const updateSectionOrder = (newOrder: SectionOrder[]) => {
        setResumeData((prev) => ({
            ...prev,
            sectionOrder: newOrder,
        }));
    };

    const addCustomSection = (title: string) => {
        const newSection: CustomSection = {
            id: Date.now().toString(),
            title,
            items: [],
        };

        const newSectionOrder: SectionOrder = {
            id: `custom-${newSection.id}`,
            title,
            type: "custom",
            enabled: true,
            customSectionId: newSection.id,
        };

        setResumeData((prev) => ({
            ...prev,
            customSections: [...prev.customSections, newSection],
            sectionOrder: [...prev.sectionOrder, newSectionOrder],
        }));
    };

    const updateCustomSection = (sectionId: string, data: CustomSection) => {
        setResumeData((prev) => ({
            ...prev,
            customSections: prev.customSections.map((section) =>
                section.id === sectionId ? data : section
            ),
        }));
    };

    const removeCustomSection = (sectionId: string) => {
        setResumeData((prev) => ({
            ...prev,
            customSections: prev.customSections.filter(
                (section) => section.id !== sectionId
            ),
            sectionOrder: prev.sectionOrder.filter(
                (order) => order.customSectionId !== sectionId
            ),
        }));
    };

    const exportResumeData = () => {
        // Remove the sectionOrder for API submission
        const { sectionOrder, ...apiData } = resumeData;
        console.log("Resume Data for API:", JSON.stringify(apiData, null, 2));

        // You can also download as JSON file
        const dataStr = JSON.stringify(apiData, null, 2);
        const dataUri =
            "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
        const exportFileDefaultName = "resume-data.json";
        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", dataUri);
        linkElement.setAttribute("download", exportFileDefaultName);
        linkElement.click();
    };

    function ResumeScoreDisplay({
        resumeData,
    }: {
        resumeData: ResumeDataWithOrder;
    }) {
        const scoreData = useResumeScore(resumeData);

        const getScoreColor = (score: number) => {
            if (score >= 90) return "bg-green-100 text-green-800";
            if (score >= 70) return "bg-yellow-100 text-yellow-800";
            return "bg-red-100 text-red-800";
        };

        return (
            <span
                className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(
                    scoreData.overall
                )}`}
            >
                {scoreData.overall}% Your resume score
            </span>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                        <h1 className="text-lg font-semibold">
                            {resumeData.info.firstname || resumeData.info.lastname
                                ? `${resumeData.info.firstname} ${resumeData.info.lastname}'s Resume`
                                : "Resume Builder"}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <ResumeScoreDisplay resumeData={resumeData} />
                        </div>
                        <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Customize
                        </Button>
                        <Button variant="outline" size="sm" onClick={exportResumeData}>
                            Export JSON
                        </Button>
                        <Button size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                        </Button>
                    </div>
                </div>
            </header>
            <div className="flex h-[calc(100vh-73px)]">
                <div className="w-[45%] bg-white border-r border-gray-200 overflow-y-auto">
                    <ResumeForm
                        resumeData={resumeData}
                        updateResumeData={updateResumeData}
                        updateSectionOrder={updateSectionOrder}
                        addCustomSection={addCustomSection}
                        updateCustomSection={updateCustomSection}
                        removeCustomSection={removeCustomSection}
                    />
                </div>
                <div className="w-[55%] px-[40px] bg-gray-100 overflow-y-auto">
                    <div className="scale-100">
                        <Resume6 />
                    </div>
                </div>
            </div>
        </div>
    );
}