"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Activity,
  Calendar,
  Heart,
  LayoutDashboard,
  Menu,
  Moon,
  Settings,
  Sun,
  Upload,
  User,
  X,
  LogOut,
  UserCircle,
  Bell,
  Shield,
  Palette,
  HelpCircle,
  FileText,
  CreditCard,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import Dashboard from "@/components/dashboard"
import MedicalTimeline from "@/components/medical-timeline"
import UploadExams from "@/components/upload-exams"
import ExamAnalysis from "@/components/exam-analysis"
import HealthInsights from "@/components/health-insights"
import HealthQuiz from "@/components/health-quiz"
import PrivacySecurity from "@/components/settings/privacy-security"
import DataExport from "@/components/settings/data-export"
import HelpSupport from "@/components/settings/help-support"
import ProfileSettings from "@/components/profile/profile-settings"
import HealthProfile from "@/components/profile/health-profile"
import BillingSubscription from "@/components/profile/billing-subscription"
import NotificationPreferences from "@/components/profile/notification-preferences"
import HelpCenter from "@/components/profile/help-center"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const { theme, setTheme } = useTheme()

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "timeline", label: "Medical History", icon: Calendar },
    { id: "upload", label: "Upload Exams", icon: Upload },
    { id: "analysis", label: "Exam Analysis", icon: Activity },
    { id: "insights", label: "Health Insights", icon: Heart },
    { id: "quiz", label: "Health Quiz", icon: User },
  ]

  const handleSignOut = () => {
    console.log("Signing out...")
    // Add sign out logic here
  }

  const renderMainContent = () => {
    switch (activeTab) {
      case "privacy-security":
        return <PrivacySecurity onBack={() => setActiveTab("dashboard")} />
      case "data-export":
        return <DataExport onBack={() => setActiveTab("dashboard")} />
      case "help-support":
        return <HelpSupport onBack={() => setActiveTab("dashboard")} />
      case "profile-settings":
        return <ProfileSettings onBack={() => setActiveTab("dashboard")} />
      case "health-profile":
        return <HealthProfile onBack={() => setActiveTab("dashboard")} />
      case "billing-subscription":
        return <BillingSubscription onBack={() => setActiveTab("dashboard")} />
      case "notification-preferences":
        return <NotificationPreferences onBack={() => setActiveTab("dashboard")} />
      case "help-center":
        return <HelpCenter onBack={() => setActiveTab("dashboard")} />
      case "dashboard":
        return <Dashboard />
      case "timeline":
        return <MedicalTimeline />
      case "upload":
        return <UploadExams />
      case "analysis":
        return <ExamAnalysis />
      case "insights":
        return <HealthInsights />
      case "quiz":
        return <HealthQuiz onComplete={() => {}} userData={{}} />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-floating-elements relative">
      {/* Enhanced Floating Background Elements - Fixed Z-Index */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -10 }}>
        <div
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-400 opacity-8 rounded-full blur-3xl float"
          style={{ zIndex: -10 }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-indigo-400 opacity-6 rounded-full blur-3xl float"
          style={{ animationDelay: "-3s", zIndex: -10 }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-400 opacity-7 rounded-full blur-3xl float"
          style={{ animationDelay: "-1.5s", zIndex: -10 }}
        ></div>
      </div>

      {/* Enhanced Header with Glass Effect */}
      <header className="sticky top-0 z-50 glass-header">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden glass hover:bg-white/20 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="text-slate-700" /> : <Menu className="text-slate-700" />}
            </Button>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 gradient-health rounded-2xl flex items-center justify-center shadow-lg pulse-glow">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="notification-dot"></div>
              </div>
              <div>
                <span className="font-bold text-2xl text-slate-800 dark:text-white">CheckApp</span>
                <p className="text-sm text-slate-600 dark:text-slate-300">AI Health Intelligence</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="glass hover:bg-white/20 backdrop-blur-sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-slate-700" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )}
            </Button>

            {/* Settings Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="glass hover:bg-white/20 backdrop-blur-sm">
                  <Settings className="h-5 w-5 text-slate-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl border border-white/30 shadow-2xl"
                align="end"
              >
                <DropdownMenuLabel className="text-slate-800 dark:text-white">Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-slate-700 dark:text-slate-300">
                  <Bell className="mr-2 h-4 w-4" />
                  <span className="flex-1">Notifications</span>
                  <Switch checked={notifications} onCheckedChange={setNotifications} className="ml-2" />
                </DropdownMenuItem>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="text-slate-700 dark:text-slate-300">
                    <Palette className="mr-2 h-4 w-4" />
                    <span>Theme</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="glass-card border-white/20">
                    <DropdownMenuItem onClick={() => setTheme("light")} className="text-slate-700 dark:text-slate-300">
                      <Sun className="mr-2 h-4 w-4" />
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")} className="text-slate-700 dark:text-slate-300">
                      <Moon className="mr-2 h-4 w-4" />
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")} className="text-slate-700 dark:text-slate-300">
                      <Globe className="mr-2 h-4 w-4" />
                      System
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuItem
                  className="text-slate-700 dark:text-slate-300 cursor-pointer"
                  onClick={() => setActiveTab("privacy-security")}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy & Security
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-slate-700 dark:text-slate-300 cursor-pointer"
                  onClick={() => setActiveTab("data-export")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Data Export
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-slate-700 dark:text-slate-300 cursor-pointer"
                  onClick={() => setActiveTab("help-support")}
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative cursor-pointer">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-12 h-12 gradient-success rounded-xl shadow-lg hover-lift"
                  >
                    <User className="h-5 w-5 text-white" />
                  </Button>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 status-excellent rounded-full border-2 border-white"></div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl border border-white/30 shadow-2xl"
                align="end"
              >
                <DropdownMenuLabel className="text-slate-800 dark:text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-success rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Alex Johnson</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">alex@example.com</div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-slate-700 dark:text-slate-300 cursor-pointer"
                  onClick={() => setActiveTab("profile-settings")}
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-slate-700 dark:text-slate-300 cursor-pointer"
                  onClick={() => setActiveTab("health-profile")}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Health Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-slate-700 dark:text-slate-300 cursor-pointer"
                  onClick={() => setActiveTab("billing-subscription")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing & Subscription
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-slate-700 dark:text-slate-300 cursor-pointer"
                  onClick={() => setActiveTab("notification-preferences")}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notification Preferences
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-slate-700 dark:text-slate-300 cursor-pointer"
                  onClick={() => setActiveTab("help-center")}
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help Center
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-600 dark:text-red-400 cursor-pointer" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 flex">
        {/* Enhanced Sidebar - Desktop */}
        <aside className="hidden md:block w-64 pt-8 pr-6 shrink-0">
          <div className="glass-sidebar rounded-2xl p-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-base font-medium h-12 transition-all duration-200 rounded-xl",
                      activeTab === item.id
                        ? "glass-card text-emerald-800 dark:text-emerald-300 shadow-sm"
                        : "text-gray-800 dark:text-gray-300 hover:glass hover:bg-white/10",
                    )}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                    {activeTab === item.id && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="absolute right-2 w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Button>
                )
              })}
            </nav>

            <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg glass">
              <h3 className="font-medium mb-1 text-slate-800 dark:text-white">Health Check Reminder</h3>
              <p className="text-sm text-emerald-800 dark:text-emerald-100 mb-3">
                Your annual checkup is due in 2 weeks
              </p>
              <Button
                size="sm"
                variant="secondary"
                className="w-full bg-white/90 text-emerald-600 hover:bg-white shadow-sm backdrop-blur-sm"
              >
                Schedule Now
              </Button>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white shadow-lg glass">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-white"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <path d="M8 10h.01"></path>
                    <path d="M12 10h.01"></path>
                    <path d="M16 10h.01"></path>
                  </svg>
                </div>
                <h3 className="font-medium text-slate-800 dark:text-white">AI Doc Chat</h3>
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-100 mb-3">
                Get instant medical advice from our AI doctor assistant
              </p>
              <Button
                size="sm"
                variant="secondary"
                className="w-full bg-white/90 text-blue-600 hover:bg-white shadow-sm backdrop-blur-sm"
              >
                Start Chat
              </Button>
            </div>
          </div>
        </aside>

        {/* Enhanced Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 glass-card md:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
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
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="glass">
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
                        "w-full justify-start text-base font-medium h-12 rounded-xl",
                        activeTab === item.id
                          ? "glass-card text-emerald-700 dark:text-emerald-300"
                          : "text-gray-600 dark:text-gray-400 hover:glass",
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
        <main className="flex-1 py-8">{renderMainContent()}</main>
      </div>
    </div>
  )
}
