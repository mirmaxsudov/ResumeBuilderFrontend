"use client";

import React, { useMemo, useRef, useState } from "react";
import { Button, Card, Empty, Input, Pagination, Space, Typography } from "antd";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useAnswerContact, useContactMessages } from "@/hooks/query/support/useSupportContacts";
import useMyNotice from "@/hooks/useMyNotice";
import { NoticeEnum } from "@/enums/NoticeEnum";

export default function ContactConversationPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const contactId = Number(params?.id);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [message, setMessage] = useState("");
  const { showMessage } = useMyNotice();

  const { data, isLoading, isFetching } = useContactMessages(contactId, page - 1, size);
  const { mutateAsync, isPending } = useAnswerContact(contactId);

  const total = data?.total ?? 0;

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    try {
      await mutateAsync(trimmed);
      setMessage("");
      showMessage("Message sent", NoticeEnum.SUCCESS, 2500);
    } catch (e: any) {
      showMessage(e?.response?.data?.message || "Failed to send", NoticeEnum.ERROR, 3000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button onClick={() => router.push("/dashboard/web-support")} icon={<ArrowLeft size={16} />}>
          Back
        </Button>
        <Typography.Title level={4} className="!mb-0">
          Contact #{contactId}
        </Typography.Title>
      </div>

      <Card className="bg-card">
        <div className="flex flex-col gap-4">
          <div className="flex-1 min-h-[360px] max-h-[60vh] overflow-auto rounded-md border border-border p-4 bg-background">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center text-foreground/60">
                Loading messages...
              </div>
            ) : (data?.data?.length ?? 0) === 0 ? (
              <Empty description="No messages yet" />
            ) : (
              <ul className="space-y-3">
                {data?.data?.map((m) => (
                  <li key={m.id} className="">
                    <div className="rounded-md bg-card/60 border border-border p-3">
                      <div className="flex items-center justify-between text-xs text-foreground/60 mb-1">
                        <span>
                          {m.firstname} • {m.email}
                        </span>
                        <span>{new Date(m.sentAt).toLocaleString()}</span>
                      </div>
                      <div className="whitespace-pre-wrap text-foreground">{m.message}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Pagination
              size="small"
              current={page}
              onChange={(p, s) => {
                setPage(p);
                setSize(s);
              }}
              total={total}
              pageSize={size}
              showSizeChanger
            />
            <span className="text-xs text-foreground/60">{isFetching ? "Updating..." : ""}</span>
          </div>

          <div className="flex flex-col gap-2">
            <Input.TextArea
              autoSize={{ minRows: 3, maxRows: 6 }}
              placeholder="Type your answer..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <div className="flex justify-end">
              <Button type="primary" onClick={handleSend} loading={isPending} disabled={!message.trim()}>
                Send Answer
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
