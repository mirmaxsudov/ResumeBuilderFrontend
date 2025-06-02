"use client"

import { ProfessionalSummary } from "@/app/(resume)/resume/create-resume/page"
import { Label } from "@/components/dashboard/ui/label"
import { RichTextEditor } from "../rich-text-editor"

interface ProfessionalSummaryFormProps {
  data: ProfessionalSummary
  onChange: (data: ProfessionalSummary) => void
}

export function ProfessionalSummaryForm({ data, onChange }: ProfessionalSummaryFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <p className="text-sm text-gray-600">
          Write 2-4 short energetic sentences about how great you are. Mention the role and what you did. What were the
          big achievements? Describe your motivation and list your skills.
        </p>

        <RichTextEditor
          value={data.summary || ""}
          onChange={(value) => onChange({ summary: value })}
          placeholder="Curious science teacher with 8+ years of experience and a track record of..."
          maxLength={400}
          showCharacterCount={true}
          showWritingHelp={true}
        />
      </div>
    </div>
  )
}
