export type BecomeHrResponse = {
    id: number,
    chatId: number,
    companyName: string,
    description: string
}

export type BecomeHrMessageResponse = {
    id: number,
    chatId: number,
    senderId: number,
    senderName: string,
    text: string,
    attachments: [
        {
            id: number
        }
    ],
    createdAt: string
}