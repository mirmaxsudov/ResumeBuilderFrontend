"use client";

import { useState } from "react";
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
import { Input } from "../../components/dashboard/ui/input";
import { Badge } from "../../components/dashboard/ui/badge";
import { X } from "lucide-react";

function SortableTag({
    tag,
    onRemove,
}: {
    tag: string;
    onRemove: (tag: string) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: tag });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Badge
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-2 ring-1 p-1 rounded"
        >
            <div {...attributes} {...listeners} className="cursor-grab select-none">
                {tag}
            </div>
            <X
                size={12}
                className="cursor-pointer"
                data-testid={`remove-tag-${tag}`}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove(tag);
                }}
            />
        </Badge>
    );
}

export function TagsInput({ tags, setTags }: { tags: string[], setTags: (tags: string[]) => void }) {
    const [value, setValue] = useState("");

    const sensors = useSensors(useSensor(PointerSensor));

    const addTag = () => {
        const tag = value.trim();
        if (tag && !tags.includes(tag)) {
            setTags((prev) => [...prev, tag]);
        }
        setValue("");
    };

    const removeTag = (tagToRemove: string) =>
        setTags((prev) => prev.filter((t) => t !== tagToRemove));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setTags((items) => {
                const oldIndex = items.indexOf(active.id as string);
                const newIndex = items.indexOf(over.id as string);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <div className="border rounded p-2">
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type and hit Enter"
                className="min-w-[100px] border mb-3 focus:ring-0 p-1"
            />
            <div className=" flex flex-wrap gap-2">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={tags} strategy={verticalListSortingStrategy}>
                        {tags.map((tag) => (
                            <SortableTag key={tag} tag={tag} onRemove={removeTag} />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
}