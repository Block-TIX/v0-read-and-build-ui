"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import HealthQuiz from "@/components/health-quiz"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  })

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate form data here
    setShowQuiz(true)
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign in logic
    window.location.href = "/"
  }

  const handleQuizComplete = (quizData: any) => {
    // Handle quiz completion and redirect to dashboard
    console.log("Quiz completed:", quizData)
    window.location.href = "/"
  }

  if (showQuiz) {
    return <HealthQuiz onComplete={handleQuizComplete} userData={formData} />
  }

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

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="w-16 h-16 gradient-health rounded-3xl flex items-center justify-center shadow-lg pulse-glow">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="notification-dot"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">CheckApp</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">AI Health Intelligence Platform</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Your personal health companion powered by artificial intelligence
          </p>
        </div>

        {/* Auth Card */}
        <Card className="glass-card border-0 rounded-3xl hover-lift">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold">{isSignUp ? "Create Your Account" : "Welcome Back"}</CardTitle>
            <CardDescription className="text-base">
              {isSignUp
                ? "Join thousands of users taking control of their health"
                : "Sign in to access your health dashboard"}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {isSignUp ? (
                <motion.form
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSignUp}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          className="pl-10 glass border-white/20"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          className="pl-10 glass border-white/20"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 glass border-white/20"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 glass border-white/20"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 glass border-white/20"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 gradient-health text-white font-semibold rounded-xl shadow-lg hover-lift flex items-center justify-center gap-2"
                  >
                    Continue to Health Assessment
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                      onClick={() => setIsSignUp(false)}
                    >
                      Already have an account? <span className="font-semibold text-blue-600">Sign In</span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.form
                  key="signin"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSignIn}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 glass border-white/20"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 glass border-white/20"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-slate-600 dark:text-slate-400">Remember me</span>
                    </label>
                    <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 gradient-success text-white font-semibold rounded-xl shadow-lg hover-lift"
                  >
                    Sign In to Dashboard
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                      onClick={() => setIsSignUp(true)}
                    >
                      Don't have an account? <span className="font-semibold text-blue-600">Sign Up</span>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-slate-500 dark:text-slate-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="outline" className="glass border-white/20 hover:bg-white/10 bg-transparent">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="glass border-white/20 hover:bg-white/10 bg-transparent">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="glass rounded-2xl p-4">
            <div className="w-8 h-8 gradient-health rounded-lg flex items-center justify-center mx-auto mb-2">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300">AI Health Analysis</p>
          </div>
          <div className="glass rounded-2xl p-4">
            <div className="w-8 h-8 gradient-success rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Smart Tracking</p>
          </div>
          <div className="glass rounded-2xl p-4">
            <div className="w-8 h-8 gradient-warning rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Instant Insights</p>
          </div>
        </div>
      </div>
    </div>
  )
}
