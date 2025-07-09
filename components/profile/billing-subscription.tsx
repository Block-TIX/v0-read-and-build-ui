"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, CreditCard, Calendar, Check, Star } from "lucide-react"

interface BillingSubscriptionProps {
  onBack: () => void
}

export default function BillingSubscription({ onBack }: BillingSubscriptionProps) {
  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      period: "month",
      features: ["Basic health tracking", "Monthly reports", "Email support"],
      current: false,
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "month",
      features: ["Advanced AI analysis", "Real-time monitoring", "Priority support", "Data export"],
      current: true,
      popular: true,
    },
    {
      name: "Premium",
      price: "$39.99",
      period: "month",
      features: ["Everything in Pro", "Personal health coach", "24/7 phone support", "Custom integrations"],
      current: false,
    },
  ]

  return (
    <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="glass hover:bg-white/20">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Billing & Subscription</h1>
            <p className="text-slate-600 dark:text-slate-300">Manage your subscription and payment methods</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Current Subscription */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Current Subscription</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-slate-800 dark:text-white">Pro Plan</span>
                <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs rounded-full">
                  Active
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">$19.99/month • Next billing: Jan 15, 2024</p>
            </div>
            <Button variant="outline" className="glass border-white/20 bg-transparent">
              Manage Subscription
            </Button>
          </div>
        </div>

        {/* Available Plans */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Available Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-6 rounded-xl border-2 ${
                  plan.current
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-4">
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white">{plan.name}</h4>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-slate-800 dark:text-white">{plan.price}</span>
                    <span className="text-slate-600 dark:text-slate-300">/{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.current
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  } text-white`}
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Payment Method</h3>
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-slate-800 dark:text-white">•••• •••• •••• 4242</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Expires 12/25</p>
              </div>
            </div>
            <Button variant="outline" className="glass border-white/20 bg-transparent">
              Update
            </Button>
          </div>
        </div>

        {/* Billing History */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Recent Billing History</h3>
          <div className="space-y-3">
            {[
              { date: "Dec 15, 2023", amount: "$19.99", status: "Paid" },
              { date: "Nov 15, 2023", amount: "$19.99", status: "Paid" },
              { date: "Oct 15, 2023", amount: "$19.99", status: "Paid" },
            ].map((bill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  <span className="text-slate-800 dark:text-white">{bill.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-slate-800 dark:text-white">{bill.amount}</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                    {bill.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
