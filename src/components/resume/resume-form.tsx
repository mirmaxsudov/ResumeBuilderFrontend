"use client"

import type React from "react"

import { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { PersonalDetailsForm } from "./forms/personal-details-form"
import { ProfessionalSummaryForm } from "./forms/professional-summary-form"
import { EmploymentForm } from "./forms/employment-form"
import { EducationForm } from "./forms/education-form"
import { SocialLinksForm } from "./forms/social-links-form"
import { SkillsForm } from "./forms/skills-form"
import { LanguagesForm } from "./forms/languages-form"
import { CustomSectionForm } from "./forms/custom-section-form"
import { AddSectionDialog } from "./add-section-dialog"
import { Button } from "@/components/dashboard/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/dashboard/ui/collapsible"
import { ChevronDown, Plus, GripVertical, Eye, EyeOff, Trash2 } from "lucide-react"
import { ResumeScorePanel } from "./resume-score-panel"
import { CustomSection, ResumeDataWithOrder, SectionOrder } from "@/app/(resume)/resume/create-resume/page"
import { cn } from "@/utils/utils"

interface ResumeFormProps {
  resumeData: ResumeDataWithOrder
  updateResumeData: (section: keyof ResumeDataWithOrder, data: any) => void
  updateSectionOrder: (newOrder: SectionOrder[]) => void
  addCustomSection: (title: string) => void
  updateCustomSection: (sectionId: string, data: CustomSection) => void
  removeCustomSection: (sectionId: string) => void
}

interface SortableSectionProps {
  section: SectionOrder
  isOpen: boolean
  onToggle: () => void
  onToggleVisibility: () => void
  onDelete?: () => void
  children: React.ReactNode
}

function SortableSection({ section, isOpen, onToggle, onToggleVisibility, onDelete, children }: SortableSectionProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className={cn("relative", isDragging && "z-50")}>
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded"
            >
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
            <h3 className={cn("text-lg font-semibold", section.enabled ? "text-gray-900" : "text-gray-400")}>
              {section.title}
            </h3>
            {!section.enabled && <span className="text-xs text-gray-400">(Hidden)</span>}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onToggleVisibility()
              }}
              className="h-8 w-8 p-0"
            >
              {section.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
            {section.type === "custom" && onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <ChevronDown className={cn("h-5 w-5 text-gray-500 transition-transform", isOpen && "rotate-180")} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="p-4 bg-white rounded-lg border border-gray-200">{children}</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export function ResumeForm({
  resumeData,
  updateResumeData,
  updateSectionOrder,
  addCustomSection,
  updateCustomSection,
  removeCustomSection,
}: ResumeFormProps) {
  const [openSections, setOpenSections] = useState<string[]>(["info"])
  const [showAddDialog, setShowAddDialog] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const toggleSection = (section: string) => {
    setOpenSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const toggleSectionVisibility = (sectionId: string) => {
    const newOrder = resumeData.sectionOrder.map((section) =>
      section.id === sectionId ? { ...section, enabled: !section.enabled } : section,
    )
    updateSectionOrder(newOrder)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = resumeData.sectionOrder.findIndex((section) => section.id === active.id)
      const newIndex = resumeData.sectionOrder.findIndex((section) => section.id === over.id)

      const newOrder = arrayMove(resumeData.sectionOrder, oldIndex, newIndex)
      updateSectionOrder(newOrder)
    }
  }

  const handleDeleteCustomSection = (sectionId: string, customSectionId?: string) => {
    if (customSectionId) {
      removeCustomSection(customSectionId)
    }
  }

  const getSectionComponent = (section: SectionOrder) => {
    switch (section.type) {
      case "info":
        return <PersonalDetailsForm data={resumeData.info} onChange={(data) => updateResumeData("info", data)} />
      case "summary":
        return (
          <ProfessionalSummaryForm data={resumeData.summary} onChange={(data) => updateResumeData("summary", data)} />
        )
      case "employment":
        return <EmploymentForm data={resumeData.employment} onChange={(data) => updateResumeData("employment", data)} />
      case "education":
        return <EducationForm data={resumeData.education} onChange={(data) => updateResumeData("education", data)} />
      case "socialLink":
        return (
          <SocialLinksForm data={resumeData.socialLink} onChange={(data) => updateResumeData("socialLink", data)} />
        )
      case "skills":
        return <SkillsForm data={resumeData.skills} onChange={(data) => updateResumeData("skills", data)} />
      case "language":
        return <LanguagesForm data={resumeData.language} onChange={(data) => updateResumeData("language", data)} />
      case "custom":
        const customSection = resumeData.customSections.find((cs) => cs.id === section.customSectionId)
        return customSection ? (
          <CustomSectionForm data={customSection} onChange={(data) => updateCustomSection(customSection.id, data)} />
        ) : null
      default:
        return null
    }
  }

  return (
    <div className="p-6 space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resumeData.sectionOrder.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          {resumeData.sectionOrder.map((section) => (
            <SortableSection
              key={section.id}
              section={section}
              isOpen={openSections.includes(section.id)}
              onToggle={() => toggleSection(section.id)}
              onToggleVisibility={() => toggleSectionVisibility(section.id)}
              onDelete={
                section.type === "custom"
                  ? () => handleDeleteCustomSection(section.id, section.customSectionId)
                  : undefined
              }
            >
              {getSectionComponent(section)}
            </SortableSection>
          ))}
        </SortableContext>
      </DndContext>

      <ResumeScorePanel resumeData={resumeData} />

      <Button variant="outline" className="w-full" onClick={() => setShowAddDialog(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Add Section
      </Button>

      <AddSectionDialog open={showAddDialog} onOpenChange={setShowAddDialog} onAddSection={addCustomSection} />
    </div>
  )
}