import ResumeLanguageLevel from '@/enums/LanguageEnum';
import { ImageAttachmentResponse } from '../attachment/ImageAttachmentType';

export interface CareerBase {
    id: number;
    title: string;
}

export interface CareerProfileType {
    linearGradietBG: string,
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: string,
    address: string,
    website: string,
    websiteLink: string,
    skills: string[],
    thumbnailImage: ImageAttachmentResponse,
    profileImage: ImageAttachmentResponse,
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

export interface LangaugeResponseItem extends CareerBase {
    priority: number,
    level: ResumeLanguageLevel;
}