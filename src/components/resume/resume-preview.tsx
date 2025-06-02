"use client"
import { ResumeDataWithOrder } from "@/app/(resume)/resume/create-resume/page"
import { Progress } from "@/components/dashboard/ui/progress"
import { Mail, Phone, MapPin, Calendar, ExternalLink } from "lucide-react"

interface ResumePreviewProps {
  resumeData: ResumeDataWithOrder
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  const { info, summary, employment, education, socialLink, skills, language, customSections, sectionOrder } =
    resumeData

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  const formatSkillLevel = (level: any) => {
    const levelMap = { NOVICE: 20, BEGINNER: 40, SKILLFUL: 60, EXPERIENCED: 80, EXPERT: 100 }
    return levelMap[level]
  }

  // Helper function to render HTML content safely
  const renderHtmlContent = (htmlContent: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  }

  const renderSection = (sectionType: string, customSectionId?: string) => {
    switch (sectionType) {
      case "summary":
        return summary.summary ? (
          <section key="summary">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">Profile</h2>
            <div className="text-gray-700 leading-relaxed">{renderHtmlContent(summary.summary)}</div>
          </section>
        ) : null

      case "employment":
        return employment.items.length > 0 ? (
          <section key="employment">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">Experience</h2>
            <div className="space-y-4">
              {employment.items.map((job) => (
                <div key={job.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.jobTitle}</h3>
                      <p className="text-gray-600">{job.companyName}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {formatDate(job.startDate)} - {job.isCurrentJob ? "Present" : formatDate(job.endDate || "")}
                        </span>
                      </div>
                    </div>
                  </div>
                  {job.description && (
                    <div className="text-gray-700 text-sm leading-relaxed mt-2">
                      {renderHtmlContent(job.description)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null

      case "education":
        return education.items.length > 0 ? (
          <section key="education">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">Education</h2>
            <div className="space-y-4">
              {education.items.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.title}</h3>
                      <p className="text-gray-600">{edu.degree}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {formatDate(edu.startDate)} - {edu.isCurrentStudy ? "Present" : formatDate(edu.endDate)}
                        </span>
                      </div>
                      {edu.city && <div>{edu.city}</div>}
                    </div>
                  </div>
                  {edu.description && (
                    <div className="text-gray-700 text-sm leading-relaxed mt-2">
                      {renderHtmlContent(edu.description)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null

      case "skills":
        return skills.items.length > 0 ? (
          <section key="skills">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">Skills</h2>
            <div className="space-y-3">
              {skills.items.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">{skill.skill}</span>
                    {skills.isShowExperienceLevel && (
                      <span className="text-xs text-gray-500">{formatSkillLevel(skill.level)}%</span>
                    )}
                  </div>
                  {skills.isShowExperienceLevel && <Progress value={formatSkillLevel(skill.level)} className="h-2" />}
                </div>
              ))}
            </div>
          </section>
        ) : null

      case "language":
        return language.items.length > 0 ? (
          <section key="language">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">Languages</h2>
            <div className="space-y-2">
              {language.items.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{lang.lang}</span>
                  <span className="text-xs text-gray-500">
                    {lang.level
                      .replace(/_/g, " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ) : null

      case "custom":
        const customSection = customSections.find((cs) => cs.id === customSectionId)
        return customSection && customSection.items.length > 0 ? (
          <section key={`custom-${customSectionId}`}>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              {customSection.title}
            </h2>
            <div className="space-y-4">
              {customSection.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      {item.subtitle && <p className="text-gray-600">{item.subtitle}</p>}
                    </div>
                    {(item.startDate || item.endDate) && (
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {item.startDate && formatDate(item.startDate)}
                            {item.startDate && item.endDate && " - "}
                            {item.endDate && formatDate(item.endDate)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  {item.description && (
                    <div className="text-gray-700 text-sm leading-relaxed mt-2">
                      {renderHtmlContent(item.description)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null

      default:
        return null
    }
  }

  // Filter enabled sections and split into main content and sidebar
  const enabledSections = sectionOrder.filter((section) => section.enabled)
  const mainSections = enabledSections.filter((section) =>
    ["summary", "employment", "education", "custom"].includes(section.type),
  )
  const sidebarSections = enabledSections.filter((section) =>
    ["skills", "language", "socialLink"].includes(section.type),
  )

  return (
    <div className="p-8 bg-white max-w-4xl mx-auto my-8 shadow-lg">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            {/* Profile Image */}
            {info.isImageExists && info.image?.url && (
              <div className="flex-shrink-0">
                <img
                  src={info.image.url || "/placeholder.svg"}
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                />
              </div>
            )}

            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {info.firstname} {info.lastname}
              </h1>
              {info.jobTitle && <p className="text-lg text-gray-600 mb-4">{info.jobTitle}</p>}

              <div className="space-y-1 text-sm text-gray-600">
                {info.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{info.email}</span>
                  </div>
                )}
                {info.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{info.phoneNumber}</span>
                  </div>
                )}
                {info.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{info.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Links Section */}
          {socialLink.items.length > 0 && (
            <div className="text-right">
              <h3 className="font-semibold text-gray-900 mb-2">Links</h3>
              <div className="space-y-1 text-sm">
                {socialLink.items.map((link) => (
                  <div key={link.id} className="flex items-center gap-1 justify-end">
                    <ExternalLink className="h-3 w-3" />
                    <span className="text-blue-600">{link.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="col-span-2 space-y-6">
          {mainSections.map((section) => renderSection(section.type, section.customSectionId))}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {sidebarSections.map((section) => renderSection(section.type, section.customSectionId))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-200 text-center">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>1 / 1</span>
          <span>Saved</span>
        </div>
      </div>

      {/* Styles for rich text content */}
      <style jsx>{`
        :global(.resume-preview a) {
          color: #2563eb;
          text-decoration: underline;
        }
        :global(.resume-preview ul) {
          list-style-type: disc;
          margin-left: 20px;
          margin-top: 8px;
          margin-bottom: 8px;
        }
        :global(.resume-preview ol) {
          list-style-type: decimal;
          margin-left: 20px;
          margin-top: 8px;
          margin-bottom: 8px;
        }
        :global(.resume-preview li) {
          margin: 4px 0;
        }
        :global(.resume-preview strong) {
          font-weight: 600;
        }
        :global(.resume-preview em) {
          font-style: italic;
        }
        :global(.resume-preview u) {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
