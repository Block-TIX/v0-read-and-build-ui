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
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
} from "recharts"

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
            Welcome back, Alex
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Here's an overview of your health status</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg">
            <Upload className="w-4 h-4 mr-2" />
            Upload Exam
          </Button>
          <Button
            variant="outline"
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Checkup
          </Button>
        </div>
      </div>

      {/* Health Score Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950 dark:to-teal-950 relative">
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-xl flex items-center gap-2">
              <Heart className="w-5 h-5 text-emerald-600" />
              Health Score
            </CardTitle>
            <CardDescription>Your health score over time</CardDescription>
          </CardHeader>
          <CardContent className="pb-0 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center min-h-[350px] lg:min-h-[500px]">
              {/* Health Score Details - Left Side */}
              <div className="space-y-6">
                {/* Main Health Score Display */}
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-emerald-100 dark:border-emerald-800">
                  <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    89
                  </div>
                  <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">Health Score</div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +4% from last month
                    </Badge>
                  </div>
                </div>

                {/* Health Score Chart */}
                <div className="h-[200px] bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 dark:border-emerald-800">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={healthScoreData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                      <defs>
                        <linearGradient id="healthScoreGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" opacity={0.3} />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis domain={[50, 100]} stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "none",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          fontSize: "12px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#10b981"
                        strokeWidth={2}
                        fill="url(#healthScoreGradient)"
                        dot={{ r: 3, fill: "#10b981", strokeWidth: 1, stroke: "#fff" }}
                        activeDot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Health Visualization - Right Side */}
              <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 dark:from-emerald-900/30 dark:via-teal-900/30 dark:to-cyan-900/30 rounded-2xl flex items-center justify-center shadow-inner">
                  <div className="text-center p-8">
                    <div className="relative mb-6">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                        <Heart className="w-16 h-16 text-white animate-pulse" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
                      Excellent Health
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your health metrics are looking great!</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-4 relative z-10">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
              >
                View Detailed Report
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-teal-950 dark:to-cyan-950">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" />
              Current Status
            </CardTitle>
            <CardDescription>Your key health indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {biomarkersData.map((marker, index) => {
              const percentage = (marker.value / marker.normal) * 100
              const isNormal = percentage <= 100

              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${isNormal ? "bg-emerald-500" : "bg-amber-500"} shadow-sm`}
                      />
                      <span className="font-medium">{marker.name}</span>
                      {isNormal ? (
                        <Badge
                          variant="outline"
                          className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400 text-xs"
                        >
                          Normal
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400 text-xs"
                        >
                          Elevated
                        </Badge>
                      )}
                    </div>
                    <span className="font-bold text-lg">
                      {marker.value} <span className="text-sm font-normal text-gray-500">{marker.unit}</span>
                    </span>
                  </div>
                  <div className="relative">
                    <Progress
                      value={percentage}
                      className="h-3 bg-gray-100 dark:bg-gray-800"
                      indicatorClassName={`${isNormal ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gradient-to-r from-amber-500 to-orange-500"} transition-all duration-500 shadow-sm`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
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

      {/* Recent Exams & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
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
                  className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-200"
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

        <Card className="lg:col-span-2 border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-950">
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
                  className="p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
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
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-teal-50 dark:from-gray-900 dark:to-teal-950">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-600" />
            Health Metrics
          </CardTitle>
          <CardDescription>Detailed analysis of your key health indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cholesterol" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
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
              <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg">
                <p className="text-gray-500">Blood Sugar metrics visualization</p>
              </div>
            </TabsContent>
            <TabsContent value="pressure">
              <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg">
                <p className="text-gray-500">Blood Pressure metrics visualization</p>
              </div>
            </TabsContent>
            <TabsContent value="weight">
              <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg">
                <p className="text-gray-500">Weight metrics visualization</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-auto py-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg">
          <div className="flex flex-col items-center">
            <Upload className="h-6 w-6 mb-2" />
            <span>Upload New Exam</span>
          </div>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-6 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
        >
          <div className="flex flex-col items-center">
            <User className="h-6 w-6 mb-2" />
            <span>Update Health Profile</span>
          </div>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-6 border-2 border-teal-200 text-teal-700 hover:bg-teal-50 dark:border-teal-800 dark:text-teal-300 dark:hover:bg-teal-900/20"
        >
          <div className="flex flex-col items-center">
            <Calendar className="h-6 w-6 mb-2" />
            <span>Schedule Appointment</span>
          </div>
        </Button>
      </div>
    </div>
  )
}
