/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {Button} from "../dashboard/ui/button";
import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogContent,
    DialogTitle,
    DialogFooter,
} from "../dashboard/ui/dialog";
import {GripVertical, Trash2} from "lucide-react";
import {Input} from "../dashboard/ui/input";
import {Label} from "../dashboard/ui/label";
import {RichTextEditor} from "../resume/rich-text-editor";
import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from "../dashboard/ui/accordion";
import {EducationRequestItem} from "@/types/careerProfile/CareerProfileType";

type WrappedItem = {
    key: string;
    item: EducationRequestItem;
};

interface Props {
    isEditModalOpen: boolean;
    setIsEditModalOpen: (open: boolean) => void;
    setIsDropdownOpen: (open: boolean) => void;
    saveLoading: boolean;
    editedItems: EducationRequestItem[];
    setEditedItems: (items: EducationRequestItem[]) => void;
    setSaveLoading: (open: boolean) => void;
}

export default function EducationEditModal(
    {
        isEditModalOpen,
        setIsEditModalOpen,
        setIsDropdownOpen,
        saveLoading,
        editedItems,
        setEditedItems,
        setSaveLoading,
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
        setEditedItems(items.map(w => w.item));
        setIsDropdownOpen(false);
        setIsEditModalOpen(false);
        setSaveLoading(true);
    };

    const addNewEducation = () => {
        setItems((prev) => [
            ...prev,
            {
                key: uuidv4(),
                item: {
                    id: null,
                    title: "",
                    degree: "",
                    startDate: "",
                    endDate: "",
                    city: "",
                    description: "",
                    priority: prev.length + 1,
                    currentStudy: false,
                },
            },
        ]);
    };

    const change = (key: string, field: keyof EducationRequestItem, value: any) => {
        setItems((prev) =>
            prev.map((w) =>
                w.key !== key
                    ? w
                    : {
                        ...w,
                        item: {
                            ...w.item,
                            [field]: value,
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
                    item: {...w.item, priority: idx + 1},
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

            return newItems.map((item, idx) => ({
                ...item,
                item: {...item.item, priority: idx + 1}
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
            <DialogContent className="bg-white max-w-[1100px] max-h-[90vh] overflow-hidden flex flex-col p-0">
                <div className="sticky top-0 z-10 bg-white border-b px-6 pt-6 pb-2">
                    <DialogHeader>
                        <DialogTitle>Edit Education</DialogTitle>
                        <DialogDescription>
                            Drag to reorder, edit details, delete, or add new education entries.
                        </DialogDescription>
                    </DialogHeader>
                </div>
                <form className="flex-1 overflow-y-auto px-6" style={{maxHeight: 500}}
                      onSubmit={async (e) => {
                          e.preventDefault();
                          if (onSave) await onSave();
                      }}
                >
                    <Accordion type="multiple" className="w-full">
                        {items.map(({key, item}, idx) => (
                            <AccordionItem key={key} value={key}
                                           className={`bg-gray-50 rounded-lg mb-3 shadow-sm transition-all duration-200 ${draggedItem === key ? 'opacity-50 scale-95' : ''} ${dragOverItem === key && draggedItem !== key ? 'bg-blue-100 border-2 border-blue-300' : ''}`}
                                           draggable
                                           onDragStart={(e) => handleDragStart(e, key)}
                                           onDragOver={(e) => handleDragOver(e, key)}
                                           onDragLeave={handleDragLeave}
                                           onDrop={(e) => handleDrop(e, key)}
                            >
                                <AccordionTrigger className="flex items-center gap-3 p-4 cursor-pointer">
                                    <GripVertical className="w-5 h-5 text-gray-400 cursor-grab"/>
                                    <span className="text-sm font-medium text-gray-600 flex-1 text-left">
                                        {item.title || item.degree || `Education #${idx + 1}`}
                                    </span>
                                    <span className="text-xs text-gray-400">Priority: {item.priority}</span>
                                    <button
                                        type="button"
                                        className="ml-2 text-red-500"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            remove(key);
                                        }}
                                    >
                                        <Trash2 className="w-5 h-5"/>
                                    </button>
                                </AccordionTrigger>
                                <AccordionContent className={"p-4"}>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">School</Label>
                                            <Input
                                                value={item.title}
                                                placeholder="School"
                                                className="bg-white"
                                                onChange={(e) => change(key, "title", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">Degree</Label>
                                            <Input
                                                value={item.degree}
                                                placeholder="Degree"
                                                className="bg-white"
                                                onChange={(e) => change(key, "degree", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="space-y-2 flex flex-col">
                                            <Label className="text-sm font-medium">Start Date</Label>
                                            <input
                                                value={item.startDate}
                                                onChange={(e) => change(key, "startDate", e.target.value)}
                                                type={"datetime-local"}/>
                                        </div>
                                        <div className="space-y-2 flex flex-col">
                                            <Label className="text-sm font-medium">End Date</Label>
                                            {item.currentStudy ? (
                                                <p className={"bg-[#DCFCE7] text-[#15803D] w-fit rounded-[4px] py-1 px-3"}>
                                                    Current
                                                </p>
                                            ) : (
                                                <input
                                                    value={item.endDate}
                                                    onChange={(e) => change(key, "endDate", e.target.value)}
                                                    type={"datetime-local"}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">City</Label>
                                            <Input
                                                value={item.city}
                                                placeholder="City"
                                                className="bg-white"
                                                onChange={(e) => change(key, "city", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <Label className="text-sm font-medium">Description</Label>
                                        <RichTextEditor
                                            value={item.description}
                                            onChange={(value) => change(key, "description", value)}
                                            placeholder="e.g. Graduated with High Honors."
                                            maxLength={500}
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            className={"size-4 peer cursor-pointer rounded-4 accent-[#2563EB]"}
                                            type={"checkbox"}
                                            id={`current-edu-${key}`}
                                            checked={item.currentStudy}
                                            onChange={() => {
                                                const newVal = !item.currentStudy;
                                                change(key, "currentStudy", newVal);
                                                if (newVal) change(key, "endDate", "");
                                            }}
                                        />
                                        <Label
                                            htmlFor={`current-edu-${key}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                                        >
                                            Currently studying
                                        </Label>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    <Button
                        type="button"
                        variant="secondary"
                        className="w-full mt-4"
                        onClick={addNewEducation}
                    >
                        + Add Education
                    </Button>
                </form>
                <div className="sticky bottom-0 z-10 bg-white border-t px-6 py-4">
                    <DialogFooter className="flex justify-end gap-2 m-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            form="education-form"
                            disabled={saveLoading}
                            onClick={async (e) => {
                                e.preventDefault();
                                if (onSave)
                                    await onSave();
                            }}
                        >
                            {saveLoading ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}

