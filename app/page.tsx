"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Activity, Calendar, Heart, LayoutDashboard, Menu, Moon, Settings, Sun, Upload, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import Dashboard from "@/components/dashboard"
import MedicalTimeline from "@/components/medical-timeline"
import UploadExams from "@/components/upload-exams"
import ExamAnalysis from "@/components/exam-analysis"
import HealthInsights from "@/components/health-insights"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "timeline", label: "Medical History", icon: Calendar },
    { id: "upload", label: "Upload Exams", icon: Upload },
    { id: "analysis", label: "Exam Analysis", icon: Activity },
    { id: "insights", label: "Health Insights", icon: Heart },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 dark:from-emerald-950 dark:via-blue-950 dark:to-teal-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-emerald-200 dark:border-emerald-800 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-1.5 rounded-lg shadow-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                CheckApp
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-800 dark:to-teal-800"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 pt-8 pr-6 shrink-0">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-base font-medium h-12 transition-all duration-200",
                    activeTab === item.id
                      ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-300 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20",
                  )}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute right-0 w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-l-full shadow-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Button>
              )
            })}
          </nav>

          <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg">
            <h3 className="font-medium mb-1">Health Check Reminder</h3>
            <p className="text-sm text-emerald-100 mb-3">Your annual checkup is due in 2 weeks</p>
            <Button
              size="sm"
              variant="secondary"
              className="w-full bg-white text-emerald-600 hover:bg-emerald-50 shadow-sm"
            >
              Schedule Now
            </Button>
          </div>
        </aside>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 md:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-1.5 rounded-lg shadow-lg">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    CheckApp
                  </span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-base font-medium h-12",
                        activeTab === item.id
                          ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-300"
                          : "text-gray-600 dark:text-gray-400",
                      )}
                      onClick={() => {
                        setActiveTab(item.id)
                        setMobileMenuOpen(false)
                      }}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Button>
                  )
                })}
              </nav>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <main className="flex-1 py-8">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "timeline" && <MedicalTimeline />}
          {activeTab === "upload" && <UploadExams />}
          {activeTab === "analysis" && <ExamAnalysis />}
          {activeTab === "insights" && <HealthInsights />}
        </main>
      </div>
    </div>
  )
}
