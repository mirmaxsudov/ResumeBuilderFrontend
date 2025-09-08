"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/dashboard/ui/input";
import { Button } from "@/components/dashboard/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dashboard/ui/dropdown-menu";
import { Separator } from "@/components/dashboard/ui/separator";
import { Modal, Pagination } from "antd";
import { CoverLetterResponseType } from "@/types/coverLetter/CoverLetterType";
import CoverLetterApi from "@/api/requests/cover-letter/coverLetterApi";
import useMyNotice from "@/hooks/useMyNotice";
import { NoticeEnum } from "@/enums/NoticeEnum";
import { Download, Eye, FilePlus2, MoreHorizontal, Pencil, RefreshCw, Search, Trash2, ArrowLeft } from "lucide-react";
import CoverLetterN1 from "@/@CoverLetter/components/CoverLetterN1";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SortKey = "titleAsc" | "titleDesc";

const PAGE_SIZE_OPTIONS = [5, 8, 11];

const CoverLetterPage = () => {
    const { showMessage } = useMyNotice();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<CoverLetterResponseType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(8);
    const [total, setTotal] = useState<number>(0);
    const [search, setSearch] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");
    const [sort, setSort] = useState<SortKey>("titleAsc");

    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewItem, setPreviewItem] = useState<CoverLetterResponseType | null>(null);
    const printRef = useRef<HTMLDivElement>(null);

    const debouncedSearch = useDebounce(searchInput, 400);

    useEffect(() => {
        setSearch(debouncedSearch);
        setPage(1);
    }, [debouncedSearch]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await CoverLetterApi.getAll(size, page - 1, search);
                setItems(res.data.coverLetters || []);
                setTotal(res.data.total || 0);
            } catch (e: any) {
                showMessage(e?.response?.data?.message || "Failed to load cover letters", NoticeEnum.ERROR);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page, size, search]);

    const sortedItems = useMemo(() => {
        const clone = [...items];
        if (sort === "titleAsc") clone.sort((a, b) => a.title.localeCompare(b.title));
        if (sort === "titleDesc") clone.sort((a, b) => b.title.localeCompare(a.title));
        return clone;
    }, [items, sort]);

    const onDelete = async (id: number | null) => {
        if (id == null) return;
        Modal.confirm({
            title: "Delete cover letter",
            content: "Are you sure you want to delete this cover letter?",
            okText: "Delete",
            okButtonProps: { danger: true },
            onOk: async () => {
                try {
                    const res = await CoverLetterApi.deleteById(id);
                    showMessage(res.message || "Deleted", NoticeEnum.SUCCESS);
                    const refreshed = await CoverLetterApi.getAll(size, page - 1, search);
                    setItems(refreshed.data.coverLetters || []);
                    setTotal(refreshed.data.total || 0);
                } catch (e: any) {
                    showMessage(e?.response?.data?.message || "Delete failed", NoticeEnum.ERROR);
                }
            }
        });
    };

    const onDuplicate = async (item: CoverLetterResponseType) => {
        try {
            const clone: CoverLetterResponseType = {
                ...item,
                id: null,
                title: `${item.title} Copy`,
            };
            const res = await CoverLetterApi.create(clone);
            showMessage(res.message || "Duplicated", NoticeEnum.SUCCESS);
            const refreshed = await CoverLetterApi.getAll(size, page - 1, search);
            setItems(refreshed.data.coverLetters || []);
            setTotal(refreshed.data.total || 0);
        } catch (e: any) {
            showMessage(e?.response?.data?.message || "Duplicate failed", NoticeEnum.ERROR);
        }
    };

    const openPreview = (item: CoverLetterResponseType) => {
        setPreviewItem(item);
        setPreviewOpen(true);
    };

    const onDownload = () => {
        try {
            window.print();
        } catch {
            showMessage("Download failed", NoticeEnum.ERROR);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="h-8 px-3 gap-1 rounded-full btn-hover"
                        onClick={() => {
                            if (typeof window !== 'undefined' && window.history.length > 1) router.back();
                            else router.push('/dashboard');
                        }}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Back</span>
                    </Button>
                    <h1 className="text-2xl font-semibold text-gray-900">My Cover Letters</h1>
                    <span className="inline-flex items-center justify-center text-xs font-medium text-white bg-blue-600 rounded-full h-6 px-2">{total}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search by title, company, manager..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="whitespace-nowrap">Sort</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white">
                            <DropdownMenuItem className="cursor-pointer" onClick={() => setSort("titleAsc")}>Title A-Z</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => setSort("titleDesc")}>Title Z-A</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href="/cover-page/create?type=new">
                        <Button className="gap-2"><FilePlus2 className="h-4 w-4" /> New Cover Letter</Button>
                    </Link>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border rounded-xl p-4 mb-6">
                <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600">
                        <RefreshCw />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-medium text-gray-900">Keep your applications moving</h3>
                        <p className="text-sm text-gray-600">Create, preview, and manage cover letters tailored to each job post.</p>
                    </div>
                    <Link href="/cover-page/create?type=new">
                        <Button variant="outline" className="whitespace-nowrap rounded-full hover:bg-white/50 btn-hover">Create New</Button>
                    </Link>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Create New Card */}
                <Link href="/cover-page/create?type=new" className="border rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 h-full bg-white shadow-sm card-hover">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                        <FilePlus2 size={24} />
                    </div>
                    <h3 className="font-medium mb-2 text-gray-900">New Cover Letter</h3>
                    <p className="text-sm text-gray-600 text-center">Start from a clean template and customize it.</p>
                </Link>

                {/* Items */}
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="border rounded-xl bg-white shadow-sm animate-pulse h-48" />
                    ))
                ) : sortedItems.length === 0 ? (
                    <div className="col-span-full border rounded-xl bg-white shadow-sm p-8 text-center text-gray-500">
                        No cover letters found.
                    </div>
                ) : (
                    sortedItems.map((item) => (
                        <div key={item.id ?? Math.random()} className="border rounded-xl overflow-hidden bg-white shadow-sm card-hover">
                            <div className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate" title={item.title}>{item.title}</h3>
                                        <p className="text-sm text-gray-600 truncate" title={item.companyName}>{item.companyName}</p>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="p-2 rounded-md hover:bg-gray-100 text-gray-500">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="bg-white" align="end">
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => openPreview(item)}>
                                                <Eye className="h-4 w-4 mr-2" /> Preview
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => onDuplicate(item)}>
                                                <Pencil className="h-4 w-4 mr-2" /> Duplicate
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => onDelete(item.id)}>
                                                <Trash2 className="h-4 w-4 mr-2 text-red-500" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <Separator className="my-3" />
                                <div className="space-y-1 text-sm text-gray-700">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Job Title</span>
                                        <span className="font-medium truncate max-w-[60%]" title={item.jobTitle}>{item.jobTitle}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Manager</span>
                                        <span className="truncate max-w-[60%]" title={item.managerName}>{item.managerName}</span>
                                    </div>
                                </div>
                                <div className="mt-3 text-xs text-gray-500 line-clamp-2">
                                    {item.letterDetails}
                                </div>
                                <div className="mt-4 flex flex-col gap-2 justify-between">
                                    <div className="text-xs text-gray-400">Template: {item.type}</div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" className="h-8 px-3 text-xs" onClick={() => openPreview(item)}>
                                            <Eye className="h-4 w-4 mr-1" /> Preview
                                        </Button>
                                        <Button variant="outline" className="h-8 px-3 text-xs" onClick={() => onDuplicate(item)}>
                                            <Pencil className="h-4 w-4 mr-1" /> Duplicate
                                        </Button>
                                        <Button className="h-8 px-3 text-xs" onClick={onDownload}>
                                            <Download className="h-4 w-4 mr-1" /> Download
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Rows:</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="h-8 px-3 text-xs">{size}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white">
                            {PAGE_SIZE_OPTIONS.map((opt) => (
                                <DropdownMenuItem key={opt} className="cursor-pointer" onClick={() => setSize(opt)}>
                                    {opt}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Pagination
                    current={page}
                    total={total}
                    pageSize={size}
                    showSizeChanger={false}
                    onChange={p => setPage(p)}
                />
            </div>

            {/* Preview Modal */}
            <Modal
                open={previewOpen}
                onCancel={() => setPreviewOpen(false)}
                width={960}
                footer={[
                    <Button key="download" onClick={onDownload} className="gap-2"><Download className="h-4 w-4" /> Download</Button>,
                ]}
                title={previewItem?.title || "Preview"}
                className="pt-2"
            >
                <div ref={printRef} className="max-h-[70vh] overflow-auto bg-white">
                    {previewItem && <CoverLetterN1 data={previewItem} />}
                </div>
            </Modal>
        </div>
    );
};

function useDebounce<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default CoverLetterPage;

