"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  FileText,
  Trash2,
  Upload,
  User,
  Building2,
  FileUp,
  ImageIcon,
  FileIcon as FilePdf,
  FileImage,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  progress: number
  status: "uploading" | "complete" | "error"
  preview?: string
}

const examTypes = [
  "Blood Test",
  "X-Ray",
  "MRI",
  "CT Scan",
  "Ultrasound",
  "EKG/ECG",
  "Urinalysis",
  "Colonoscopy",
  "Mammogram",
  "Other",
]

export default function UploadExams() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [examDetails, setExamDetails] = useState({
    examType: "",
    date: "",
    doctor: "",
    clinic: "",
    notes: "",
  })
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadTab, setUploadTab] = useState("upload")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        type: file.type,
        progress: 0,
        status: "uploading",
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      }))

      setUploadedFiles([...uploadedFiles, ...newFiles])

      // Simulate upload progress
      newFiles.forEach((file) => {
        simulateFileUpload(file.id)
      })
    }
  }

  const simulateFileUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setUploadedFiles((prev) =>
          prev.map((file) => (file.id === fileId ? { ...file, progress: 100, status: "complete" } : file)),
        )
      } else {
        setUploadedFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, progress } : file)))
      }
    }, 300)
  }

  const removeFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      const newFiles: UploadedFile[] = Array.from(e.dataTransfer.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        type: file.type,
        progress: 0,
        status: "uploading",
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      }))

      setUploadedFiles([...uploadedFiles, ...newFiles])

      // Simulate upload progress
      newFiles.forEach((file) => {
        simulateFileUpload(file.id)
      })
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <FileImage className="w-8 h-8 text-blue-600" />
    } else if (fileType.includes("pdf")) {
      return <FilePdf className="w-8 h-8 text-red-600" />
    } else {
      return <FileText className="w-8 h-8 text-gray-600" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Medical Exams</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Upload your medical examination files for AI analysis and tracking
        </p>
      </div>

      <Tabs defaultValue="upload" value={uploadTab} onValueChange={setUploadTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload New Exam</TabsTrigger>
          <TabsTrigger value="history">Upload History</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                Upload Medical Examination
              </CardTitle>
              <CardDescription>
                Upload your medical exam files and provide additional details for better analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  isDragging
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center">
                  <div className="mb-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <FileUp className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                    Supported formats: PDF, JPG, PNG, DOCX (Max 10MB per file)
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload">
                    <Button className="bg-blue-600 hover:bg-blue-700">Choose Files</Button>
                  </Label>
                </div>
              </div>

              {/* Uploaded Files */}
              <AnimatePresence>
                {uploadedFiles.length > 0 && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="font-medium">Uploaded Files</h4>
                    <div className="space-y-3">
                      {uploadedFiles.map((file) => (
                        <motion.div
                          key={file.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm"
                        >
                          <div className="shrink-0">
                            {file.preview ? (
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                                <ImageIcon
                                  src={file.preview || "/placeholder.svg"}
                                  alt={file.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              getFileIcon(file.type)
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-sm truncate">{file.name}</p>
                              <Badge
                                className={
                                  file.status === "complete"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : file.status === "error"
                                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                }
                              >
                                {file.status === "complete"
                                  ? "Complete"
                                  : file.status === "error"
                                    ? "Error"
                                    : "Uploading"}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={file.progress}
                                className="h-1.5 flex-1"
                                indicatorClassName={file.status === "error" ? "bg-red-600" : "bg-blue-600"}
                              />
                              <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                {file.size}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(file.id)}
                            className="text-gray-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Exam Details Form */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Examination Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exam-type">Exam Type</Label>
                    <Select
                      value={examDetails.examType}
                      onValueChange={(value) => setExamDetails({ ...examDetails, examType: value })}
                    >
                      <SelectTrigger id="exam-type">
                        <SelectValue placeholder="Select exam type" />
                      </SelectTrigger>
                      <SelectContent>
                        {examTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exam-date">Exam Date</Label>
                    <Input
                      id="exam-date"
                      type="date"
                      value={examDetails.date}
                      onChange={(e) => setExamDetails({ ...examDetails, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor/Physician</Label>
                    <Input
                      id="doctor"
                      placeholder="Dr. Smith"
                      value={examDetails.doctor}
                      onChange={(e) => setExamDetails({ ...examDetails, doctor: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clinic">Clinic/Hospital</Label>
                    <Input
                      id="clinic"
                      placeholder="General Hospital"
                      value={examDetails.clinic}
                      onChange={(e) => setExamDetails({ ...examDetails, clinic: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information about this examination..."
                    value={examDetails.notes}
                    onChange={(e) => setExamDetails({ ...examDetails, notes: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                disabled={uploadedFiles.length === 0 || uploadedFiles.some((f) => f.status === "uploading")}
              >
                Save Examination
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-4">
            {/* Recent Uploads */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
              <CardHeader>
                <CardTitle className="text-xl">Recent Uploads</CardTitle>
                <CardDescription>Your recently uploaded medical examinations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      type: "Blood Test Results",
                      date: "2024-05-15",
                      doctor: "Dr. Johnson",
                      clinic: "City Medical Center",
                      files: ["blood_test_results.pdf"],
                      status: "analyzed",
                    },
                    {
                      id: 2,
                      type: "Chest X-Ray",
                      date: "2024-04-28",
                      doctor: "Dr. Smith",
                      clinic: "General Hospital",
                      files: ["chest_xray.jpg"],
                      status: "analyzed",
                    },
                    {
                      id: 3,
                      type: "Cardiac Stress Test",
                      date: "2024-04-10",
                      doctor: "Dr. Williams",
                      clinic: "Heart Clinic",
                      files: ["stress_test_report.pdf", "ecg_results.pdf"],
                      status: "processing",
                    },
                  ].map((exam) => (
                    <div
                      key={exam.id}
                      className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{exam.type}</h3>
                            <Badge
                              className={
                                exam.status === "analyzed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              }
                            >
                              {exam.status === "analyzed" ? "Analyzed" : "Processing"}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(exam.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
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
                          </div>
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
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
