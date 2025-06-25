import { create } from "zustand";
import { CareerProfileResponseType, LanguageResponseType, UpdateContactRequestType } from "@/types/careerProfile/CareerProfileType";
import { ImageAttachmentResponse } from "@/types/attachment/ImageAttachmentType";

interface CareerProfileStore {
    data: CareerProfileResponseType;
    setCareer: (career: CareerProfileResponseType) => void;
    setCareerContact: (contact: UpdateContactRequestType) => void;
    setSummary: (summary: { newSummary: string, summary: string, title: string }) => void;
    setProfileImage: (image: ImageAttachmentResponse) => void;
    setSkills: (title: string, skills: string[]) => void;
    setLangauges: (language: LanguageResponseType) => void;
    deleteProfileImage: () => void;
}

export const useCareerProfile = create<CareerProfileStore>((set, get) => ({
    data: {} as CareerProfileResponseType,
    deleteProfileImage: () => {
        const currentData = get().data;
        if (!currentData)
            return;
        set({
            data: {
                ...currentData,
                profileImage: null
            }
        })
    },
    setLangauges: (language: LanguageResponseType) => {
        const currentData = get().data;
        if (!currentData)
            return;
        set({
            data: {
                ...currentData,
                language: {
                    ...language
                }
            }
        })
    },
    setSkills: (title: string, skills: string[]) => {
        const currentDate = get().data;
        if (!currentDate)
            return;
        set({
            data: {
                ...currentDate,
                skillsTitle: title,
                skills
            }
        })
    },
    setCareer: (career: CareerProfileResponseType) => {
        set({ data: career });
    },
    setProfileImage: (image: ImageAttachmentResponse) => {
        const currentDate = get().data;
        if (!currentDate)
            return;
        set({
            data: {
                ...currentDate,
                profileImage: {
                    ...image
                }
            }
        })
    },
    setSummary: (summaryData: { newSummary: string, summary: string, title: string }) => {
        const currentData = get().data;
        if (!currentData)
            return;

        set({
            data: {
                ...currentData,
                summary: {
                    ...currentData.summary,
                    title: summaryData.title,
                    summary: summaryData.newSummary || summaryData.summary
                }
            }
        })
    },
    setCareerContact: (contact: UpdateContactRequestType) => {
        const currentData = get().data;
        if (!currentData) return;
        set({
            data: {
                ...currentData,
                contactTitle: contact.title,
                phoneNumber: contact.phoneNumber,
                address: contact.location,
                website: contact.website,
                websiteLink: contact.websiteLink
            }
        });
    }
}));