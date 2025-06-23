import { AttachmentEnum } from "@/enums/AttachmentEnum"

export type ImageAttachmentResponse = {
    id: number,
    url: string,
    downloadUrl: string,
    extension: string,
    type: AttachmentEnum,
    width: number,
    height: number
}