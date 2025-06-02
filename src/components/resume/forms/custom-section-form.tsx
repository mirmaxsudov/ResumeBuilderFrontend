"use client"

import { Input } from "@/components/dashboard/ui/input"
import { Label } from "@/components/dashboard/ui/label"
import { Button } from "@/components/dashboard/ui/button"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { CustomSection, CustomSectionItem } from "@/app/(resume)/resume/create-resume/page"
import { RichTextEditor } from "../rich-text-editor"

interface CustomSectionFormProps {
  data: CustomSection
  onChange: (data: CustomSection) => void
}

export function CustomSectionForm({ data, onChange }: CustomSectionFormProps) {
  const addItem = () => {
    const newItem: CustomSectionItem = {
      id: Date.now().toString(),
      title: "",
      subtitle: "",
      description: "",
      startDate: "",
      endDate: "",
      priority: data.items.length + 1,
    }
    onChange({
      ...data,
      items: [...data.items, newItem],
    })
  }

  const updateItem = (id: string, field: keyof CustomSectionItem, value: any) => {
    onChange({
      ...data,
      items: data.items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    })
  }

  const removeItem = (id: string) => {
    onChange({
      ...data,
      items: data.items.filter((item) => item.id !== id),
    })
  }

  const updateSectionTitle = (title: string) => {
    onChange({
      ...data,
      title,
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Section Title</Label>
        <Input
          value={data.title || ""}
          onChange={(e) => updateSectionTitle(e.target.value)}
          placeholder="e.g. Projects, Certifications, Awards"
          className="bg-gray-50"
        />
      </div>

      <p className="text-sm text-gray-600">
        Add custom content to showcase additional achievements, projects, certifications, or any other relevant
        information.
      </p>

      {data.items.length === 0 && (
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600">
            <GripVertical className="h-4 w-4" />
            <span className="text-sm">(Not specified)</span>
          </div>
        </div>
      )}

      {data.items.map((item, index) => (
        <div key={item.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <span className="text-blue-600 text-sm">{item.title || "(Not specified)"}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={item.title || ""}
                onChange={(e) => updateItem(item.id, "title", e.target.value)}
                placeholder="e.g. Project Name, Certification"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label>Subtitle (Optional)</Label>
              <Input
                value={item.subtitle || ""}
                onChange={(e) => updateItem(item.id, "subtitle", e.target.value)}
                placeholder="e.g. Organization, Technology Used"
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date (Optional)</Label>
              <Input
                type="text"
                value={item.startDate || ""}
                onChange={(e) => updateItem(item.id, "startDate", e.target.value)}
                placeholder="MM / YYYY"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label>End Date (Optional)</Label>
              <Input
                type="text"
                value={item.endDate || ""}
                onChange={(e) => updateItem(item.id, "endDate", e.target.value)}
                placeholder="MM / YYYY"
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <RichTextEditor
              value={item.description || ""}
              onChange={(value) => updateItem(item.id, "description", value)}
              placeholder="Describe this item, your achievements, technologies used, or key outcomes..."
              showWritingHelp={true}
            />
          </div>
        </div>
      ))}

      <Button onClick={addItem} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Item
      </Button>
    </div>
  )
}
