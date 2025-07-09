"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, HelpCircle, MessageCircle, Book, Mail, Phone, Search } from "lucide-react"

interface HelpSupportProps {
  onBack: () => void
}

export default function HelpSupport({ onBack }: HelpSupportProps) {
  const faqItems = [
    {
      question: "How do I upload my medical records?",
      answer: "Go to Upload Exams section and drag & drop your files or click to browse.",
    },
    {
      question: "Is my health data secure?",
      answer: "Yes, all data is encrypted and stored securely following HIPAA compliance standards.",
    },
    {
      question: "How accurate is the AI health analysis?",
      answer:
        "Our AI provides insights based on medical literature but should not replace professional medical advice.",
    },
    {
      question: "Can I share my health data with my doctor?",
      answer: "Yes, you can export your data or share access directly with healthcare providers.",
    },
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
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Help & Support</h1>
            <p className="text-slate-600 dark:text-slate-300">Get help and find answers to common questions</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Live Chat</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Chat with our support team</p>
            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white">Start Chat</Button>
          </div>

          <div className="glass-card rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Email Support</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Send us a detailed message</p>
            <Button variant="outline" className="w-full glass border-white/20 bg-transparent">
              Send Email
            </Button>
          </div>

          <div className="glass-card rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Phone Support</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Call us directly</p>
            <Button variant="outline" className="w-full glass border-white/20 bg-transparent">
              +1 (555) 123-4567
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Book className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                <h4 className="font-medium text-slate-800 dark:text-white mb-2">{item.question}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Documentation & Guides</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-16 flex flex-col gap-1 glass border-white/20 bg-transparent">
              <Book className="w-5 h-5" />
              <span className="text-sm">User Guide</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1 glass border-white/20 bg-transparent">
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm">Video Tutorials</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
