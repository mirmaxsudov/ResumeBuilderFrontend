"use client"

import { ResumeDataWithOrder } from "@/app/(resume)/resume/create-resume/page"
import { useMemo } from "react"

interface ScoreBreakdown {
  personalDetails: number
  summary: number
  employment: number
  education: number
  skills: number
  socialLinks: number
  languages: number
  customSections: number
  overall: number
  suggestions: string[]
}

export function useResumeScore(resumeData: ResumeDataWithOrder): ScoreBreakdown {
  return useMemo(() => {
    const suggestions: string[] = []

    // Personal Details Score (25 points)
    const personalDetailsScore = (() => {
      const { info } = resumeData
      let score = 0
      const maxScore = 25

      // Required fields (15 points)
      const requiredFields = [
        { field: info.firstname, name: "First name", points: 3 },
        { field: info.lastname, name: "Last name", points: 3 },
        { field: info.email, name: "Email", points: 3 },
        { field: info.phoneNumber, name: "Phone number", points: 3 },
        { field: info.jobTitle, name: "Job title", points: 3 },
      ]

      requiredFields.forEach(({ field, name, points }) => {
        if (field && field.trim()) {
          score += points
        } else {
          suggestions.push(`Add your ${name.toLowerCase()}`)
        }
      })

      // Optional but valuable fields (10 points)
      const optionalFields = [
        { field: info.address, name: "Address", points: 2 },
        { field: info.cityOrState, name: "City/State", points: 2 },
        { field: info.country, name: "Country", points: 2 },
        { field: info.isImageExists, name: "Profile photo", points: 4 },
      ]

      optionalFields.forEach(({ field, name, points }) => {
        if ((typeof field === "boolean" && field) || (typeof field === "string" && field && field.trim())) {
          score += points
        } else if (name === "Profile photo") {
          suggestions.push("Add a professional profile photo")
        }
      })

      return Math.min(score, maxScore)
    })()

    // Summary Score (20 points)
    const summaryScore = (() => {
      const { summary } = resumeData
      const maxScore = 20

      if (!summary.summary || !summary.summary.trim()) {
        suggestions.push("Write a professional summary")
        return 0
      }

      const textContent = summary.summary.replace(/<[^>]*>/g, "").trim()
      const wordCount = textContent.split(/\s+/).length
      const charCount = textContent.length

      if (charCount < 100) {
        suggestions.push("Expand your professional summary (aim for 200+ characters)")
        return Math.min(10, maxScore)
      } else if (charCount < 200) {
        return Math.min(15, maxScore)
      } else {
        return maxScore
      }
    })()

    // Employment Score (25 points)
    const employmentScore = (() => {
      const { employment } = resumeData
      const maxScore = 25

      if (employment.items.length === 0) {
        suggestions.push("Add your work experience")
        return 0
      }

      let score = 5 // Base points for having employment
      const maxJobs = 3 // Consider up to 3 jobs for scoring

      employment.items.slice(0, maxJobs).forEach((job, index) => {
        const jobPoints = index === 0 ? 8 : 6 // More points for recent job
        let jobScore = 0

        if (job.jobTitle && job.jobTitle.trim()) jobScore += 2
        if (job.companyName && job.companyName.trim()) jobScore += 2
        if (job.startDate && job.startDate.trim()) jobScore += 1
        if (job.description && job.description.trim()) {
          const descLength = job.description.replace(/<[^>]*>/g, "").trim().length
          if (descLength > 100) {
            jobScore += 3
          } else if (descLength > 50) {
            jobScore += 2
          } else {
            jobScore += 1
          }
        }

        score += Math.min(jobScore, jobPoints)
      })

      if (employment.items.length === 1) {
        suggestions.push("Add more work experience entries")
      }

      employment.items.forEach((job, index) => {
        if (!job.description || job.description.replace(/<[^>]*>/g, "").trim().length < 100) {
          suggestions.push(`Add more details to your ${job.jobTitle || `job #${index + 1}`} description`)
        }
      })

      return Math.min(score, maxScore)
    })()

    // Education Score (15 points)
    const educationScore = (() => {
      const { education } = resumeData
      const maxScore = 15

      if (education.items.length === 0) {
        suggestions.push("Add your education background")
        return 0
      }

      let score = 5 // Base points for having education

      education.items.slice(0, 2).forEach((edu) => {
        let eduScore = 0
        if (edu.title && edu.title.trim()) eduScore += 2
        if (edu.degree && edu.degree.trim()) eduScore += 2
        if (edu.startDate && edu.startDate.trim()) eduScore += 1
        score += Math.min(eduScore, 5)
      })

      return Math.min(score, maxScore)
    })()

    // Skills Score (10 points)
    const skillsScore = (() => {
      const { skills } = resumeData
      const maxScore = 10

      if (skills.items.length === 0) {
        suggestions.push("Add your key skills")
        return 0
      }

      if (skills.items.length < 3) {
        suggestions.push("Add more skills (aim for 5-8 key skills)")
        return Math.min(5, maxScore)
      } else if (skills.items.length < 5) {
        return Math.min(7, maxScore)
      } else {
        return maxScore
      }
    })()

    // Social Links Score (3 points)
    const socialLinksScore = (() => {
      const { socialLink } = resumeData
      const maxScore = 3

      if (socialLink.items.length === 0) {
        suggestions.push("Add professional links (LinkedIn, portfolio, etc.)")
        return 0
      }

      return Math.min(socialLink.items.length * 1.5, maxScore)
    })()

    // Languages Score (2 points)
    const languagesScore = (() => {
      const { language } = resumeData
      const maxScore = 2

      if (language.items.length === 0) {
        return 0 // Optional, no suggestion
      }

      return Math.min(language.items.length, maxScore)
    })()

    // Custom Sections Score (bonus points, max 5)
    const customSectionsScore = (() => {
      const { customSections } = resumeData
      const maxScore = 5

      if (customSections.length === 0) {
        return 0
      }

      let score = 0
      customSections.forEach((section) => {
        if (section.items.length > 0) {
          score += 2
        }
      })

      return Math.min(score, maxScore)
    })()

    // Calculate overall score
    const totalScore =
      personalDetailsScore +
      summaryScore +
      employmentScore +
      educationScore +
      skillsScore +
      socialLinksScore +
      languagesScore
    const bonusScore = customSectionsScore
    const maxPossibleScore = 100

    const overall = Math.min(Math.round(totalScore + bonusScore), maxPossibleScore)

    // Add general suggestions based on overall score
    if (overall < 60) {
      suggestions.unshift("Your resume needs significant improvement. Focus on completing the basic sections first.")
    } else if (overall < 80) {
      suggestions.unshift("Good progress! Add more details and consider additional sections to improve your score.")
    } else if (overall < 90) {
      suggestions.unshift("Great resume! Consider adding more details or custom sections for the perfect score.")
    } else {
      suggestions.unshift("Excellent resume! You've covered all the important areas.")
    }

    return {
      personalDetails: Math.round((personalDetailsScore / 25) * 100),
      summary: Math.round((summaryScore / 20) * 100),
      employment: Math.round((employmentScore / 25) * 100),
      education: Math.round((educationScore / 15) * 100),
      skills: Math.round((skillsScore / 10) * 100),
      socialLinks: Math.round((socialLinksScore / 3) * 100),
      languages: Math.round((languagesScore / 2) * 100),
      customSections: Math.round((customSectionsScore / 5) * 100),
      overall,
      suggestions: suggestions.slice(0, 5), // Limit to top 5 suggestions
    }
  }, [resumeData])
}
