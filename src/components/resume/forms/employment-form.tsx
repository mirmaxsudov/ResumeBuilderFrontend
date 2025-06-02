"use client"

import { Input } from "@/components/dashboard/ui/input"
import { Label } from "@/components/dashboard/ui/label"
import { Button } from "@/components/dashboard/ui/button"
import { Checkbox } from "@/components/dashboard/ui/checkbox"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { Employment } from "@/app/(resume)/resume/create-resume/page"
import { RichTextEditor } from "../rich-text-editor"

interface EmploymentFormProps {
  data: {
    title: string
    items: Employment[]
  }
  onChange: (data: { title: string; items: Employment[] }) => void
}

export function EmploymentForm({ data, onChange }: EmploymentFormProps) {
  const addEmployment = () => {
    const newEmployment: Employment = {
      id: Date.now().toString(),
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      isCurrentJob: false,
      priority: data.items.length + 1,
      description: "",
      location: "", // Add missing location field
    }
    onChange({
      ...data,
      items: [...data.items, newEmployment],
    })
  }

  const updateEmployment = (id: string, field: keyof Employment, value: any) => {
    onChange({
      ...data,
      items: data.items.map((emp) => (emp.id === id ? { ...emp, [field]: value } : emp)),
    })
  }

  const removeEmployment = (id: string) => {
    onChange({
      ...data,
      items: data.items.filter((emp) => emp.id !== id),
    })
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use
        numbers/facts (Achieved X, measured by Y, by doing Z).
      </p>

      {data.items.length === 0 && (
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600">
            <GripVertical className="h-4 w-4" />
            <span className="text-sm">(Not specified)</span>
          </div>
        </div>
      )}

      {data.items.map((employment, index) => (
        <div key={employment.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <span className="text-blue-600 text-sm">
                {employment.jobTitle || employment.companyName || "(Not specified)"}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeEmployment(employment.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Job title</Label>
              <Input
                value={employment.jobTitle || ""}
                onChange={(e) => updateEmployment(employment.id, "jobTitle", e.target.value)}
                placeholder="Job title"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label>Employer</Label>
              <Input
                value={employment.companyName || ""}
                onChange={(e) => updateEmployment(employment.id, "companyName", e.target.value)}
                placeholder="Employer"
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Start & End Date</Label>
              <Input
                type="text"
                value={employment.startDate || ""}
                onChange={(e) => updateEmployment(employment.id, "startDate", e.target.value)}
                placeholder="MM / YYYY"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label className="invisible">End Date</Label>
              <Input
                type="text"
                value={employment.endDate || ""}
                onChange={(e) => updateEmployment(employment.id, "endDate", e.target.value)}
                placeholder="MM / YYYY"
                disabled={employment.isCurrentJob}
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input
                value={(employment as any).location || ""}
                onChange={(e) => updateEmployment(employment.id, "location" as keyof Employment, e.target.value)}
                placeholder="City"
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <RichTextEditor
              value={employment.description || ""}
              onChange={(value) => updateEmployment(employment.id, "description", value)}
              placeholder="e.g. Created and implemented lesson plans based on child-led interests and curiosities."
              maxLength={200}
              showCharacterCount={true}
              showWritingHelp={true}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`current-${employment.id}`}
              checked={employment.isCurrentJob || false}
              onCheckedChange={(checked) => updateEmployment(employment.id, "isCurrentJob", !!checked)}
            />
            <Label
              htmlFor={`current-${employment.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
            >
              Current job
            </Label>
          </div>
        </div>
      ))}

      <Button onClick={addEmployment} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Employment
      </Button>
    </div>
  )
}
