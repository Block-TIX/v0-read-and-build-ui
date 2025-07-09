"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Heart,
  User,
  Scale,
  Utensils,
  Moon,
  Dumbbell,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Download,
  Share,
  Calendar,
  Activity,
  Brain,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface QuizResultsProps {
  quizData: any
  onContinue: () => void
}

const calculateHealthScore = (answers: any) => {
  // Simple scoring algorithm based on answers
  let score = 70 // Base score

  // Age factor
  const age = Number.parseInt(answers[1])
  if (age < 30) score += 10
  else if (age < 50) score += 5
  else if (age > 65) score -= 5

  // BMI calculation and scoring
  const height = Number.parseInt(answers[3]) / 100 // Convert to meters
  const weight = Number.parseInt(answers[4])
  const bmi = weight / (height * height)

  if (bmi >= 18.5 && bmi <= 24.9) score += 15
  else if (bmi >= 25 && bmi <= 29.9) score += 5
  else score -= 10

  // Exercise frequency
  const exercise = answers[9]
  if (exercise === "5+ φορές την εβδομάδα") score += 15
  else if (exercise === "3-4 φορές την εβδομάδα") score += 10
  else if (exercise === "1-2 φορές την εβδομάδα") score += 5
  else score -= 5

  // Sleep quality
  const sleep = answers[8]
  if (sleep === "7-8 ώρες") score += 10
  else if (sleep === "6-7 ώρες") score += 5
  else score -= 5

  // Chronic conditions
  if (answers[5] !== "Όχι") score -= 10

  return Math.max(0, Math.min(100, score))
}

const generateRecommendations = (answers: any, healthScore: number) => {
  const recommendations = []

  // BMI recommendations
  const height = Number.parseInt(answers[3]) / 100
  const weight = Number.parseInt(answers[4])
  const bmi = weight / (height * height)

  if (bmi > 25) {
    recommendations.push({
      type: "warning",
      title: "Διαχείριση Βάρους",
      description: "Το BMI σας είναι ελαφρώς υψηλό. Συνιστάται ισορροπημένη διατροφή και τακτική άσκηση.",
      priority: "high",
    })
  }

  // Exercise recommendations
  if (answers[9] === "Καθόλου" || answers[9] === "1-2 φορές την εβδομάδα") {
    recommendations.push({
      type: "info",
      title: "Αύξηση Φυσικής Δραστηριότητας",
      description: "Στοχεύστε σε τουλάχιστον 150 λεπτά μέτριας άσκησης την εβδομάδα.",
      priority: "medium",
    })
  }

  // Sleep recommendations
  if (answers[8] === "Λιγότερο από 5 ώρες" || answers[8] === "5-6 ώρες") {
    recommendations.push({
      type: "warning",
      title: "Βελτίωση Ύπνου",
      description: "Ο ύπνος σας είναι ανεπαρκής. Στοχεύστε σε 7-8 ώρες ποιοτικού ύπνου.",
      priority: "high",
    })
  }

  // Nutrition recommendations
  if (answers[6] === "Τρώω τα πάντα (Κανονική / Μεικτή διατροφή)") {
    recommendations.push({
      type: "success",
      title: "Ισορροπημένη Διατροφή",
      description: "Συνεχίστε με την ισορροπημένη διατροφή σας και προσθέστε περισσότερα φρούτα και λαχανικά.",
      priority: "low",
    })
  }

  // Supplement recommendations
  if (answers[7] === "Όχι") {
    recommendations.push({
      type: "info",
      title: "Συμπληρώματα Διατροφής",
      description: "Εξετάστε το ενδεχόμενο λήψης βιταμίνης D και Ωμέγα-3 μετά από συμβουλή γιατρού.",
      priority: "low",
    })
  }

  return recommendations
}

export default function QuizResults({ quizData, onContinue }: QuizResultsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const healthScore = calculateHealthScore(quizData.healthAnswers)
  const recommendations = generateRecommendations(quizData.healthAnswers, healthScore)

  // Calculate BMI
  const height = Number.parseInt(quizData.healthAnswers[3]) / 100
  const weight = Number.parseInt(quizData.healthAnswers[4])
  const bmi = weight / (height * height)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreStatus = (score: number) => {
    if (score >= 80) return "Εξαιρετική"
    if (score >= 60) return "Καλή"
    return "Χρειάζεται Βελτίωση"
  }

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: "Χαμηλό Βάρος", color: "text-blue-600" }
    if (bmi <= 24.9) return { status: "Κανονικό Βάρος", color: "text-green-600" }
    if (bmi <= 29.9) return { status: "Υπερβάρος", color: "text-yellow-600" }
    return { status: "Παχυσαρκία", color: "text-red-600" }
  }

  const bmiStatus = getBMIStatus(bmi)

  return (
    <div className="min-h-screen bg-floating-elements relative p-4">
      {/* Enhanced Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -10 }}>
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-400 opacity-8 rounded-full blur-3xl float"></div>
        <div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-indigo-400 opacity-6 rounded-full blur-3xl float"
          style={{ animationDelay: "-3s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-400 opacity-7 rounded-full blur-3xl float"
          style={{ animationDelay: "-1.5s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="w-20 h-20 gradient-health rounded-3xl flex items-center justify-center shadow-lg pulse-glow">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">Αποτελέσματα Αξιολόγησης Υγείας</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Εδώ είναι η προσωποποιημένη ανάλυση της υγείας σας
          </p>
        </motion.div>

        {/* Health Score Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="glass-card border-0 rounded-3xl hover-lift">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Score Visualization */}
                <div className="text-center">
                  <div className="relative w-64 h-64 mx-auto mb-6">
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
                        strokeDashoffset={283 - (283 * healthScore) / 100}
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
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`text-6xl font-bold ${getScoreColor(healthScore)} mb-2`}>{healthScore}</div>
                        <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          {getScoreStatus(healthScore)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Συνολικό Σκορ Υγείας</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    Βασισμένο στις απαντήσεις σας και τους δείκτες υγείας
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 glass rounded-2xl">
                      <Scale className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{bmi.toFixed(1)}</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">BMI</div>
                      <div className={`text-xs font-medium ${bmiStatus.color}`}>{bmiStatus.status}</div>
                    </div>

                    <div className="text-center p-4 glass rounded-2xl">
                      <User className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {quizData.healthAnswers[1]}
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">Ηλικία</div>
                      <div className="text-xs font-medium text-gray-600">έτη</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Φυσική Δραστηριότητα</span>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {quizData.healthAnswers[9]}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Ύπνος</span>
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        {quizData.healthAnswers[8]}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Διατροφή</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {quizData.healthAnswers[6]?.split("(")[0]}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <Card className="glass-card border-0 rounded-3xl hover-lift">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6 text-emerald-600" />
                Προσωποποιημένες Συστάσεις
              </CardTitle>
              <CardDescription className="text-gray-700 dark:text-gray-300">
                Βασισμένες στην ανάλυση των απαντήσεών σας
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="p-4 glass rounded-2xl border border-white/20"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          rec.type === "success"
                            ? "bg-green-100 dark:bg-green-900/30"
                            : rec.type === "warning"
                              ? "bg-yellow-100 dark:bg-yellow-900/30"
                              : "bg-blue-100 dark:bg-blue-900/30"
                        }`}
                      >
                        {rec.type === "success" ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : rec.type === "warning" ? (
                          <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        ) : (
                          <TrendingUp className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{rec.title}</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{rec.description}</p>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            rec.priority === "high"
                              ? "border-red-300 text-red-700"
                              : rec.priority === "medium"
                                ? "border-yellow-300 text-yellow-700"
                                : "border-green-300 text-green-700"
                          }`}
                        >
                          {rec.priority === "high"
                            ? "Υψηλή Προτεραιότητα"
                            : rec.priority === "medium"
                              ? "Μέτρια Προτεραιότητα"
                              : "Χαμηλή Προτεραιότητα"}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Health Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <Card className="glass-card border-0 rounded-3xl hover-lift">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-600" />
                Οι Στόχοι Υγείας Σας
              </CardTitle>
              <CardDescription className="text-gray-700 dark:text-gray-300">
                Βάσει των επιλογών σας στο ερωτηματολόγιο
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.isArray(quizData.healthAnswers[10]) &&
                  quizData.healthAnswers[10].map((goal: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                      className="p-4 glass rounded-2xl text-center border border-white/20"
                    >
                      <div className="w-12 h-12 gradient-success rounded-xl flex items-center justify-center mx-auto mb-3">
                        {goal.includes("ύπνου") ? (
                          <Moon className="w-6 h-6 text-white" />
                        ) : goal.includes("διατροφής") ? (
                          <Utensils className="w-6 h-6 text-white" />
                        ) : goal.includes("ενέργειας") ? (
                          <Activity className="w-6 h-6 text-white" />
                        ) : goal.includes("στρες") ? (
                          <Brain className="w-6 h-6 text-white" />
                        ) : goal.includes("βάρους") ? (
                          <Scale className="w-6 h-6 text-white" />
                        ) : goal.includes("φυσικής") ? (
                          <Dumbbell className="w-6 h-6 text-white" />
                        ) : (
                          <Target className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{goal}</p>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onContinue}
            className="px-8 py-4 gradient-health text-white font-semibold rounded-2xl shadow-lg hover-lift flex items-center gap-2"
          >
            Συνέχεια στο Dashboard
            <ArrowRight className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            className="px-8 py-4 glass border-white/20 hover:bg-white/10 bg-transparent flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Λήψη Αποτελεσμάτων
          </Button>

          <Button
            variant="outline"
            className="px-8 py-4 glass border-white/20 hover:bg-white/10 bg-transparent flex items-center gap-2"
          >
            <Share className="w-5 h-5" />
            Κοινοποίηση
          </Button>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 text-center"
        >
          <Card className="glass-card border-0 rounded-3xl hover-lift">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Επόμενα Βήματα</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 glass rounded-xl">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-white">Προγραμματίστε Εξέταση</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">Κλείστε ραντεβού με γιατρό</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 glass rounded-xl">
                  <Activity className="w-6 h-6 text-green-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-white">Παρακολούθηση Προόδου</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">Χρησιμοποιήστε το dashboard</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 glass rounded-xl">
                  <Heart className="w-6 h-6 text-red-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-white">Ακολουθήστε Συστάσεις</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">Εφαρμόστε τις προτάσεις μας</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
