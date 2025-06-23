import { create } from "zustand";
import { CareerProfileResponseType, UpdateContactRequestType } from "@/types/careerProfile/CareerProfileType";

interface CareerProfileStore {
    data: CareerProfileResponseType;
    setCareerContact: (contact: UpdateContactRequestType) => void;
    setCareer: (career: CareerProfileResponseType) => void;
    setSummary: (summary: { newSummary: string, title: string }) => void;
}

export const useCareerProfile = create<CareerProfileStore>((set, get) => ({
    data: {} as CareerProfileResponseType,
    setCareer: (career: CareerProfileResponseType) => {
        set({ data: career });
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