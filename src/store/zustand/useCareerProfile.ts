import { create } from "zustand";
import { CareerProfileResponseType, UpdateContactRequestType } from "@/types/careerProfile/CareerProfileType";
import { ImageAttachmentResponse } from "@/types/attachment/ImageAttachmentType";

interface CareerProfileStore {
    data: CareerProfileResponseType;
    setCareer: (career: CareerProfileResponseType) => void;
    setCareerContact: (contact: UpdateContactRequestType) => void;
    setSummary: (summary: { newSummary: string, title: string }) => void;
    setProfileImage: (image: ImageAttachmentResponse) => void;
}

export const useCareerProfile = create<CareerProfileStore>((set, get) => ({
    data: {} as CareerProfileResponseType,
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
    setSummary: (summaryData: { newSummary: string, title: string }) => {
        const currentData = get().data;
        if (!currentData)
            return;

        set({
            data: {
                ...currentData,
                summary: {
                    ...currentData.summary,
                    title: summaryData.title,
                    summary: summaryData.newSummary
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