"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Input } from "@/components/dashboard/ui/input"
import { Label } from "@/components/dashboard/ui/label"
import { Button } from "@/components/dashboard/ui/button"
import { Upload, User, ChevronDown, X } from "lucide-react"
import { PersonalDetails } from "@/app/(resume)/resume/create-resume/page"

interface PersonalDetailsFormProps {
  data: PersonalDetails
  onChange: (data: PersonalDetails) => void
}

export function PersonalDetailsForm({ data, onChange }: PersonalDetailsFormProps) {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (field: keyof PersonalDetails, value: string | boolean) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Create a preview URL
      const imageUrl = URL.createObjectURL(file)

      // In a real app, you would upload to your server here
      // For demo purposes, we'll just store the preview URL
      onChange({
        ...data,
        isImageExists: true,
        image: {
          id: Date.now(),
          url: imageUrl,
        },
      })
    }
  }

  const removeImage = () => {
    if (data.image?.url) {
      URL.revokeObjectURL(data.image.url)
    }
    onChange({
      ...data,
      isImageExists: false,
      image: undefined,
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="job-title">Job Title</Label>
        <Input
          id="job-title"
          value={data.jobTitle}
          onChange={(e) => handleChange("jobTitle", e.target.value)}
          placeholder="e.g. Frontend Developer"
          className="bg-gray-50"
        />
      </div>

      <div className="flex items-start gap-4">
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              value={data.firstname}
              onChange={(e) => handleChange("firstname", e.target.value)}
              placeholder="First Name"
              className="bg-gray-50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              value={data.lastname}
              onChange={(e) => handleChange("lastname", e.target.value)}
              placeholder="Last Name"
              className="bg-gray-50"
            />
          </div>
        </div>
        <div className="flex-shrink-0 relative">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
            {data.isImageExists && data.image?.url ? (
              <>
                <img src={data.image.url || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeImage}
                  className="absolute top-0 right-0 h-6 w-6 p-0 bg-red-500 text-white hover:bg-red-600 rounded-full"
                >
                  <X className="h-3 w-3" />
                </Button>
              </>
            ) : (
              <User className="h-8 w-8 text-gray-400" />
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          <Button
            variant="link"
            size="sm"
            className="mt-2 p-0 h-auto text-blue-600"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-3 w-3 mr-1" />
            Upload photo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="email@example.com"
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={data.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="bg-gray-50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={data.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="Street Address"
          className="bg-gray-50"
        />
      </div>

      {showAdditionalDetails && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city-state">City / State</Label>
              <Input
                id="city-state"
                value={data.cityOrState}
                onChange={(e) => handleChange("cityOrState", e.target.value)}
                placeholder="City, State"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={data.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="Country"
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postal-code">Postal Code</Label>
              <Input
                id="postal-code"
                value={data.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                placeholder="Postal Code"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="driving-license">Driving License</Label>
              <Input
                id="driving-license"
                value={data.drivingLicense}
                onChange={(e) => handleChange("drivingLicense", e.target.value)}
                placeholder="License Number"
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="place-of-birth">Place Of Birth</Label>
              <Input
                id="place-of-birth"
                value={data.placeOfBirth}
                onChange={(e) => handleChange("placeOfBirth", e.target.value)}
                placeholder="Place of Birth"
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-of-birth">Date Of Birth</Label>
              <Input
                id="date-of-birth"
                type="date"
                value={data.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Input
              id="nationality"
              value={data.nationality}
              onChange={(e) => handleChange("nationality", e.target.value)}
              placeholder="Nationality"
              className="bg-gray-50"
            />
          </div>
        </>
      )}

      <Button
        variant="link"
        onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}
        className="p-0 h-auto text-blue-600"
      >
        <ChevronDown className={`h-4 w-4 mr-1 transition-transform ${showAdditionalDetails ? "rotate-180" : ""}`} />
        {showAdditionalDetails ? "Hide" : "Show"} additional details
      </Button>
    </div>
  )
}
