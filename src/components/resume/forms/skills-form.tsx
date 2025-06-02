"use client"

import { useState } from "react"
import { Input } from "@/components/dashboard/ui/input"
import { Label } from "@/components/dashboard/ui/label"
import { Button } from "@/components/dashboard/ui/button"
import { Badge } from "@/components/dashboard/ui/badge"
import { Slider } from "@/components/dashboard/ui/slider"
import { Switch } from "@/components/dashboard/ui/switch"
import { Plus, Trash2, GripVertical, X } from "lucide-react"
import { Skill } from "@/app/(resume)/resume/create-resume/page"

type SkillLevel = "NOVICE" | "BEGINNER" | "SKILLFUL" | "EXPERIENCED" | "EXPERT"

interface SkillsFormProps {
  data: {
    title: string
    isShowExperienceLevel: boolean
    items: Skill[]
  }
  onChange: (data: { title: string; isShowExperienceLevel: boolean; items: Skill[] }) => void
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [selectedPresetSkills, setSelectedPresetSkills] = useState<string[]>([])

  const presetSkills = [
    "Time Management",
    "Teamwork",
    "Decision Making",
    "Creativity",
    "Problem Solving",
    "Interpersonal Skills",
    "Adobe Photoshop",
    "Self-motivation",
    "Flexibility and Adaptability",
    "Hard Working",
  ]

  const skillLevels: SkillLevel[] = ["NOVICE", "BEGINNER", "SKILLFUL", "EXPERIENCED", "EXPERT"]

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      skill: "",
      level: "SKILLFUL",
      priority: data.items.length + 1,
    }
    onChange({
      ...data,
      items: [...data.items, newSkill],
    })
  }

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    onChange({
      ...data,
      items: data.items.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)),
    })
  }

  const removeSkill = (id: string) => {
    onChange({
      ...data,
      items: data.items.filter((skill) => skill.id !== id),
    })
  }

  const togglePresetSkill = (skillName: string) => {
    if (selectedPresetSkills.includes(skillName)) {
      setSelectedPresetSkills((prev) => prev.filter((s) => s !== skillName))
      const existingSkill = data.items.find((skill) => skill.skill === skillName)
      if (existingSkill) {
        removeSkill(existingSkill.id)
      }
    } else {
      setSelectedPresetSkills((prev) => [...prev, skillName])
      const newSkill: Skill = {
        id: Date.now().toString(),
        skill: skillName,
        level: "EXPERIENCED",
        priority: data.items.length + 1,
      }
      onChange({
        ...data,
        items: [...data.items, newSkill],
      })
    }
  }

  const getLevelText = (level: SkillLevel) => {
    return level.charAt(0) + level.slice(1).toLowerCase()
  }

  const levelToNumber = (level: SkillLevel): number => {
    const mapping = { NOVICE: 20, BEGINNER: 40, SKILLFUL: 60, EXPERIENCED: 80, EXPERT: 100 }
    return mapping[level]
  }

  const numberToLevel = (num: number): SkillLevel => {
    if (num >= 90) return "EXPERT"
    if (num >= 70) return "EXPERIENCED"
    if (num >= 50) return "SKILLFUL"
    if (num >= 30) return "BEGINNER"
    return "NOVICE"
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Choose 5 important skills that show you fit the position. Make sure they match the key skills mentioned in the
        job listing (especially when applying via an online system).
      </p>

      <div className="flex items-center space-x-2">
        <Switch
          id="show-experience"
          checked={!data.isShowExperienceLevel}
          onCheckedChange={(checked) =>
            onChange({
              ...data,
              isShowExperienceLevel: !checked,
            })
          }
        />
        <Label htmlFor="show-experience" className="text-sm">
          Don't show experience level
        </Label>
      </div>

      {/* Preset Skills */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {presetSkills.map((skill) => (
            <Badge
              key={skill}
              variant={selectedPresetSkills.includes(skill) ? "default" : "outline"}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => togglePresetSkill(skill)}
            >
              {skill}
              {selectedPresetSkills.includes(skill) && <X className="h-3 w-3 ml-1" />}
            </Badge>
          ))}
        </div>
      </div>

      {/* Custom Skills */}
      {data.items.map((skill, index) => (
        <div key={skill.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <span className="text-blue-600 text-sm font-medium">{skill.skill || "Skill"}</span>
              {data.isShowExperienceLevel && <span className="text-gray-500 text-sm">{getLevelText(skill.level)}</span>}
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeSkill(skill.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Skill</Label>
            <Input
              value={skill.skill || ""}
              onChange={(e) => updateSkill(skill.id, "skill", e.target.value)}
              placeholder="e.g. Leadership"
              className="bg-gray-50"
            />
          </div>

          {data.isShowExperienceLevel && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Level — {getLevelText(skill.level)}</Label>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500 w-12">Novice</span>
                <Slider
                  value={[levelToNumber(skill.level)]}
                  onValueChange={(value) => updateSkill(skill.id, "level", numberToLevel(value[0]))}
                  max={100}
                  step={20}
                  className="flex-1"
                />
                <span className="text-xs text-gray-500 w-12">Expert</span>
              </div>
            </div>
          )}
        </div>
      ))}

      <Button onClick={addSkill} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Skill
      </Button>
    </div>
  )
}
