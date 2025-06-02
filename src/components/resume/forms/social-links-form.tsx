"use client"

import { Input } from "@/components/dashboard/ui/input"
import { Label } from "@/components/dashboard/ui/label"
import { Button } from "@/components/dashboard/ui/button"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { SocialLink } from "@/app/(resume)/resume/create-resume/page"

interface SocialLinksFormProps {
  data: {
    title: string
    items: SocialLink[]
  }
  onChange: (data: { title: string; items: SocialLink[] }) => void
}

export function SocialLinksForm({ data, onChange }: SocialLinksFormProps) {
  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      label: "",
      link: "",
      priority: data.items.length + 1,
    }
    onChange({
      ...data,
      items: [...data.items, newLink],
    })
  }

  const updateSocialLink = (id: string, field: keyof SocialLink, value: string) => {
    onChange({
      ...data,
      items: data.items.map((link) => (link.id === id ? { ...link, [field]: value } : link)),
    })
  }

  const removeSocialLink = (id: string) => {
    onChange({
      ...data,
      items: data.items.filter((link) => link.id !== id),
    })
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        You can add links to websites you want hiring managers to see! Perhaps it will be a link to your portfolio,
        LinkedIn profile, or personal website.
      </p>

      {data.items.map((link, index) => (
        <div key={link.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <span className="text-blue-600 text-sm">{link.label || "Social Link"}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => removeSocialLink(link.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Label</Label>
              <Input
                value={link.label || ""}
                onChange={(e) => updateSocialLink(link.id, "label", e.target.value)}
                placeholder="Label"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label>Link</Label>
              <Input
                value={link.link || ""}
                onChange={(e) => updateSocialLink(link.id, "link", e.target.value)}
                placeholder="Link"
                className="bg-gray-50"
              />
            </div>
          </div>
        </div>
      ))}

      {data.items.length === 0 && (
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600">
            <GripVertical className="h-4 w-4" />
            <span className="text-sm">(Not specified)</span>
          </div>
        </div>
      )}

      <Button onClick={addSocialLink} variant="link" className="text-blue-600 p-0">
        <Plus className="h-4 w-4 mr-2" />
        Add one more link
      </Button>
    </div>
  )
}
