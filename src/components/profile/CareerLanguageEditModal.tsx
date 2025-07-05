/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../dashboard/ui/button";
import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogContent,
    DialogTitle,
    DialogFooter,
} from "../dashboard/ui/dialog";
import { GripVertical, Trash2 } from "lucide-react";
import { Input } from "../dashboard/ui/input";
import {
    Select,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "../dashboard/ui/select";
import ResumeLanguageLevel from "@/enums/LanguageEnum";
import { getLanStringVal, lanLevelToNum } from "@/helpers/LanLevelToNum";

export type LanguageResponseItem = {
    id: number | null;
    name: string;
    level: number;
    priority: number;
};

type WrappedItem = {
    key: string;
    item: LanguageResponseItem;
};

interface Props {
    isEditModalOpen: boolean;
    setIsEditModalOpen: (open: boolean) => void;
    setIsDropdownOpen: (open: boolean) => void;
    saveLoading: boolean;
    editedItems: LanguageResponseItem[];
    setEditedItems: (items: LanguageResponseItem[]) => void;
    setSaveLoading: (open: boolean) => void
}

export default function CareerLanguageEditModal({
    isEditModalOpen,
    setIsEditModalOpen,
    setIsDropdownOpen,
    saveLoading,
    editedItems,
    setEditedItems,
    setSaveLoading
}: Props) {
    const [items, setItems] = useState<WrappedItem[]>(() =>
        editedItems.map((it, idx) => ({
            key: it.id !== null ? String(it.id) : `new-${idx}`,
            item: it,
        }))
    );
    
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [dragOverItem, setDragOverItem] = useState<string | null>(null);

    useEffect(() => {
        setItems(
            editedItems.map((it, idx) => ({
                key: it.id !== null ? String(it.id) : `new-${idx}`,
                item: it,
            }))
        );
    }, [editedItems]);

    const onSave = async () => {
        setEditedItems(items.map(item => {
            return item.item
        }))
        setIsDropdownOpen(false);
        setIsEditModalOpen(false);
        setSaveLoading(true);
    }

    const addNewLan = () => {
        setItems((prev) => [
            ...prev,
            {
                key: uuidv4(),
                item: {
                    id: null,
                    name: "",
                    level: ResumeLanguageLevel.A1,
                    priority: prev.length + 1,
                },
            },
        ]);
    };

    const change = (key: string, name?: string, level?: string) => {
        setItems((prev) =>
            prev.map((w) =>
                w.key !== key
                    ? w
                    : {
                        ...w,
                        item: {
                            ...w.item,
                            name: name !== undefined ? name : w.item.name,
                            level:
                                level !== undefined
                                    ? (Number.isNaN(+level) && level)
                                    : w.item.level,
                        },
                    }
            )
        );
    };

    const remove = (key: string) => {
        setItems((prev) =>
            prev
                .filter((w) => w.key !== key)
                .map((w, idx) => ({
                    ...w,
                    item: { ...w.item, priority: idx + 1 },
                }))
        );
    };

    const handleDragStart = (e: React.DragEvent, key: string) => {
        setDraggedItem(key);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent, key: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setDragOverItem(key);
    };

    const handleDragLeave = () => {
        setDragOverItem(null);
    };

    const handleDrop = (e: React.DragEvent, dropKey: string) => {
        e.preventDefault();
        if (!draggedItem || draggedItem === dropKey) {
            setDraggedItem(null);
            setDragOverItem(null);
            return;
        }

        setItems((prev) => {
            const draggedIndex = prev.findIndex(item => item.key === draggedItem);
            const dropIndex = prev.findIndex(item => item.key === dropKey);
            
            if (draggedIndex === -1 || dropIndex === -1) return prev;

            const newItems = [...prev];
            const [draggedItemData] = newItems.splice(draggedIndex, 1);
            newItems.splice(dropIndex, 0, draggedItemData);

            // Update priorities based on new order
            return newItems.map((item, idx) => ({
                ...item,
                item: { ...item.item, priority: idx + 1 }
            }));
        });

        setDraggedItem(null);
        setDragOverItem(null);
    };

    return (
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
                        Drag and drop to reorder languages, edit name/level, delete, or add new ones.
                    </DialogDescription>
                </DialogHeader>

                <form
                    className="space-y-4 max-h-[500px] overflow-y-auto"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setIsEditModalOpen(false);
                        await onSave();
                    }}
                >
                    {items.map(({ key, item }) => (
                        <div
                            key={key}
                            draggable
                            onDragStart={(e) => handleDragStart(e, key)}
                            onDragOver={(e) => handleDragOver(e, key)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, key)}
                            className={`flex items-center gap-3 bg-gray-50 rounded-lg p-3 mb-2 shadow-sm transition-all duration-200 ${
                                draggedItem === key ? 'opacity-50 scale-95' : ''
                            } ${
                                dragOverItem === key && draggedItem !== key ? 'bg-blue-100 border-2 border-blue-300' : ''
                            }`}
                        >
                            <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />

                            <Input
                                value={item.name}
                                placeholder="Language name"
                                className="w-40"
                                onChange={(e) => change(key, e.target.value, undefined)}
                            />

                            <Select
                                value={getLanStringVal(item.level)}
                                onValueChange={(val) => change(key, undefined, val)}
                            >
                                <SelectTrigger className="w-56">
                                    <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    {Object.keys(ResumeLanguageLevel).filter(val => Number.isNaN(+val)).map((lvl) => (
                                        <SelectItem className="cursor-pointer" key={lvl} value={lvl}>
                                            {lvl.replace(/_/g, " ")}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <button
                                type="button"
                                className="ml-auto text-red-500"
                                onClick={() => remove(key)}
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}

                    <Button
                        type="button"
                        variant="secondary"
                        className="w-full"
                        onClick={addNewLan}
                    >
                        + Add Language
                    </Button>

                    <DialogFooter className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={saveLoading}>
                            {saveLoading ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}