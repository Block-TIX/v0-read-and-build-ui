"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Bell, Mail, Smartphone, Calendar, Heart, Activity } from "lucide-react"

interface NotificationPreferencesProps {
  onBack: () => void
}

export default function NotificationPreferences({ onBack }: NotificationPreferencesProps) {
  const [preferences, setPreferences] = useState({
    email: {
      healthReminders: true,
      appointmentAlerts: true,
      weeklyReports: false,
      systemUpdates: true,
      promotions: false,
    },
    push: {
      healthReminders: true,
      appointmentAlerts: true,
      criticalAlerts: true,
      dailyTips: false,
      achievements: true,
    },
    sms: {
      appointmentAlerts: true,
      criticalAlerts: true,
      medicationReminders: false,
    },
  })

  const updatePreference = (category: keyof typeof preferences, key: string, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }))
  }

  return (
    <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="glass hover:bg-white/20">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Notification Preferences</h1>
            <p className="text-slate-600 dark:text-slate-300">Choose how you want to receive notifications</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Email Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">Health Reminders</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Checkup reminders and health tips</p>
                </div>
              </div>
              <Switch
                checked={preferences.email.healthReminders}
                onCheckedChange={(value) => updatePreference("email", "healthReminders", value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">Appointment Alerts</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Upcoming appointment notifications</p>
                </div>
              </div>
              <Switch
                checked={preferences.email.appointmentAlerts}
                onCheckedChange={(value) => updatePreference("email", "appointmentAlerts", value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">Weekly Reports</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Weekly health summary reports</p>
                </div>
              </div>
              <Switch
                checked={preferences.email.weeklyReports}
                onCheckedChange={(value) => updatePreference("email", "weeklyReports", value)}
              />
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Push Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">Critical Alerts</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Important health alerts and warnings</p>
                </div>
              </div>
              <Switch
                checked={preferences.push.criticalAlerts}
                onCheckedChange={(value) => updatePreference("push", "criticalAlerts", value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">Daily Health Tips</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Daily wellness and health tips</p>
                </div>
              </div>
              <Switch
                checked={preferences.push.dailyTips}
                onCheckedChange={(value) => updatePreference("push", "dailyTips", value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">Achievements</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Health goal achievements and milestones</p>
                </div>
              </div>
              <Switch
                checked={preferences.push.achievements}
                onCheckedChange={(value) => updatePreference("push", "achievements", value)}
              />
            </div>
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">SMS Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">Appointment Alerts</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">SMS reminders for appointments</p>
                </div>
              </div>
              <Switch
                checked={preferences.sms.appointmentAlerts}
                onCheckedChange={(value) => updatePreference("sms", "appointmentAlerts", value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">Critical Alerts</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Emergency health notifications</p>
                </div>
              </div>
              <Switch
                checked={preferences.sms.criticalAlerts}
                onCheckedChange={(value) => updatePreference("sms", "criticalAlerts", value)}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
            Save Preferences
          </Button>
          <Button variant="outline" className="glass border-white/20 bg-transparent">
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  )
}
