"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User, Camera } from "lucide-react"

interface ProfileSettingsProps {
  onBack: () => void
}

export default function ProfileSettings({ onBack }: ProfileSettingsProps) {
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    address: "123 Health St, Wellness City, WC 12345",
    emergencyContact: "Jane Johnson - +1 (555) 987-6543",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="glass hover:bg-white/20">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Profile Settings</h1>
            <p className="text-slate-600 dark:text-slate-300">Manage your personal information</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Profile Picture</h3>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <Button size="icon" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white shadow-lg">
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">Upload New Photo</Button>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">JPG, PNG or GIF. Max size 5MB.</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full p-3 rounded-lg glass border border-white/20 bg-white/50 dark:bg-gray-800/50 text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full p-3 rounded-lg glass border border-white/20 bg-white/50 dark:bg-gray-800/50 text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full p-3 rounded-lg glass border border-white/20 bg-white/50 dark:bg-gray-800/50 text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full p-3 rounded-lg glass border border-white/20 bg-white/50 dark:bg-gray-800/50 text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Date of Birth</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                className="w-full p-3 rounded-lg glass border border-white/20 bg-white/50 dark:bg-gray-800/50 text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Emergency Contact
              </label>
              <input
                type="text"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                className="w-full p-3 rounded-lg glass border border-white/20 bg-white/50 dark:bg-gray-800/50 text-slate-800 dark:text-white"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              rows={3}
              className="w-full p-3 rounded-lg glass border border-white/20 bg-white/50 dark:bg-gray-800/50 text-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
            Save Changes
          </Button>
          <Button variant="outline" className="glass border-white/20 bg-transparent">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
