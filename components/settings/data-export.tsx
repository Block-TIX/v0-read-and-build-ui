"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, FileText, Calendar, Activity, Heart } from "lucide-react"

interface DataExportProps {
  onBack: () => void
}

export default function DataExport({ onBack }: DataExportProps) {
  const [selectedData, setSelectedData] = useState<string[]>(["health-records", "vital-signs"])

  const dataTypes = [
    {
      id: "health-records",
      label: "Health Records",
      icon: FileText,
      description: "Medical history, diagnoses, treatments",
    },
    { id: "vital-signs", label: "Vital Signs", icon: Activity, description: "Blood pressure, heart rate, temperature" },
    { id: "lab-results", label: "Lab Results", icon: Heart, description: "Blood tests, cholesterol, glucose levels" },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      description: "Past and upcoming medical appointments",
    },
  ]

  const toggleDataType = (id: string) => {
    setSelectedData((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="glass hover:bg-white/20">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Download className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Data Export</h1>
            <p className="text-slate-600 dark:text-slate-300">Download your health data in various formats</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Data Selection */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Select Data to Export</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataTypes.map((type) => {
              const Icon = type.icon
              const isSelected = selectedData.includes(type.id)
              return (
                <div
                  key={type.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                  onClick={() => toggleDataType(type.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-emerald-500" : "bg-gray-400"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800 dark:text-white">{type.label}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{type.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Export Formats */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Export Format</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex flex-col gap-1 glass border-white/20 bg-transparent">
              <FileText className="w-5 h-5" />
              <span className="text-sm">PDF Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1 glass border-white/20 bg-transparent">
              <Download className="w-5 h-5" />
              <span className="text-sm">CSV Data</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1 glass border-white/20 bg-transparent">
              <FileText className="w-5 h-5" />
              <span className="text-sm">JSON Export</span>
            </Button>
          </div>
        </div>

        {/* Export Summary */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Export Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-300">Selected data types:</span>
              <span className="text-slate-800 dark:text-white font-medium">
                {selectedData.length} of {dataTypes.length}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-300">Estimated file size:</span>
              <span className="text-slate-800 dark:text-white font-medium">~2.5 MB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-300">Data range:</span>
              <span className="text-slate-800 dark:text-white font-medium">Last 12 months</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
            disabled={selectedData.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Selected Data
          </Button>
          <Button variant="outline" className="glass border-white/20 bg-transparent">
            Schedule Regular Export
          </Button>
        </div>
      </div>
    </div>
  )
}
