"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, HelpCircle, Search, Book, MessageCircle, Phone, Mail } from "lucide-react"

interface HelpCenterProps {
  onBack: () => void
}

export default function HelpCenter({ onBack }: HelpCenterProps) {
  const categories = [
    { title: "Getting Started", icon: Book, articles: 12 },
    { title: "Account & Billing", icon: HelpCircle, articles: 8 },
    { title: "Health Data", icon: MessageCircle, articles: 15 },
    { title: "Privacy & Security", icon: HelpCircle, articles: 6 },
  ]

  const popularArticles = [
    "How to upload medical records",
    "Understanding your health score",
    "Setting up health reminders",
    "Sharing data with your doctor",
    "Managing your subscription",
  ]

  return (
    <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="glass hover:bg-white/20">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Help Center</h1>
            <p className="text-slate-600 dark:text-slate-300">Find answers and get support</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div className="glass-card rounded-xl p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-10 pr-4 py-3 rounded-lg glass border border-white/20 bg-white/50 dark:bg-gray-800/50 text-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Browse by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <div
                  key={index}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800 dark:text-white">{category.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{category.articles} articles</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Popular Articles</h3>
          <div className="space-y-3">
            {popularArticles.map((article, index) => (
              <div
                key={index}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <p className="text-slate-800 dark:text-white">{article}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Still Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-16 flex flex-col gap-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">Live Chat</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1 glass border-white/20 bg-transparent">
              <Mail className="w-5 h-5" />
              <span className="text-sm">Email Support</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1 glass border-white/20 bg-transparent">
              <Phone className="w-5 h-5" />
              <span className="text-sm">Call Us</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
