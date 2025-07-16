"use client";

import {useEffect, useRef, useState} from "react";
import {useAppSelector} from "@/hooks/hooks";
import {Client, IMessage, StompSubscription} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {BecomeHrMessageResponse} from "@/types/hr/BecomeHrType";
import {getChatMessages} from "@/api/requests/hr/become-hr.api";
import {uploadFiles} from "@/api/requests/file/file.api";
import ChatWindow from "@/components/become-hr/ChatWindow";

type ChatBecomeHrProps = {
    params: { chatId: number };
};

export default function ChatBecomeHr({params}: ChatBecomeHrProps) {
    const {chatId} = params;
    const [messages, setMessages] = useState<BecomeHrMessageResponse[]>([]);
    const user = useAppSelector((s) => s.auth.user);
    const clientRef = useRef<Client | null>(null);
    const subscriptionRef = useRef<StompSubscription | null>(null);

    // 1) fetch initial history
    useEffect(() => {
        getChatMessages(chatId)
            .then((res) => setMessages(res.data))
            .catch(console.error);
    }, [chatId]);

    // 2) connect stomp once user is known
    useEffect(() => {
        if (!user) return;

        console.log("Connecting to STOMP broker...");

        const client = new Client({
            // Use SockJS on /ws endpoint
            webSocketFactory: () => new SockJS("http://localhost:8008/ws"),
            connectHeaders: {
                token: user.accessToken,
            },
            debug: (str) => {
                console.log("[STOMP]", str);
            },
            onConnect: () => {
                console.log("Connected to STOMP broker");
                // subscribe to chat room topic
                const sub = client.subscribe(
                    `/topic/chat/${chatId}`,
                    (message: IMessage) => {
                        const body = JSON.parse(message.body) as BecomeHrMessageResponse;
                        setMessages((prev) => [...prev, body]);
                    }
                );
                subscriptionRef.current = sub;

                // optionally subscribe to admin notifications
                client.subscribe("/topic/admins", (msg) => {
                    console.log("admin notification:", msg.body);
                });
            },
            onStompError: (frame) => {
                console.error("Broker error", frame);
            },
        });

        client.activate();
        clientRef.current = client;

        return () => {
            // cleanup on unmount or chatId/user change
            subscriptionRef.current?.unsubscribe();
            client.deactivate();
            clientRef.current = null;
        };
    }, [chatId, user]);

    // 3) send handler: upload then publish
    const handleSend = async (text: string, files: File[]) => {
        let attachments: number[] = [];
        if (files.length) {
            try {
                attachments = await uploadFiles(files);
            } catch (e) {
                console.error("upload failed", e);
            }
        }

        const payload = {
            chatId,
            senderId: user!.userId,
            text,
            attachments,
        };

        clientRef.current?.publish({
            destination: "/app/chat.sendMessage",
            body: JSON.stringify(payload),
        });
    };

    if (!user) return null;

    return (
        <ChatWindow
            currentUserId={user.userId}
            messages={messages}
            onSend={handleSend}
        />
    );
}