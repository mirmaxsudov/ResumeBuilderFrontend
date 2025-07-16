"use client";

import {useEffect, useState} from "react";
import {useAppSelector} from "@/hooks/hooks";
import {
    Table, TableHeader, TableBody, TableRow, TableHead, TableCell
} from "@/components/dashboard/ui/table";
import {Button} from "@/components/dashboard/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/dashboard/ui/dialog";
import {BecomeHrChatAdminPreview} from "@/types/hr/BecomeHrType";
import {getBecomeHrChatsAdmin} from "@/api/requests/hr/become-hr.api";
import AdminChatBecomeHr from "@/components/become-hr/AdminChatBecomeHr";

export default function HrChatsPage() {
    const [chats, setChats] = useState<BecomeHrChatAdminPreview[]>([]);
    const [loading, setLoading] = useState(false);

    // Which description to show in the “full-text” modal
    const [descModalOpen, setDescModalOpen] = useState(false);
    const [descModalText, setDescModalText] = useState("");

    // Which chat to open in the chat modal
    const [chatModalOpen, setChatModalOpen] = useState(false);
    const [activeChatId, setActiveChatId] = useState<number | null>(null);

    const user = useAppSelector((s) => s.auth.user);

    useEffect(() => {
        setLoading(true);
        getBecomeHrChatsAdmin()
            .then((res) => setChats(res.data.chats))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleOpenDescription = (full: string) => {
        setDescModalText(full);
        setDescModalOpen(true);
    };

    const handleOpenChat = (chatId: number) => {
        setActiveChatId(chatId);
        setChatModalOpen(true);
    };

    if (!user) return null;

    return (
        <section className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Pending HR Requests</h1>
            {loading ? (
                <p>Loading…</p>
            ) : (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">#</TableHead>
                                <TableHead>First Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead className="w-24">Action</TableHead>
                                <TableHead className="w-12">Make a HR</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {chats.map((c, i) => (
                                <TableRow key={c.chatId} className="hover:bg-gray-50">
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{c.firstname}</TableCell>
                                    <TableCell>
                                        {c.description.length > 100
                                            ? (
                                                <>
                                                    {c.description.slice(0, 100)}…
                                                    <button
                                                        className="ml-2 text-blue-600 hover:underline"
                                                        onClick={() => handleOpenDescription(c.description)}
                                                    >
                                                        read more
                                                    </button>
                                                </>
                                            )
                                            : c.description
                                        }
                                    </TableCell>
                                    <TableCell>{c.companyName}</TableCell>
                                    <TableCell>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleOpenChat(c.chatId)}
                                        >
                                            Chat
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => alert("Soon... this feature is not implemented yet")}
                                        >
                                            Make HR
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {chats.length === 0 && (
                        <p className="mt-4 text-gray-500">No pending requests.</p>
                    )}
                </div>
            )}

            {/* —— Full‐text description modal —— */}
            <Dialog open={descModalOpen} onOpenChange={setDescModalOpen}>
                <DialogContent className="sm:max-w-lg bg-white">
                    <DialogHeader>
                        <DialogTitle>Description</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="whitespace-pre-wrap">
                        {descModalText}
                    </DialogDescription>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDescModalOpen(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* —— ChatWindow modal —— */}
            <Dialog open={chatModalOpen} onOpenChange={setChatModalOpen}>
                <DialogContent className="w-full max-w-2xl h-[80vh] bg-white p-0">
                    <DialogHeader>
                        <DialogTitle>Chat with HR # {activeChatId}</DialogTitle>
                    </DialogHeader>
                    {activeChatId != null && (
                        <div className="h-[calc(80vh-5rem)]">
                            <AdminChatBecomeHr params={{
                                chatId: activeChatId
                            }}/>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}