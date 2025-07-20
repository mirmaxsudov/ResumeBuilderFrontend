import CoverLetterEnum from "@/enums/CoverLetterEnum";

interface CoverLetterResponseType {
    id: number | null,
    title: string,
    firstname: string,
    lastname: string,
    address: string,
    jobTitle: string,
    email: string,
    phoneNumber: string,
    companyName: string,
    managerName: string,
    letterDetails: string,
    type: CoverLetterEnum
}

export type {CoverLetterResponseType};