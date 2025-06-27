"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  FileText,
  Download,
  Share,
  Calendar,
  User,
  Building2,
} from "lucide-react"

const analysisData = {
  examInfo: {
    type: "Comprehensive Blood Panel",
    date: "2024-03-15",
    doctor: "Dr. Johnson",
    clinic: "City Medical Center",
    status: "analyzed",
  },
  overallScore: 85,
  riskLevel: "Low",
  keyMetrics: [
    {
      name: "Cholesterol (Total)",
      value: "180 mg/dL",
      range: "< 200 mg/dL",
      status: "normal",
      trend: "stable",
    },
    {
      name: "HDL Cholesterol",
      value: "55 mg/dL",
      range: "> 40 mg/dL",
      status: "good",
      trend: "improved",
    },
    {
      name: "LDL Cholesterol",
      value: "110 mg/dL",
      range: "< 100 mg/dL",
      status: "attention",
      trend: "increased",
    },
    {
      name: "Blood Sugar (Fasting)",
      value: "95 mg/dL",
      range: "70-100 mg/dL",
      status: "normal",
      trend: "stable",
    },
    {
      name: "Hemoglobin A1C",
      value: "5.4%",
      range: "< 5.7%",
      status: "normal",
      trend: "stable",
    },
    {
      name: "Blood Pressure",
      value: "125/82 mmHg",
      range: "< 120/80 mmHg",
      status: "attention",
      trend: "increased",
    },
  ],
  aiInsights: [
    {
      type: "recommendation",
      title: "Dietary Adjustments",
      description: "Consider reducing saturated fat intake to help lower LDL cholesterol levels.",
      priority: "medium",
    },
    {
      type: "monitoring",
      title: "Blood Pressure Monitoring",
      description: "Your blood pressure is slightly elevated. Monitor regularly and consider lifestyle modifications.",
      priority: "medium",
    },
    {
      type: "positive",
      title: "Excellent Glucose Control",
      description: "Your blood sugar levels are well within the healthy range. Keep up the good work!",
      priority: "low",
    },
  ],
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "good":
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case "attention":
      return <AlertTriangle className="w-4 h-4 text-yellow-600" />
    default:
      return <CheckCircle className="w-4 h-4 text-blue-600" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "good":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "attention":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
  }
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "improved":
      return <TrendingUp className="w-3 h-3 text-green-600" />
    case "increased":
      return <TrendingDown className="w-3 h-3 text-red-600" />
    default:
      return <div className="w-3 h-3 bg-gray-400 rounded-full" />
  }
}

export default function ExamAnalysis() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{analysisData.examInfo.type}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(analysisData.examInfo.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {analysisData.examInfo.doctor}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {analysisData.examInfo.clinic}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Overall Health Score */}
        <Card className="glass-card border-0 rounded-2xl hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Overall Health Score</h3>
                <p className="text-gray-600 dark:text-gray-400">Based on AI analysis of your results</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-blue-600 mb-1">{analysisData.overallScore}</div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {analysisData.riskLevel} Risk
                </Badge>
              </div>
            </div>
            <Progress value={analysisData.overallScore} className="mt-4 h-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="results" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="results">Test Results</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="trends">Historical Trends</TabsTrigger>
        </TabsList>

        {/* Test Results Tab */}
        <TabsContent value="results" className="space-y-4">
          <div className="grid gap-4">
            {analysisData.keyMetrics.map((metric, index) => (
              <Card key={index} className="glass-card border-0 rounded-2xl hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium">{metric.name}</h4>
                        {getStatusIcon(metric.status)}
                        <Badge className={getStatusColor(metric.status)}>{metric.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Normal range: {metric.range}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl font-semibold">{metric.value}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <span className="text-xs text-gray-500 capitalize">{metric.trend}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          {analysisData.aiInsights.map((insight, index) => (
            <Card key={index} className="glass-card border-0 rounded-2xl hover-lift">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      insight.type === "recommendation"
                        ? "bg-blue-100 dark:bg-blue-900"
                        : insight.type === "monitoring"
                          ? "bg-yellow-100 dark:bg-yellow-900"
                          : "bg-green-100 dark:bg-green-900"
                    }`}
                  >
                    {insight.type === "recommendation" ? (
                      <FileText className="w-4 h-4 text-blue-600" />
                    ) : insight.type === "monitoring" ? (
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{insight.title}</CardTitle>
                    <CardDescription className="mt-1">{insight.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {insight.priority} Priority
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        {/* Historical Trends Tab */}
        <TabsContent value="trends" className="space-y-4">
          <Card className="glass-card border-0 rounded-2xl hover-lift">
            <CardHeader>
              <CardTitle>Cholesterol Trends</CardTitle>
              <CardDescription>Your cholesterol levels over the past 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500">Chart visualization would go here</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 rounded-2xl hover-lift">
            <CardHeader>
              <CardTitle>Blood Sugar Trends</CardTitle>
              <CardDescription>Your glucose levels over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500">Chart visualization would go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
