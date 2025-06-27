"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, User, Building2, TrendingUp, TrendingDown, Minus, Eye } from "lucide-react"

const examData = [
  {
    id: 1,
    type: "Blood Test",
    date: "2024-03-15",
    doctor: "Dr. Johnson",
    clinic: "City Medical Center",
    status: "analyzed",
    trend: "stable",
    keyFindings: ["Cholesterol: 180 mg/dL", "Blood Sugar: 95 mg/dL", "Hemoglobin: 14.2 g/dL"],
    files: ["blood_test_results.pdf"],
  },
  {
    id: 2,
    type: "Chest X-Ray",
    date: "2024-02-28",
    doctor: "Dr. Smith",
    clinic: "General Hospital",
    status: "analyzed",
    trend: "improved",
    keyFindings: ["Clear lung fields", "Normal heart size", "No abnormalities detected"],
    files: ["chest_xray.jpg"],
  },
  {
    id: 3,
    type: "Cardiac Stress Test",
    date: "2024-02-10",
    doctor: "Dr. Williams",
    clinic: "Heart Clinic",
    status: "analyzed",
    trend: "attention",
    keyFindings: ["Max HR: 165 bpm", "Blood pressure response: Normal", "Minor ST changes"],
    files: ["stress_test_report.pdf", "ecg_results.pdf"],
  },
  {
    id: 4,
    type: "Annual Physical",
    date: "2024-01-20",
    doctor: "Dr. Johnson",
    clinic: "City Medical Center",
    status: "analyzed",
    trend: "stable",
    keyFindings: ["BMI: 24.5", "Blood pressure: 120/80", "Overall health: Good"],
    files: ["physical_exam.pdf"],
  },
]

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "improved":
      return <TrendingUp className="w-4 h-4 text-green-600" />
    case "attention":
      return <TrendingDown className="w-4 h-4 text-red-600" />
    default:
      return <Minus className="w-4 h-4 text-gray-600" />
  }
}

const getTrendColor = (trend: string) => {
  switch (trend) {
    case "improved":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "attention":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }
}

export default function MedicalTimeline() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Medical History</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your medical examinations and health progress over time
        </p>
      </div>

      <div className="space-y-6">
        {examData.map((exam, index) => (
          <div key={exam.id} className="relative">
            {/* Timeline line */}
            {index !== examData.length - 1 && (
              <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200 dark:bg-gray-700 -z-10" />
            )}

            {/* Timeline dot */}
            <div className="absolute left-4 top-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900 shadow-sm" />

            {/* Content */}
            <div className="ml-12">
              <Card className="glass-card hover-lift border-0 rounded-2xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{exam.type}</CardTitle>
                        <Badge className={getTrendColor(exam.trend)}>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(exam.trend)}
                            <span className="capitalize">{exam.trend}</span>
                          </div>
                        </Badge>
                      </div>
                      <CardDescription className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(exam.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {exam.doctor}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {exam.clinic}
                        </span>
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                      <Eye className="w-4 h-4" />
                      View Details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Key Findings */}
                    <div>
                      <h4 className="font-medium mb-2">Key Findings</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {exam.keyFindings.map((finding, idx) => (
                          <div key={idx} className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded">
                            {finding}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Files */}
                    <div>
                      <h4 className="font-medium mb-2">Attached Files</h4>
                      <div className="flex flex-wrap gap-2">
                        {exam.files.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full"
                          >
                            <FileText className="w-3 h-3" />
                            {file}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button className="glass hover:bg-white/20 border border-white/30">Load More Examinations</Button>
      </div>
    </div>
  )
}
