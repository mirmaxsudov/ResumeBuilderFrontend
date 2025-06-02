"use client"

import { useState } from "react"
import { Button } from "@/components/dashboard/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dashboard/ui/dialog"
import { Input } from "@/components/dashboard/ui/input"
import { Label } from "@/components/dashboard/ui/label"
import { Badge } from "@/components/dashboard/ui/badge"
import { Plus } from "lucide-react"

interface AddSectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddSection: (title: string) => void
}

export function AddSectionDialog({ open, onOpenChange, onAddSection }: AddSectionDialogProps) {
  const [customTitle, setCustomTitle] = useState("")

  const predefinedSections = [
    "Projects",
    "Certifications",
    "Awards",
    "Publications",
    "Volunteer Experience",
    "Hobbies & Interests",
    "References",
    "Additional Information",
  ]

  const handleAddPredefined = (title: string) => {
    onAddSection(title)
    onOpenChange(false)
  }

  const handleAddCustom = () => {
    if (customTitle.trim()) {
      onAddSection(customTitle.trim())
      setCustomTitle("")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Section</DialogTitle>
          <DialogDescription>
            Choose from common sections or create a custom one to add to your resume.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Predefined Sections */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Common Sections</Label>
            <div className="flex flex-wrap gap-2">
              {predefinedSections.map((section) => (
                <Badge
                  key={section}
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100 px-3 py-1"
                  onClick={() => handleAddPredefined(section)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {section}
                </Badge>
              ))}
            </div>
          </div>

          {/* Custom Section */}
          <div className="space-y-3">
            <Label htmlFor="custom-title" className="text-sm font-medium">
              Custom Section
            </Label>
            <div className="flex gap-2">
              <Input
                id="custom-title"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Enter section name..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddCustom()
                  }
                }}
              />
              <Button onClick={handleAddCustom} disabled={!customTitle.trim()}>
                Add
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
