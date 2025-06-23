import { create } from "zustand";
import { CareerProfileResponseType, UpdateContactRequestType } from "@/types/careerProfile/CareerProfileType";

interface CareerProfileStore {
    data: CareerProfileResponseType | null;
    setCareerContact: (contact: UpdateContactRequestType) => void;
    setCareer: (career: CareerProfileResponseType) => void;
}

export const useCareerProfile = create<CareerProfileStore>((set, get) => ({
    data: null,
    setCareer: (career: CareerProfileResponseType) => {
        set({ data: career });
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