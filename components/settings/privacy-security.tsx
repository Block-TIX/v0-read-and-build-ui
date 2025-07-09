"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from "lucide-react"

interface PrivacySecurityProps {
  onBack: () => void
}

export default function PrivacySecurity({ onBack }: PrivacySecurityProps) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [dataSharing, setDataSharing] = useState(true)
  const [profileVisibility, setProfileVisibility] = useState(false)
  const [analyticsTracking, setAnalyticsTracking] = useState(true)

  return (
    <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="glass hover:bg-white/20">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Privacy & Security</h1>
            <p className="text-slate-600 dark:text-slate-300">Manage your privacy settings and security preferences</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Two-Factor Authentication */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Two-Factor Authentication</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>
        </div>

        {/* Data Sharing */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Health Data Sharing</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Allow sharing anonymized health data for research
                </p>
              </div>
            </div>
            <Switch checked={dataSharing} onCheckedChange={setDataSharing} />
          </div>
        </div>

        {/* Profile Visibility */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Public Profile</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Make your health achievements visible to others
                </p>
              </div>
            </div>
            <Switch checked={profileVisibility} onCheckedChange={setProfileVisibility} />
          </div>
        </div>

        {/* Analytics Tracking */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Analytics & Tracking</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Help us improve CheckApp with usage analytics
                </p>
              </div>
            </div>
            <Switch checked={analyticsTracking} onCheckedChange={setAnalyticsTracking} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
            Save Changes
          </Button>
          <Button variant="outline" className="flex-1 glass border-white/20 bg-transparent">
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  )
}
