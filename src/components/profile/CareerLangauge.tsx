"use client";

import { Eye, Edit, MoreVertical, GripVertical, Trash2 } from "lucide-react";
import { Button } from "../dashboard/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../dashboard/ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useMyNotice from "@/hooks/useMyNotice";
import { NoticeEnum } from "@/enums/NoticeEnum";
import { Dialog, DialogDescription, DialogHeader, DialogContent, DialogTitle, DialogFooter } from "../dashboard/ui/dialog";
import { Input } from "../dashboard/ui/input";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "../dashboard/ui/select";
import { useCareerProfile } from "@/store/zustand/useCareerProfile";
import { updateLanguages } from "@/api/requests/profile/profile.api";

type LanguageItem = {
    id: number | null;
    key: string;
    priority: number;
    level: string;
    title: string;
};

type LanguageResponseItem = {
    id: number;
    priority: number;
    level: number;
    name: string;
};

type LanguageResponseType = {
    title: string;
    items?: LanguageResponseItem[];
};

export default function CareerLanguage() {
    const data = useCareerProfile((s) => s.data)!;
    const setLanguageStore = useCareerProfile((s) => s.setLangauges);
    const { contextHolder, showMessage } = useMyNotice();

    const [title, setTitle] = useState<string>(data.language?.title || "");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const titleRef = useRef<HTMLInputElement>(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);

    const [editItems, setEditItems] = useState<LanguageItem[]>([]);

    // focus title input
    useEffect(() => {
        if (isEditingTitle && titleRef.current) titleRef.current.focus();
    }, [isEditingTitle]);

    // initialize title & items when data changes
    useEffect(() => {
        if (data.language) {
            setTitle(data.language.title);
            setEditItems(
                (data.language.items || []).map((item) => ({
                    id: item.id,
                    key: item.id != null ? String(item.id) : crypto.randomUUID(),
                    priority: item.priority,
                    level: mapLevelNumToStr(item.level),
                    title: item.name,
                }))
            );
        }
    }, [data.language]);

    const save = async () => {
        setSaveLoading(true);
        try {
            const payload = {
                title: title.trim() || data.language!.title,
                items: editItems.map((it) => ({
                    id: it.id ?? undefined,
                    priority: it.priority,
                    level: mapLevelStrToNum(it.level),
                    title: it.title,
                })),
            };
            const res = await updateLanguages(data.id, payload);
            setLanguageStore(res.data);
            setTitle(res.data.title);
            showMessage(res.message, NoticeEnum.SUCCESS);
        } catch {
            showMessage("Something went wrong", NoticeEnum.ERROR);
        } finally {
            setSaveLoading(false);
        }
    };

    const handleTitleSave = async () => {
        if (!title.trim()) {
            showMessage("Title cannot be empty", NoticeEnum.ERROR);
            setTitle(data.language!.title);
        } else {
            setIsEditingTitle(false);
            await save();
        }
    };

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (over && active.id !== over.id) {
            setEditItems((items) => {
                const oldIndex = items.findIndex((i) => i.key === active.id);
                const newIndex = items.findIndex((i) => i.key === over.id);
                return arrayMove(items, oldIndex, newIndex).map((it, idx) => ({
                    ...it,
                    priority: idx + 1,
                }));
            });
        }
    };

    const sensors = useSensors(useSensor(PointerSensor));

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                {isEditingTitle ? (
                    <input
                        ref={titleRef}
                        className="border rounded-lg py-1 px-3 text-sm"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleTitleSave}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleTitleSave();
                            if (e.key === "Escape") setIsEditingTitle(false);
                        }}
                    />
                ) : (
                    <h2
                        className="text-lg font-semibold cursor-pointer"
                        onClick={() => setIsEditingTitle(true)}
                    >
                        {title}
                    </h2>
                )}

                <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditModalOpen(true);
                                setIsDropdownOpen(false);
                            }}
                        >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation();
                                showMessage("Select soon", NoticeEnum.INFO);
                                setIsDropdownOpen(false);
                            }}
                        >
                            <Eye className="mr-2 h-4 w-4" /> Select
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Display */}
            <div className="space-y-3">
                {data.language?.items?.map((lang) => (
                    <div key={lang.id} className="">
                        <div className="flex justify-between">
                            <span>{lang.name}</span>
                            <span className="text-sm text-gray-500">
                                {mapLevelNumToStr(lang.level)}
                            </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                            <div
                                className="h-2 bg-blue-600 rounded-full"
                                style={{ width: `${lang.level}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            <Dialog
                open={isEditModalOpen}
                onOpenChange={(open) => {
                    setIsEditModalOpen(open);
                    if (!open) setIsDropdownOpen(false);
                }}
            >
                <DialogContent className="bg-white w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Languages</DialogTitle>
                        <DialogDescription>
                            Drag to reorder, edit name/level, delete, or add.
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        className="space-y-4 max-h-[500px] overflow-y-auto"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setIsEditModalOpen(false);
                            await save();
                        }}
                    >
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={editItems.map((i) => i.key)}
                                strategy={verticalListSortingStrategy}
                            >
                                {editItems.map((item, idx) => (
                                    <SortableLanguageItem
                                        key={item.key}
                                        item={item}
                                        idx={idx}
                                        onChange={(ni) =>
                                            setEditItems((arr) =>
                                                arr.map((x) => (x.key === item.key ? ni : x))
                                            )
                                        }
                                        onDelete={() =>
                                            setEditItems((arr) =>
                                                arr.filter((x) => x.key !== item.key).map((x, i) => ({
                                                    ...x,
                                                    priority: i + 1,
                                                }))
                                            )
                                        }
                                        autoFocus={item.title === "" && idx === editItems.length - 1}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>

                        <Button
                            type="button"
                            variant="secondary"
                            className="w-full"
                            onClick={() =>
                                setEditItems((arr) => [
                                    ...arr,
                                    {
                                        id: null,
                                        key: crypto.randomUUID(),
                                        priority: arr.length + 1,
                                        level: "A1",
                                        title: "",
                                    },
                                ])
                            }
                        >
                            + Add Language
                        </Button>

                        <DialogFooter className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={saveLoading}>
                                {saveLoading ? "Saving..." : "Save"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {contextHolder}
        </div>
    );
}

// Sortable item sub‐component
function SortableLanguageItem({
    item,
    idx,
    onChange,
    onDelete,
    autoFocus,
}: {
    item: LanguageItem;
    idx: number;
    onChange: (it: LanguageItem) => void;
    onDelete: () => void;
    autoFocus?: boolean;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.key,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (autoFocus && inputRef.current) inputRef.current.focus();
    }, [autoFocus]);

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 mb-2 shadow-sm"
        >
            <div {...attributes} {...listeners} className="cursor-grab">
                <GripVertical className="w-5 h-5 text-gray-400" />
            </div>

            <Input
                ref={inputRef}
                value={item.title}
                onChange={(e) => onChange({ ...item, title: e.target.value })}
                placeholder="Language name"
                className="w-40"
            />

            <Select
                value={item.level}
                onValueChange={(val) => onChange({ ...item, level: val })}
            >
                <SelectTrigger className="w-56">
                    <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                    {[
                        "NATIVE_SPEAKER",
                        "HIGHLY_PROFICIENT",
                        "VERY_GOOD_COMMAND",
                        "GOOD_WORKING_KNOWLEDGE",
                        "WORKING_KNOWLEDGE",
                        "A1",
                        "A2",
                        "B1",
                        "B2",
                        "C1",
                        "C2",
                    ].map((lvl) => (
                        <SelectItem key={lvl} value={lvl}>
                            {lvl.replace(/_/g, " ")}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <button onClick={onDelete} className="ml-auto text-red-500">
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );
}

// Helpers to map levels
function mapLevelNumToStr(level: number): string {
    switch (level) {
        case 100: return "NATIVE_SPEAKER";
        case 80: return "HIGHLY_PROFICIENT";
        case 60: return "VERY_GOOD_COMMAND";
        case 40: return "GOOD_WORKING_KNOWLEDGE";
        case 20: return "WORKING_KNOWLEDGE";
        case 1: return "A1";
        case 29: return "A2";
        case 49: return "B1";
        case 59: return "B2";
        case 89: return "C1";
        case 99: return "C2";
        default: return "A1";
    }
}
function mapLevelStrToNum(level: string): number {
    switch (level) {
        case "NATIVE_SPEAKER": return 100;
        case "HIGHLY_PROFICIENT": return 80;
        case "VERY_GOOD_COMMAND": return 60;
        case "GOOD_WORKING_KNOWLEDGE": return 40;
        case "WORKING_KNOWLEDGE": return 20;
        case "A1": return 1;
        case "A2": return 29;
        case "B1": return 49;
        case "B2": return 59;
        case "C1": return 89;
        case "C2": return 99;
        default: return 1;
    }
}