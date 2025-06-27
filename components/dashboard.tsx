"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Heart,
  TrendingDown,
  TrendingUp,
  Upload,
  User,
  Smartphone,
  Moon,
  Footprints,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const healthScoreData = [
  { month: "Jan", score: 78 },
  { month: "Feb", score: 75 },
  { month: "Mar", score: 80 },
  { month: "Apr", score: 82 },
  { month: "May", score: 85 },
  { month: "Jun", score: 83 },
  { month: "Jul", score: 87 },
  { month: "Aug", score: 89 },
]

const biomarkersData = [
  { name: "Cholesterol", value: 180, normal: 200, unit: "mg/dL" },
  { name: "Blood Sugar", value: 95, normal: 100, unit: "mg/dL" },
  { name: "Blood Pressure", value: 125, normal: 120, unit: "mmHg" },
  { name: "Resting HR", value: 68, normal: 75, unit: "bpm" },
  { name: "BMI", value: 24.5, normal: 25, unit: "" },
]

const healthAppData = [
  {
    id: 1,
    title: "Daily Steps",
    value: "12,847",
    target: "10,000",
    unit: "steps",
    icon: Footprints,
    progress: 128,
    trend: "+15%",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
  },
  {
    id: 2,
    title: "Sleep Quality",
    value: "7h 32m",
    target: "8h",
    unit: "sleep",
    icon: Moon,
    progress: 94,
    trend: "+8%",
    color: "from-purple-500 to-indigo-500",
    bgColor: "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
  },
  {
    id: 3,
    title: "Heart Rate Zones",
    value: "142",
    target: "150",
    unit: "avg bpm",
    icon: Heart,
    progress: 95,
    trend: "+3%",
    color: "from-red-500 to-pink-500",
    bgColor: "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
  },
]

const recentExams = [
  {
    id: 1,
    type: "Blood Test",
    date: "2024-05-15",
    status: "analyzed",
    trend: "improved",
  },
  {
    id: 2,
    type: "Chest X-Ray",
    date: "2024-04-28",
    status: "analyzed",
    trend: "stable",
  },
  {
    id: 3,
    type: "Cardiac Stress Test",
    date: "2024-04-10",
    status: "analyzed",
    trend: "attention",
  },
]

const healthInsights = [
  {
    id: 1,
    title: "Excellent Vitamin D Levels",
    description: "Your vitamin D levels are optimal, which supports bone health and immune function.",
    type: "positive",
  },
  {
    id: 2,
    title: "Consider Reducing Sodium Intake",
    description: "Your sodium levels are slightly elevated. Consider reducing salt in your diet.",
    type: "recommendation",
  },
  {
    id: 3,
    title: "Monitor Blood Pressure",
    description: "Your blood pressure is trending upward. Consider more frequent monitoring.",
    type: "monitoring",
  },
]

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "improved":
      return <TrendingUp className="w-4 h-4 text-emerald-600" />
    case "attention":
      return <TrendingDown className="w-4 h-4 text-red-500" />
    default:
      return <Activity className="w-4 h-4 text-blue-600" />
  }
}

const getTrendColor = (trend: string) => {
  switch (trend) {
    case "improved":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
    case "attention":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
  }
}

const getInsightIcon = (type: string) => {
  switch (type) {
    case "positive":
      return <CheckCircle className="w-5 h-5 text-emerald-600" />
    case "recommendation":
      return <FileText className="w-5 h-5 text-blue-600" />
    case "monitoring":
      return <AlertTriangle className="w-5 h-5 text-amber-600" />
    default:
      return <Activity className="w-5 h-5 text-blue-600" />
  }
}

const getInsightColor = (type: string) => {
  switch (type) {
    case "positive":
      return "bg-emerald-100 dark:bg-emerald-900/30"
    case "recommendation":
      return "bg-blue-100 dark:bg-blue-900/30"
    case "monitoring":
      return "bg-amber-100 dark:bg-amber-900/30"
    default:
      return "bg-gray-100 dark:bg-gray-800"
  }
}

export default function Dashboard() {
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null)

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-3">
            Welcome back, <span className="text-gradient-health">Alex</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-4">Your health is looking exceptional today</p>
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 status-excellent rounded-full"></div>
              <span className="text-sm">All systems optimal</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Last updated: Today, 2:30 PM</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="px-6 py-3 gradient-health rounded-2xl text-white font-semibold shadow-lg hover-lift flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Results
          </Button>
          <Button className="px-6 py-3 glass rounded-2xl text-slate-700 dark:text-slate-300 font-semibold hover:bg-white/20 transition-all flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Schedule Checkup
          </Button>
        </div>
      </div>

      {/* Health Score Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-card rounded-3xl p-8 hover-lift border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <div className="w-8 h-8 gradient-health rounded-xl flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  Health Intelligence Score
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                  AI-powered analysis of your overall health
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-gradient mb-2">89</div>
                <div className="flex items-center gap-2 justify-end">
                  <div className="w-3 h-3 status-excellent rounded-full"></div>
                  <span className="text-sm font-semibold text-green-600">Excellent</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[400px]">
              {/* Score Visualization */}
              <div className="relative">
                <div className="w-64 h-64 mx-auto relative">
                  {/* Circular Progress SVG */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="url(#healthGradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="283"
                      strokeDashoffset="56"
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 2s ease-in-out" }}
                    />
                    <defs>
                      <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4facfe" />
                        <stop offset="100%" stopColor="#00f2fe" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Center Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 gradient-success rounded-full flex items-center justify-center mb-4 pulse-glow mx-auto">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">Health Status</div>
                      <div className="text-lg font-bold text-gradient">Optimal</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Health Metrics */}
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-success rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">Improvement</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">vs last month</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">+12%</div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-health rounded-xl flex items-center justify-center">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">Risk Level</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Current assessment</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">Low</div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-warning rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">Compliance</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Treatment adherence</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">94%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-3xl p-6 hover-lift border-0">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <div className="w-8 h-8 gradient-success rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              Vital Signs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {biomarkersData.slice(0, 4).map((marker, index) => {
              const percentage = (marker.value / marker.normal) * 100
              const isNormal = percentage <= 100

              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${isNormal ? "status-excellent" : "status-attention"}`}
                      >
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{marker.name}</span>
                    </div>
                    <span className="font-bold text-gray-800 dark:text-white">
                      {marker.value} <span className="text-sm font-normal text-gray-500">{marker.unit}</span>
                    </span>
                  </div>
                  <div className="progress-premium">
                    <div
                      className={`progress-bar ${isNormal ? "status-excellent" : "status-attention"}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Target: ≤ {marker.normal} {marker.unit}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Health App Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3 flex items-center gap-3 mb-2">
          <div className="w-8 h-8 glass rounded-xl flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Health App Integration</h2>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Synced
          </Badge>
        </div>

        {healthAppData.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.id} className="glass-card rounded-2xl p-6 hover-lift border-0">
              <CardContent className="p-0">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${stat.bgColor} mb-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-green-600">{stat.trend}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800 dark:text-white">{stat.title}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">/ {stat.target}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="progress-premium">
                      <div
                        className={`progress-bar bg-gradient-to-r ${stat.color}`}
                        style={{ width: `${Math.min(stat.progress, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">{stat.progress}% of daily goal</div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Exams & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 glass-card rounded-3xl border-0 hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Recent Exams
            </CardTitle>
            <CardDescription>Your latest medical examinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-3 rounded-lg glass hover:bg-white/20 dark:hover:bg-white/5 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{exam.type}</h3>
                    <Badge className={getTrendColor(exam.trend)}>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(exam.trend)}
                        <span className="capitalize">{exam.trend}</span>
                      </div>
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(exam.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              View All Exams
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-2 glass-card rounded-3xl border-0 hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Heart className="w-5 h-5 text-emerald-600" />
              AI Health Insights
            </CardTitle>
            <CardDescription>Personalized recommendations based on your data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthInsights.map((insight) => (
                <motion.div
                  key={insight.id}
                  className="p-4 rounded-lg glass hover:bg-white/20 dark:hover:bg-white/5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${getInsightColor(insight.type)} shadow-sm`}>
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{insight.title}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
                        >
                          {expandedInsight === insight.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: expandedInsight === insight.id ? "auto" : 0,
                          opacity: expandedInsight === insight.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{insight.description}</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              className="w-full text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            >
              View All Insights
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Health Metrics */}
      <Card className="glass-card rounded-3xl border-0 hover-lift">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-600" />
            Health Metrics
          </CardTitle>
          <CardDescription>Detailed analysis of your key health indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cholesterol" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6 glass">
              <TabsTrigger
                value="cholesterol"
                className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                Cholesterol
              </TabsTrigger>
              <TabsTrigger
                value="glucose"
                className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                Blood Sugar
              </TabsTrigger>
              <TabsTrigger
                value="pressure"
                className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                Blood Pressure
              </TabsTrigger>
              <TabsTrigger value="weight" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                Weight
              </TabsTrigger>
            </TabsList>
            <TabsContent value="cholesterol">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Total", value: 180, normal: "< 200" },
                      { name: "HDL", value: 55, normal: "> 40" },
                      { name: "LDL", value: 110, normal: "< 100" },
                      { name: "Triglycerides", value: 120, normal: "< 150" },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="glucose">
              <div className="h-[300px] flex items-center justify-center glass rounded-lg">
                <p className="text-gray-500">Blood Sugar metrics visualization</p>
              </div>
            </TabsContent>
            <TabsContent value="pressure">
              <div className="h-[300px] flex items-center justify-center glass rounded-lg">
                <p className="text-gray-500">Blood Pressure metrics visualization</p>
              </div>
            </TabsContent>
            <TabsContent value="weight">
              <div className="h-[300px] flex items-center justify-center glass rounded-lg">
                <p className="text-gray-500">Weight metrics visualization</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-auto py-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg glass">
          <div className="flex flex-col items-center">
            <Upload className="h-6 w-6 mb-2" />
            <span>Upload New Exam</span>
          </div>
        </Button>
        <Button className="h-auto py-6 glass border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-900/20">
          <div className="flex flex-col items-center">
            <User className="h-6 w-6 mb-2" />
            <span>Update Health Profile</span>
          </div>
        </Button>
        <Button className="h-auto py-6 glass border-2 border-teal-200 text-teal-700 hover:bg-teal-50 dark:border-teal-800 dark:text-teal-300 dark:hover:bg-teal-900/20">
          <div className="flex flex-col items-center">
            <Calendar className="h-6 w-6 mb-2" />
            <span>Schedule Appointment</span>
          </div>
        </Button>
      </div>
    </div>
  )
}
