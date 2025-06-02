"use client"

import { Input } from "@/components/dashboard/ui/input"
import { Label } from "@/components/dashboard/ui/label"
import { Button } from "@/components/dashboard/ui/button"
import { Checkbox } from "@/components/dashboard/ui/checkbox"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { Education } from "@/app/(resume)/resume/create-resume/page"
import { RichTextEditor } from "../rich-text-editor"

interface EducationFormProps {
  data: {
    title: string
    items: Education[]
  }
  onChange: (data: { title: string; items: Education[] }) => void
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      title: "",
      degree: "",
      startDate: "",
      endDate: "",
      isCurrentStudy: false,
      city: "",
      description: "",
      priority: data.items.length + 1,
    }
    onChange({
      ...data,
      items: [...data.items, newEducation],
    })
  }

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange({
      ...data,
      items: data.items.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      items: data.items.filter((edu) => edu.id !== id),
    })
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        A varied education on your resume sums up the value that your learnings and background will bring to job.
      </p>

      {data.items.length === 0 && (
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600">
            <GripVertical className="h-4 w-4" />
            <span className="text-sm">(Not specified)</span>
          </div>
        </div>
      )}

      {data.items.map((education, index) => (
        <div key={education.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <span className="text-blue-600 text-sm">{education.title || education.degree || "(Not specified)"}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeEducation(education.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>School</Label>
              <Input
                value={education.title || ""}
                onChange={(e) => updateEducation(education.id, "title", e.target.value)}
                placeholder="School"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input
                value={education.degree || ""}
                onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                placeholder="Degree"
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Start & End Date</Label>
              <Input
                type="text"
                value={education.startDate || ""}
                onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                placeholder="MM / YYYY"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label className="invisible">End Date</Label>
              <Input
                type="text"
                value={education.endDate || ""}
                onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                placeholder="MM / YYYY"
                disabled={education.isCurrentStudy}
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input
                value={education.city || ""}
                onChange={(e) => updateEducation(education.id, "city", e.target.value)}
                placeholder="City"
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`current-edu-${education.id}`}
              checked={education.isCurrentStudy || false}
              onCheckedChange={(checked) => updateEducation(education.id, "isCurrentStudy", !!checked)}
            />
            <Label htmlFor={`current-edu-${education.id}`}>Currently Studying</Label>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <RichTextEditor
              value={education.description || ""}
              onChange={(value) => updateEducation(education.id, "description", value)}
              placeholder="e.g. Graduated with High Honors."
              showWritingHelp={false}
            />
          </div>
        </div>
      ))}

      <Button onClick={addEducation} variant="link" className="text-blue-600 p-0">
        <Plus className="h-4 w-4 mr-2" />
        Add one more education
      </Button>
    </div>
  )
}
