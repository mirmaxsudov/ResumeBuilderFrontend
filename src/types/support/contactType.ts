import { ContactSubjectEnum } from "@/enums/ContactSubjectEnum"

type ContactRequestType = {
    firstname: string,
    lastname: string,
    email: string,
    subject: ContactSubjectEnum | string,
    message: string
}

export type { ContactRequestType }; 