"use client";

import React, {useRef, useState, ChangeEvent, KeyboardEvent, useEffect} from "react";
import {PaperclipIcon} from "lucide-react";
import {Button} from "@/components/dashboard/ui/button";
import {BecomeHrMessageResponse} from "@/types/hr/BecomeHrType";

export type Attachment = {
    id: number;
};

type ChatWindowProps = {
    currentUserId: number;
    messages: BecomeHrMessageResponse[];
    onSend: (text: string, files: File[]) => void;
};

export default function ChatWindow(
    {
        currentUserId,
        messages,
        onSend,
    }: ChatWindowProps) {
    const [draft, setDraft] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const fileInput = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({top: scrollRef.current.scrollHeight, behavior: "smooth"});
    }, [messages]);

    const handleSend = () => {
        if (draft.trim() || files.length) {
            onSend(draft.trim(), files);
            setDraft("");
            setFiles([]);
        }
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    return (
        <div className="flex flex-col h-full bg-white border rounded-lg">
            {/* Messages */}
            <div ref={scrollRef}
                 className="flex-1 overflow-y-auto p-4 space-y-4 overflow-x-scroll scrollbar-hide max-h-[430px]">
                {messages.map((m) => {
                    const isMe = m.senderId === currentUserId;
                    return (
                        <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`max-w-[60%] space-y-2 ${
                                    isMe
                                        ? "bg-blue-500 text-white rounded-bl-2xl rounded-tl-2xl rounded-tr-xl"
                                        : "bg-gray-100 text-gray-900 rounded-br-2xl rounded-tr-2xl rounded-tl-xl"
                                } p-3`}
                            >
                                {/* Text */}
                                {m.text && <p className="whitespace-pre-wrap break-all">{m.text}</p>}

                                {/* Attachments */}
                                {m.attachments?.map((att) => {
                                    return (
                                        <div key={att.id} className="mt-2">
                                            {/*{isImage ? (*/}
                                            {/*    <img*/}
                                            {/*        src={att.url}*/}
                                            {/*        alt={att.name}*/}
                                            {/*        className="max-h-48 rounded-md object-cover"*/}
                                            {/*    />*/}
                                            {/*) : (*/}
                                            <a
                                                href={"http://localhost:8008/api/v1/attachment/download/" + att.id}
                                                download
                                                className="flex items-center space-x-2 bg-gray-200 p-2 rounded hover:bg-gray-300"
                                            >
                                                <PaperclipIcon className="h-5 w-5 text-gray-600"/>
                                                <span className="truncate">{"File"}</span>
                                            </a>
                                            {/*)}*/}
                                        </div>
                                    );
                                })}

                                {/* Timestamp */}
                                <div className="text-xs opacity-70 text-right">
                                    {new Date(m.createdAt).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input bar */}
            <div className="border-t p-3 flex items-center space-x-2">
                {/* File picker */}
                <button
                    onClick={() => fileInput.current?.click()}
                    className="p-2 rounded hover:bg-gray-100"
                    title="Attach files"
                >
                    <PaperclipIcon className="h-5 w-5 text-gray-600"/>
                </button>
                <input
                    type="file"
                    multiple
                    ref={fileInput}
                    className="hidden"
                    onChange={onFileChange}
                />

                {/* Preview selected files */}
                {files.length > 0 && (
                    <div className="flex space-x-1 overflow-x-auto">
                        {files.map((f) => (
                            <div
                                key={f.name + f.size}
                                className="relative w-10 h-10 bg-gray-100 rounded-md overflow-hidden"
                            >
                                {f.type.startsWith("image/") ? (
                                    <img
                                        src={URL.createObjectURL(f)}
                                        alt={f.name}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <FileIcon/>
                                    </div>
                                )}
                                <button
                                    onClick={() =>
                                        setFiles((prev) => prev.filter((x) => x !== f))
                                    }
                                    className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow"
                                    title="Remove"
                                >
                                    {/*<XMarkIcon className="h-4 w-4 text-gray-600"/>*/}
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Textarea */}
                <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Type a message…"
                    className="flex-1 resize-none border rounded-md py-2 px-3 focus:outline-none focus:ring"
                    rows={1}
                />

                {/* Send */}
                <Button
                    onClick={handleSend}
                    disabled={!draft.trim() && files.length === 0}
                    className="whitespace-nowrap"
                >
                    Send
                </Button>
            </div>
        </div>
    );
}

// simple generic file icon
function FileIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M7 16v-4a1 1 0 011-1h3m10 5h-3m-2 0H8m11-5.5V4a1 1 0 00-1-1H5a1 1 0 00-1 1v16a1 1 0 001 1h6m6 0h3m-3 0V11.5z"/>
        </svg>
    );
}