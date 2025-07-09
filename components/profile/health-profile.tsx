"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Activity, Pill, AlertTriangle } from "lucide-react"

interface HealthProfileProps {
  onBack: () => void
}

export default function HealthProfile({ onBack }: HealthProfileProps) {
  const [healthData, setHealthData] = useState({
    bloodType: "A+",
    height: "175",
    weight: "70",
    allergies: "Penicillin, Shellfish",
    medications: "Lisinopril 10mg daily",
    conditions: "Hypertension",
    emergencyContact: "Dr. Smith - +1 (555) 123-4567",
  })

  const handleInputChange = (field: string, value: string) => {
    setHealthData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="glass hover:bg-white/20">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Health Profile</h1>
            <p className="text-slate-600 dark:text-slate-300">Manage your medical information and health data</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Health Info */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Basic Health Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Blood Type</label>
              <select
                value={healthData.bloodType}
                onChange={(e) => handleInputChange("bloodType", e.target.value)}
                className="w-full p-3 rounded-lg glass border border-white/20 bg-white/50 dark:bg-gray-800/50 text-slate-800 dark:text-white"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Height (cm)</label>
              <input
                type="number"
                value={healthData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                className="w-full p-3 rounded-lg glass border border-white/20 bg-white/50 dark:bg-gray-800/50 text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={healthData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                className="w-full p-3 rounded-lg glass border border-white/20 bg-white/50 dark:bg-gray-800/50 text-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Medical Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Allergies</label>
              <textarea
                value={healthData.allergies}
                onChange={(e) => handleInputChange("allergies", e.target.value)}
                rows={2}
                placeholder="List any known allergies..."
                className="w-full p-3 rounded-lg glass border border-white/20 bg-white/50 dark:bg-gray-800/50 text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Current Medications
              </label>
              <textarea
                value={healthData.medications}
                onChange={(e) => handleInputChange("medications", e.target.value)}
                rows={2}
                placeholder="List current medications and dosages..."
                className="w-full p-3 rounded-lg glass border border-white/20 bg-white/50 dark:bg-gray-800/50 text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Medical Conditions
              </label>
              <textarea
                value={healthData.conditions}
                onChange={(e) => handleInputChange("conditions", e.target.value)}
                rows={2}
                placeholder="List any chronic conditions or diagnoses..."
                className="w-full p-3 rounded-lg glass border border-white/20 bg-white/50 dark:bg-gray-800/50 text-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Primary Care Physician
              </label>
              <input
                type="text"
                value={healthData.emergencyContact}
                onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                placeholder="Doctor name and contact information..."
                className="w-full p-3 rounded-lg glass border border-white/20 bg-white/50 dark:bg-gray-800/50 text-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">23.5</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">BMI</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">72</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Resting HR</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">2</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Medications</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
            Save Health Profile
          </Button>
          <Button variant="outline" className="glass border-white/20 bg-transparent">
            Export Medical Summary
          </Button>
        </div>
      </div>
    </div>
  )
}
