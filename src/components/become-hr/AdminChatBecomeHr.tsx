import {useEffect, useRef, useState} from "react";
import {BecomeHrMessageResponse} from "@/types/hr/BecomeHrType";
import {useAppSelector} from "@/hooks/hooks";
import { IMessage, StompSubscription } from "@stomp/stompjs";
import {getChatMessages} from "@/api/requests/hr/become-hr.api";
import {uploadFiles} from "@/api/requests/file/file.api";
import ChatWindow from "@/components/become-hr/ChatWindow";
import { useStomp } from "@/components/providers/StompProvider";

type AdminChatBecomeHrProps = {
    params: { chatId: number }
}

export default function AdminChatBecomeHr({params}: AdminChatBecomeHrProps) {
    const {chatId} = params;
    const [messages, setMessages] = useState<BecomeHrMessageResponse[]>([]);
    const user = useAppSelector(state => state.auth.user);
    const { connected, subscribe, unsubscribe, publish } = useStomp();
    const subscriptionRef = useRef<StompSubscription | null>(null);

    useEffect(() => {
        getChatMessages(chatId)
            .then(res => setMessages(res.data))
            .catch(console.error);
    }, [chatId]);

    useEffect(() => {
        if (!user?.accessToken || !connected) return;
        const sub = subscribe(`/topic/chat/${chatId}`, (message: IMessage) => {
            const body = JSON.parse(message.body) as BecomeHrMessageResponse;
            setMessages(prev => [...prev, body]);
        });
        subscriptionRef.current = sub;
        return () => {
            unsubscribe(subscriptionRef.current);
            subscriptionRef.current = null;
        };
    }, [chatId, user?.accessToken, connected, subscribe, unsubscribe]);

    const handleSend = async (text: string, files: File[]) => {
        let attachments: number[] = [];
        if (files.length) {
            try {
                const response = await uploadFiles(files);
                attachments = response.data;
            } catch (e) {
                console.error("upload failed", e);
            }
        }

        const payload = {
            chatId,
            senderId: user!.userId,
            text,
            attachments: attachments.map(id => ({id})),
        };

        publish("/app/chat.sendMessage", JSON.stringify(payload));
    }

    if (!user || !user.accessToken)
        return null;

    return (<>
        <ChatWindow
            currentUserId={user.userId}
            messages={messages}
            onSend={handleSend}/>
    </>);
}
