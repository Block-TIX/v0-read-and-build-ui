"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Heart,
  Lightbulb,
  Pill,
  Utensils,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const insightCategories = [
  { id: "all", label: "All Insights", icon: Lightbulb },
  { id: "nutrition", label: "Nutrition", icon: Utensils },
  { id: "activity", label: "Physical Activity", icon: Activity },
  { id: "sleep", label: "Sleep", icon: Brain },
  { id: "medication", label: "Medication", icon: Pill },
]

const insights = [
  {
    id: 1,
    title: "Excellent Vitamin D Levels",
    description:
      "Your vitamin D levels are optimal at 45 ng/mL, which supports bone health and immune function. Continue with your current supplementation or sun exposure routine.",
    category: "nutrition",
    type: "positive",
    date: "2024-05-28",
    relatedMetrics: ["Vitamin D", "Calcium"],
    recommendations: [
      "Maintain current vitamin D supplementation",
      "Continue regular outdoor activities",
      "Consider periodic testing every 6 months",
    ],
  },
  {
    id: 2,
    title: "Consider Reducing Sodium Intake",
    description:
      "Your sodium levels are slightly elevated at 145 mEq/L (normal range: 135-145 mEq/L). This may contribute to your blood pressure readings. Consider reducing salt in your diet.",
    category: "nutrition",
    type: "recommendation",
    date: "2024-05-28",
    relatedMetrics: ["Sodium", "Blood Pressure"],
    recommendations: [
      "Limit processed foods high in sodium",
      "Use herbs and spices instead of salt when cooking",
      "Read food labels for sodium content",
      "Aim for less than 2,300mg of sodium daily",
    ],
  },
  {
    id: 3,
    title: "Monitor Blood Pressure",
    description:
      "Your blood pressure readings show a slight upward trend over the past 3 months, with your latest reading at 128/84 mmHg. While not yet in the hypertension range, this trend warrants monitoring.",
    category: "activity",
    type: "monitoring",
    date: "2024-05-25",
    relatedMetrics: ["Blood Pressure", "Resting Heart Rate"],
    recommendations: [
      "Monitor blood pressure 2-3 times per week",
      "Increase physical activity to 150 minutes per week",
      "Consider reducing caffeine intake",
      "Practice stress reduction techniques",
    ],
  },
  {
    id: 4,
    title: "Improved Sleep Quality",
    description:
      "Your sleep data shows improvement in both duration and quality. Average sleep duration has increased from 6.2 to 7.1 hours, and deep sleep percentage has improved by 15%.",
    category: "sleep",
    type: "positive",
    date: "2024-05-20",
    relatedMetrics: ["Sleep Duration", "Deep Sleep", "REM Sleep"],
    recommendations: [
      "Maintain consistent sleep schedule",
      "Continue limiting screen time before bed",
      "Consider sleep tracking to monitor progress",
    ],
  },
  {
    id: 5,
    title: "Medication Effectiveness Review",
    description:
      "Your cholesterol medication appears to be effective, with LDL levels decreasing from 140 to 110 mg/dL over 3 months. Continue current dosage and schedule follow-up testing.",
    category: "medication",
    type: "positive",
    date: "2024-05-15",
    relatedMetrics: ["LDL Cholesterol", "Total Cholesterol"],
    recommendations: [
      "Continue current medication as prescribed",
      "Schedule follow-up lipid panel in 3 months",
      "Maintain heart-healthy diet to complement medication",
    ],
  },
  {
    id: 6,
    title: "Increase Fiber Intake",
    description:
      "Based on your nutritional data and digestive health markers, increasing dietary fiber could be beneficial. Current intake appears to be approximately 15g daily (recommended: 25-30g).",
    category: "nutrition",
    type: "recommendation",
    date: "2024-05-10",
    relatedMetrics: ["Digestive Health", "Cholesterol"],
    recommendations: [
      "Add more fruits, vegetables, and whole grains to diet",
      "Consider adding chia or flax seeds to meals",
      "Gradually increase fiber to avoid digestive discomfort",
      "Ensure adequate water intake with increased fiber",
    ],
  },
]

const getInsightIcon = (type: string) => {
  switch (type) {
    case "positive":
      return <CheckCircle className="w-5 h-5 text-green-600" />
    case "recommendation":
      return <FileText className="w-5 h-5 text-blue-600" />
    case "monitoring":
      return <AlertTriangle className="w-5 h-5 text-yellow-600" />
    default:
      return <Activity className="w-5 h-5 text-blue-600" />
  }
}

const getInsightColor = (type: string) => {
  switch (type) {
    case "positive":
      return "bg-green-100 dark:bg-green-900/30"
    case "recommendation":
      return "bg-blue-100 dark:bg-blue-900/30"
    case "monitoring":
      return "bg-yellow-100 dark:bg-yellow-900/30"
    default:
      return "bg-gray-100 dark:bg-gray-800"
  }
}

const getInsightBadgeColor = (type: string) => {
  switch (type) {
    case "positive":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "recommendation":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "monitoring":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }
}

export default function HealthInsights() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null)

  const filteredInsights =
    activeCategory === "all" ? insights : insights.filter((insight) => insight.category === activeCategory)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Health Insights</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          AI-powered analysis and recommendations based on your health data
        </p>
      </div>

      {/* Summary Card */}
      <Card className="glass-card border-0 rounded-3xl hover-lift">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Positive Findings</div>
                <div className="text-2xl font-bold">3</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Recommendations</div>
                <div className="text-2xl font-bold">2</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Monitoring Needed</div>
                <div className="text-2xl font-bold">1</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-2 scrollbar-hide">
        {insightCategories.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`flex items-center gap-2 whitespace-nowrap ${
                activeCategory === category.id ? "bg-blue-600 hover:bg-blue-700" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </Button>
          )
        })}
      </div>

      {/* Insights */}
      <div className="space-y-6">
        {filteredInsights.map((insight) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-card border-0 rounded-2xl hover-lift overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${getInsightColor(insight.type)}`}>
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{insight.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {new Date(insight.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </CardDescription>
                      </div>
                      <Badge className={getInsightBadgeColor(insight.type)}>
                        {insight.type === "positive"
                          ? "Positive"
                          : insight.type === "recommendation"
                            ? "Recommendation"
                            : "Monitor"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 rounded-2xl glass border border-white/30">
                <p className="text-gray-700 dark:text-gray-300">{insight.description}</p>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">Related Metrics</h4>
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
                  <div className="flex flex-wrap gap-2 mt-2">
                    {insight.relatedMetrics.map((metric, idx) => (
                      <Badge key={idx} variant="outline" className="bg-gray-50 dark:bg-gray-800">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedInsight === insight.id ? "auto" : 0,
                    opacity: expandedInsight === insight.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-3">Recommendations</h4>
                    <ul className="space-y-2">
                      {insight.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="text-blue-600">
                  View Detailed Analysis
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Health Focus Areas */}
      <Card className="glass-card border-0 rounded-3xl hover-lift">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Heart className="w-5 h-5 text-blue-600" />
            Health Focus Areas
          </CardTitle>
          <CardDescription>Personalized health priorities based on your data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-600" />
                  <span className="font-medium">Cardiovascular Health</span>
                </div>
                <span className="text-sm font-medium">High Priority</span>
              </div>
              <Progress value={85} className="h-2" indicatorClassName="bg-red-600" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Focus on blood pressure management and cholesterol reduction
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Nutrition</span>
                </div>
                <span className="text-sm font-medium">Medium Priority</span>
              </div>
              <Progress value={60} className="h-2" indicatorClassName="bg-green-600" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Increase fiber intake and reduce sodium consumption
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Physical Activity</span>
                </div>
                <span className="text-sm font-medium">Medium Priority</span>
              </div>
              <Progress value={50} className="h-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Aim for 150 minutes of moderate activity weekly
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">Mental Wellbeing</span>
                </div>
                <span className="text-sm font-medium">Low Priority</span>
              </div>
              <Progress value={30} className="h-2" indicatorClassName="bg-purple-600" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Consider stress management techniques</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
