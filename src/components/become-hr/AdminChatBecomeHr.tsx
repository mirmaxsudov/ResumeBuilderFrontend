import {useEffect, useRef, useState} from "react";
import {BecomeHrMessageResponse} from "@/types/hr/BecomeHrType";
import {useAppSelector} from "@/hooks/hooks";
import {Client, IMessage, StompSubscription} from "@stomp/stompjs";
import {getChatMessages} from "@/api/requests/hr/become-hr.api";
import SockJS from "sockjs-client";
import {uploadFiles} from "@/api/requests/file/file.api";
import ChatWindow from "@/components/become-hr/ChatWindow";

type AdminChatBecomeHrProps = {
    params: { chatId: number }
}

export default function AdminChatBecomeHr({params}: AdminChatBecomeHrProps) {
    const {chatId} = params;
    const [messages, setMessages] = useState<BecomeHrMessageResponse[]>([]);
    const user = useAppSelector(state => state.auth.user);
    const clientRef = useRef<Client | null>(null);
    const subscriptionRef = useRef<StompSubscription | null>(null);

    useEffect(() => {
        getChatMessages(chatId)
            .then(res => setMessages(res.data))
            .catch(console.error);
    }, [chatId]);

    useEffect(() => {
        if (!user)
            return;

        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8008/ws"),
            connectHeaders: {
                token: user.accessToken
            },
            debug: (str) => {
                console.log("[STOMP]", str)
            },
            onConnect: () => {
                console.log("Connected to STOMP broker");

                const sub = client.subscribe(
                    '/topic/chat/' + chatId,
                    (message: IMessage) => {
                        const body = JSON.parse(message.body) as BecomeHrMessageResponse;
                        setMessages(prev => [...prev, body]);
                    }
                )
                subscriptionRef.current = sub;
            },
            onStompError: frame => {
                console.error("STOMP error", frame);
            }
        });

        client.activate();
        clientRef.current = client;

        return () => {
            subscriptionRef.current?.unsubscribe();
            client.deactivate();
            clientRef.current = null;
        }
    }, [chatId, user]);

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

        clientRef.current?.publish({
            destination: "/app/chat.sendMessage",
            body: JSON.stringify(payload)
        });
    }

    if (!user)
        return null;

    return (<>
        <ChatWindow
            currentUserId={user.userId}
            messages={messages}
            onSend={handleSend}/>
    </>);
}