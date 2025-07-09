"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight, Heart, User, Scale, Utensils, Pill, Moon, Dumbbell, Target } from "lucide-react"
import QuizResults from "./quiz-results"

const questions = [
  {
    id: 1,
    question: "Ποια είναι η ηλικία σας;",
    type: "number",
    icon: User,
    placeholder: "π.χ. 30",
    unit: "έτη",
  },
  {
    id: 2,
    question: "Ποιο είναι το φύλο σας;",
    type: "radio",
    icon: User,
    options: ["Άνδρας", "Γυναίκα", "Άλλο"],
  },
  {
    id: 3,
    question: "Ποιο είναι το ύψος σας;",
    type: "number",
    icon: Scale,
    placeholder: "π.χ. 175",
    unit: "εκατοστά",
  },
  {
    id: 4,
    question: "Ποιο είναι το βάρος σας;",
    type: "number",
    icon: Scale,
    placeholder: "π.χ. 70",
    unit: "κιλά",
  },
  {
    id: 5,
    question: "Έχετε διαγνωστεί με κάποια χρόνια πάθηση;",
    type: "radio",
    icon: Heart,
    options: ["Όχι", "Διαβήτης", "Καρδιοπάθεια", "Υπέρταση", "Θυρεοειδής", "Άσθμα", "Άλλο"],
    hasOther: true,
  },
  {
    id: 6,
    question: "Πώς περιγράφετε τη διατροφή σας;",
    type: "radio",
    icon: Utensils,
    options: [
      "Τρώω τα πάντα (Κανονική / Μεικτή διατροφή)",
      "Χορτοφαγική (Vegetarian)",
      "Vegan",
      "Κετογονική",
      "Παλαιολιθική (Paleo)",
      "Άλλο",
    ],
    hasOther: true,
  },
  {
    id: 7,
    question: "Παίρνετε κάποιο βασικό συμπλήρωμα διατροφής καθημερινά;",
    type: "radio",
    icon: Pill,
    options: ["Όχι", "Βιταμίνη D", "Ωμέγα-3", "Μαγνήσιο", "Πολυβιταμίνη", "Άλλο"],
    hasOther: true,
  },
  {
    id: 8,
    question: "Πόσες ώρες κοιμάστε συνήθως κάθε βράδυ;",
    type: "radio",
    icon: Moon,
    options: ["Λιγότερο από 5 ώρες", "5-6 ώρες", "6-7 ώρες", "7-8 ώρες", "Περισσότερο από 8 ώρες"],
  },
  {
    id: 9,
    question: "Πόσο συχνά γυμνάζεστε μέσα στην εβδομάδα;",
    type: "radio",
    icon: Dumbbell,
    options: ["Καθόλου", "1-2 φορές την εβδομάδα", "3-4 φορές την εβδομάδα", "5+ φορές την εβδομάδα"],
  },
  {
    id: 10,
    question: "Ποιοι είναι οι βασικοί στόχοι σας για την υγεία σας;",
    type: "checkbox",
    icon: Target,
    options: [
      "Βελτίωση ύπνου",
      "Βελτίωση διατροφής",
      "Αύξηση ενέργειας",
      "Μείωση στρες",
      "Έλεγχος βάρους",
      "Βελτίωση φυσικής κατάστασης",
      "Μακροχρόνια πρόληψη ασθενειών",
      "Βελτίωση εγκεφαλικής λειτουργίας",
    ],
  },
]

interface HealthQuizProps {
  onComplete: (data: any) => void
  userData: any
}

export default function HealthQuiz({ onComplete, userData }: HealthQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [otherInputs, setOtherInputs] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value })
  }

  const handleOtherInput = (value: string) => {
    setOtherInputs({ ...otherInputs, [questions[currentQuestion].id]: value })
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Complete quiz and show results
      setShowResults(true)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleResultsContinue = () => {
    const quizData = {
      ...userData,
      healthAnswers: answers,
      otherInputs: otherInputs,
      completedAt: new Date().toISOString(),
    }
    onComplete(quizData)
  }

  if (showResults) {
    const quizData = {
      ...userData,
      healthAnswers: answers,
      otherInputs: otherInputs,
      completedAt: new Date().toISOString(),
    }
    return <QuizResults quizData={quizData} onContinue={handleResultsContinue} />
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]
  const Icon = currentQ.icon
  const currentAnswer = answers[currentQ.id]
  const isAnswered = currentAnswer !== undefined && currentAnswer !== null && currentAnswer !== ""

  return (
    <div className="min-h-screen bg-floating-elements relative flex items-center justify-center p-4">
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

      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="w-16 h-16 gradient-health rounded-3xl flex items-center justify-center shadow-lg pulse-glow">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Αξιολόγηση Υγείας</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Βοηθήστε μας να κατανοήσουμε καλύτερα την υγεία σας
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-3">
            <span>
              Ερώτηση {currentQuestion + 1} από {questions.length}
            </span>
            <span>{Math.round(progress)}% Ολοκληρωμένο</span>
          </div>
          <Progress value={progress} className="h-3 glass" />
        </div>

        {/* Question Card */}
        <Card className="glass-card border-0 rounded-3xl hover-lift mb-6">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 gradient-success rounded-2xl flex items-center justify-center shadow-lg">
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-xl text-slate-800 dark:text-white">{currentQ.question}</CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentQ.type === "number" && (
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder={currentQ.placeholder}
                        className="text-center text-lg h-14 glass border-white/20"
                        value={currentAnswer || ""}
                        onChange={(e) => handleAnswer(e.target.value)}
                      />
                      {currentQ.unit && (
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">
                          {currentQ.unit}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {currentQ.type === "radio" && (
                  <div className="space-y-3">
                    <RadioGroup value={currentAnswer || ""} onValueChange={handleAnswer} className="space-y-3">
                      {currentQ.options?.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-4 rounded-xl glass hover:bg-white/10 transition-colors border border-white/20"
                        >
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    {currentQ.hasOther && currentAnswer === "Άλλο" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <Textarea
                          placeholder="Παρακαλώ διευκρινίστε..."
                          className="glass border-white/20"
                          value={otherInputs[currentQ.id] || ""}
                          onChange={(e) => handleOtherInput(e.target.value)}
                        />
                      </motion.div>
                    )}
                  </div>
                )}

                {currentQ.type === "checkbox" && (
                  <div className="space-y-3">
                    {currentQ.options?.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-4 rounded-xl glass hover:bg-white/10 transition-colors border border-white/20"
                      >
                        <Checkbox
                          id={`checkbox-${index}`}
                          checked={(currentAnswer || []).includes(option)}
                          onCheckedChange={(checked) => {
                            const current = currentAnswer || []
                            if (checked) {
                              handleAnswer([...current, option])
                            } else {
                              handleAnswer(current.filter((item: string) => item !== option))
                            }
                          }}
                        />
                        <Label htmlFor={`checkbox-${index}`} className="flex-1 cursor-pointer text-base">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 glass border-white/20 hover:bg-white/10 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
            Προηγούμενο
          </Button>

          <Button
            onClick={nextQuestion}
            disabled={!isAnswered}
            className="flex items-center gap-2 gradient-health text-white font-semibold shadow-lg hover-lift"
          >
            {currentQuestion === questions.length - 1 ? "Ολοκλήρωση" : "Επόμενο"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Question indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentQuestion ? "bg-blue-600" : index < currentQuestion ? "bg-green-500" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
