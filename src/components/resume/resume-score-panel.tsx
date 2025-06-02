"use client"

import { useState } from "react"
import { Button } from "@/components/dashboard/ui/button"
import { Progress } from "@/components/dashboard/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/dashboard/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/dashboard/ui/collapsible"
import { Badge } from "@/components/dashboard/ui/badge"
import {
  ChevronDown,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Zap,
  Link,
  Globe,
  Plus,
} from "lucide-react"
import { ResumeDataWithOrder } from "@/app/(resume)/resume/create-resume/page"
import { useResumeScore } from "@/hooks/use-resume-score"
import { cn } from "@/utils/utils"

interface ResumeScorePanelProps {
  resumeData: ResumeDataWithOrder
}

export function ResumeScorePanel({ resumeData }: ResumeScorePanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const scoreData = useResumeScore(resumeData)

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default"
    if (score >= 70) return "secondary"
    return "destructive"
  }

  const sections = [
    {
      name: "Personal Details",
      score: scoreData.personalDetails,
      icon: User,
      description: "Contact information and basic details",
    },
    {
      name: "Professional Summary",
      score: scoreData.summary,
      icon: FileText,
      description: "Overview of your experience and goals",
    },
    {
      name: "Work Experience",
      score: scoreData.employment,
      icon: Briefcase,
      description: "Employment history and achievements",
    },
    {
      name: "Education",
      score: scoreData.education,
      icon: GraduationCap,
      description: "Academic background and qualifications",
    },
    {
      name: "Skills",
      score: scoreData.skills,
      icon: Zap,
      description: "Technical and soft skills",
    },
    {
      name: "Social Links",
      score: scoreData.socialLinks,
      icon: Link,
      description: "Professional profiles and portfolios",
    },
    {
      name: "Languages",
      score: scoreData.languages,
      icon: Globe,
      description: "Language proficiencies",
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <div>
              <CardTitle className="text-lg">Resume Score</CardTitle>
              <CardDescription>Based on completeness and best practices</CardDescription>
            </div>
          </div>
          <Badge variant={getScoreBadgeVariant(scoreData.overall)} className="text-lg px-3 py-1">
            {scoreData.overall}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Completeness</span>
            <span className={cn("text-sm font-semibold", getScoreColor(scoreData.overall))}>{scoreData.overall}%</span>
          </div>
          <Progress value={scoreData.overall} className="h-2" />
        </div>

        {/* Top Suggestions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Top Suggestions
          </h4>
          <div className="space-y-1">
            {scoreData.suggestions.slice(0, 3).map((suggestion, index) => (
              <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-blue-600 font-medium">{index + 1}.</span>
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Breakdown */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="text-sm font-medium">Detailed Breakdown</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-3 mt-3">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <div key={section.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-gray-600" />
                    <div>
                      <div className="text-sm font-medium">{section.name}</div>
                      <div className="text-xs text-gray-500">{section.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {section.score === 100 ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    )}
                    <span className={cn("text-sm font-semibold", getScoreColor(section.score))}>{section.score}%</span>
                  </div>
                </div>
              )
            })}

            {scoreData.customSections > 0 && (
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <Plus className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="text-sm font-medium text-green-800">Custom Sections</div>
                    <div className="text-xs text-green-600">Bonus points for additional content</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">+{scoreData.customSections}%</span>
                </div>
              </div>
            )}

            {/* All Suggestions */}
            {scoreData.suggestions.length > 3 && (
              <div className="space-y-2 pt-2 border-t">
                <h5 className="text-sm font-medium">Additional Suggestions</h5>
                <div className="space-y-1">
                  {scoreData.suggestions.slice(3).map((suggestion, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-blue-600 font-medium">{index + 4}.</span>
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
