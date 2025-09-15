import { ContactSubjectEnum } from "@/enums/ContactSubjectEnum"

type ContactRequestType = {
    firstname: string,
    lastname: string,
    email: string,
    subject: ContactSubjectEnum | string,
    message: string
}

type ContactResponseType = {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    subject: ContactSubjectEnum,
    message: string,
    createdAt: string
}

type ContactMessageResponse = {
    id: number,
    sentAt: string,
    message: string,
    userId: number,
    firstname: string,
    email: string
}

export type { ContactRequestType, ContactResponseType, ContactMessageResponse }; 