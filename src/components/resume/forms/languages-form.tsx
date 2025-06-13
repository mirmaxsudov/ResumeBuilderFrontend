"use client"

import { Input } from "@/components/dashboard/ui/input"
import { Label } from "@/components/dashboard/ui/label"
import { Button } from "@/components/dashboard/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboard/ui/select"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { Language, LanguageLevel } from "@/app/(resume)/resume/create-resume/page"

interface LanguagesFormProps {
  data: {
    title: string
    items: Language[]
  }
  onChange: (data: { title: string; items: Language[] }) => void
}

export function LanguagesForm({ data, onChange }: LanguagesFormProps) {
  const languageLevels: LanguageLevel[] = [
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
  ]

  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      lang: "",
      level: "GOOD_WORKING_KNOWLEDGE",
      priority: data.items.length + 1,
    }
    onChange({
      ...data,
      items: [...data.items, newLanguage],
    })
  }

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    onChange({
      ...data,
      items: data.items.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)),
    })
  }

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      items: data.items.filter((lang) => lang.id !== id),
    })
  }

  const formatLevelText = (level: LanguageLevel) => {
    return level
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Add languages you speak and your proficiency level. This can be valuable for international positions or
        companies with diverse teams.
      </p>

      {data.items.length === 0 && (
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600">
            <GripVertical className="h-4 w-4 bg-white" />
            <span className="text-sm">(Not specified)</span>
          </div>
        </div>
      )}

      {data.items.map((language, index) => (
        <div key={language.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <span className="text-blue-600 text-sm font-medium">{language.lang || "Language"}</span>
              <span className="text-gray-500 text-sm">{formatLevelText(language.level)}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeLanguage(language.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Input
                value={language.lang || ""}
                onChange={(e) => updateLanguage(language.id, "lang", e.target.value)}
                placeholder="e.g. English, Spanish"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label>Proficiency Level</Label>
              <Select
                value={language.level}
                onValueChange={(value: LanguageLevel) => updateLanguage(language.id, "level", value)}
              >
                <SelectTrigger className="bg-gray-50">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {languageLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {formatLevelText(level)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}

      <Button onClick={addLanguage} variant="link" className="text-blue-600 p-0">
        <Plus className="h-4 w-4 mr-2" />
        Add Language
      </Button>
    </div>
  )
}
