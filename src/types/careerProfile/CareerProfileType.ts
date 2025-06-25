import ResumeLanguageLevel from '@/enums/LanguageEnum';
import { ImageAttachmentResponse } from '../attachment/ImageAttachmentType';

export interface CareerBase {
    id: number;
    title: string;
}

export interface CareerProfileResponseType {
    id: number,
    contactTitle: string,
    linearGradietBG: string,
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: string,
    address: string,
    website: string,
    websiteLink: string,
    skillsTitle: string,
    skills: string[],
    thumbnailImage: ImageAttachmentResponse,
    profileImage: ImageAttachmentResponse | null,
    resumes: CareerBase[],
    summary: SummaryResponseType,
    language: LanguageResponseType,
    experience: ExperienceResponseType,
    education: EducationResponseType
}

export interface EducationResponseType extends CareerBase {
    items: EducationItemResponseType[];
}

export interface EducationItemResponseType extends CareerBase {
    degree: string,
    startDate: string,
    endDate: string,
    city: string,
    description: string,
    priority: number,
    currentStudy: true
}

export interface ExperienceResponseType extends CareerBase {
    items: ExperienceItemResponse[];
}

export interface ExperienceItemResponse {
    id: number,
    jobTitle: string,
    startDate: string,
    endDate: string,
    priority: number,
    description: string,
    currentJob: boolean;
}

export interface SummaryResponseType extends CareerBase {
    summary: string
}

export interface LanguageResponseType extends CareerBase {
    items: LangaugeResponseItem[]
}

export interface LangaugeResponseItem {
    id: number;
    priority: number,
    level: ResumeLanguageLevel;
    name: string;
}

export interface LanaguageRequestItem {
    id: number;
    priority: number,
    level: ResumeLanguageLevel;
    name: string;
}

// Updates

export interface UpdateContactRequestType {
    title: string,
    phoneNumber: string,
    location: string,
    website: string,
    websiteLink: string
}

export interface UpdateLanguageRequestType {
    title: string,
    items: LanaguageRequestItem[];
}