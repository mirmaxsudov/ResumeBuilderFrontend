"use client";

import React, { useMemo, useState } from "react";
import { Button, Card, Input, Select, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ContactSubjectEnum } from "@/enums/ContactSubjectEnum";
import { ContactResponseType } from "@/types/support/contactType";
import { useRouter } from "next/navigation";
import { useSupportContacts } from "@/hooks/query/support/useSupportContacts";
import { useDebounce } from "@/hooks/useDebounce";

const subjectOptions = [
  { label: "All Subjects", value: "ALL" },
  { label: "General Inquiry", value: ContactSubjectEnum.GENERAL_INQUIRY },
  { label: "Feature Request", value: ContactSubjectEnum.FEATURE_REQUEST },
  { label: "Technical Support", value: ContactSubjectEnum.TECHNICAL_SUPPORT },
];

export default function WebSupportPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState<string>("ALL");
  const debouncedQuery = useDebounce(query, 400);

  const { data, isLoading, isFetching } = useSupportContacts(
    page - 1,
    size,
    debouncedQuery,
    search
  );

  const columns: ColumnsType<ContactResponseType> = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 80,
        render: (id: number) => <span className="text-foreground/80">#{id}</span>,
      },
      {
        title: "Name",
        key: "name",
        render: (_, r) => (
          <span className="font-medium">{r.firstname} {r.lastname}</span>
        ),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        responsive: ["md"],
      },
      {
        title: "Subject",
        dataIndex: "subject",
        key: "subject",
        render: (s: ContactSubjectEnum) => {
          const map: Record<string, { color: string; text: string }> = {
            [ContactSubjectEnum.GENERAL_INQUIRY]: { color: "blue", text: "General Inquiry" },
            [ContactSubjectEnum.FEATURE_REQUEST]: { color: "purple", text: "Feature Request" },
            [ContactSubjectEnum.TECHNICAL_SUPPORT]: { color: "orange", text: "Technical Support" },
          };
          const v = map[s] || { color: "default", text: s };
          return <Tag color={v.color}>{v.text}</Tag>;
        },
      },
      {
        title: "Message",
        dataIndex: "message",
        key: "message",
        ellipsis: true,
        render: (m: string) => (
          <span className="text-foreground/70 line-clamp-1" title={m}>
            {m}
          </span>
        ),
      },
      {
        title: "Created",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 180,
        responsive: ["lg"],
        render: (d: string) => new Date(d).toLocaleString(),
      },
      {
        title: "Action",
        key: "action",
        width: 120,
        render: (_, r) => (
          <Button type="primary" onClick={() => router.push(`/dashboard/web-support/${r.id}`)}>
            Open
          </Button>
        ),
      },
    ],
    [router]
  );

  const total = data?.total ?? 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Typography.Title level={3} className="!mb-0">
          Web Support
        </Typography.Title>
      </div>

      <Card className="bg-card">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
          <div className="flex gap-2 w-full md:w-auto">
            <Input.Search
              allowClear
              placeholder="Search by name, email or message"
              className="w-full md:w-[340px]"
              value={query}
              onChange={(e) => {
                setPage(1);
                setQuery(e.target.value);
              }}
            />
            <Select
              className="w-full md:w-[220px]"
              options={subjectOptions}
              value={search}
              onChange={(v) => {
                setPage(1);
                setSearch(v);
              }}
            />
          </div>
        </div>

        <Table<ContactResponseType>
          loading={isLoading || isFetching}
          rowKey={(r) => r.id}
          columns={columns}
          dataSource={data?.data || []}
          pagination={{
            current: page,
            pageSize: size,
            total: total,
            showSizeChanger: true,
            onChange: (p, s) => {
              setPage(p);
              setSize(s);
            },
          }}
        />
      </Card>
    </div>
  );
}
