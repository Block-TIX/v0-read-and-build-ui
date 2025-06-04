"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"

const questions = [
  {
    id: 1,
    question: "How would you rate your overall health?",
    options: ["Excellent", "Very Good", "Good", "Fair", "Poor"],
  },
  {
    id: 2,
    question: "Do you have any chronic medical conditions?",
    options: ["No", "Yes - Diabetes", "Yes - Hypertension", "Yes - Heart Disease", "Yes - Other"],
  },
  {
    id: 3,
    question: "How often do you exercise?",
    options: ["Daily", "3-4 times per week", "1-2 times per week", "Rarely", "Never"],
  },
  {
    id: 4,
    question: "Do you take any medications regularly?",
    options: ["No medications", "1-2 medications", "3-5 medications", "More than 5 medications"],
  },
  {
    id: 5,
    question: "How often do you have medical check-ups?",
    options: ["Every 6 months", "Annually", "Every 2 years", "Only when sick", "Never"],
  },
]

export default function HealthQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value })
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4 mx-auto">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
            <CardDescription>
              Thank you for completing the health assessment. Your profile has been updated.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700">Continue to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Health Assessment</h1>
          <p className="text-gray-600 dark:text-gray-400">Help us understand your health better</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={answers[questions[currentQuestion].id] || ""}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                onClick={nextQuestion}
                disabled={!answers[questions[currentQuestion].id]}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
