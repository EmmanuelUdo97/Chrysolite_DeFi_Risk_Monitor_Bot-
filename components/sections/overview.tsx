"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, TrendingUp, Clock } from "lucide-react"

interface OverviewData {
  totalProtocols: number
  averageRiskScore: number
  lastUpdate: string
  healthStatus: "low" | "medium" | "high"
}

export default function Overview() {
  const [data, setData] = useState<OverviewData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setData({
        totalProtocols: 12,
        averageRiskScore: 34,
        lastUpdate: new Date().toLocaleTimeString(),
        healthStatus: "low",
      })
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const getHealthColor = (status: string) => {
    switch (status) {
      case "low":
        return "from-emerald-500 to-cyan-500"
      case "medium":
        return "from-yellow-500 to-orange-500"
      case "high":
        return "from-red-500 to-pink-500"
      default:
        return "from-slate-500 to-slate-600"
    }
  }

  const getHealthEmoji = (status: string) => {
    switch (status) {
      case "low":
        return "🟢"
      case "medium":
        return "🟡"
      case "high":
        return "🔴"
      default:
        return "⚪"
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-800/50 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  const cards = [
    {
      title: "Monitored Protocols",
      value: data?.totalProtocols,
      icon: TrendingUp,
      color: "emerald",
    },
    {
      title: "Average Risk Score",
      value: `${data?.averageRiskScore}%`,
      icon: AlertCircle,
      color: "cyan",
    },
    {
      title: "System Health",
      value: data?.healthStatus.toUpperCase(),
      emoji: getHealthEmoji(data?.healthStatus || "low"),
      color: data?.healthStatus === "low" ? "emerald" : data?.healthStatus === "medium" ? "yellow" : "red",
    },
    {
      title: "Last Updated",
      value: data?.lastUpdate,
      icon: Clock,
      color: "blue",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 hover:border-emerald-500/30 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  {card.icon && <card.icon className="w-4 h-4 text-slate-400" />}
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100">
                  {card.emoji && <span className="mr-2">{card.emoji}</span>}
                  {card.value}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* System Health Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle>System Health Status</CardTitle>
            <CardDescription>Overall DeFi ecosystem risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Risk Level</span>
                <span className="text-emerald-400 font-semibold">🟢 Low Risk</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full"
                  style={{ width: "34%" }}
                />
              </div>
              <p className="text-xs text-slate-400">All monitored protocols are operating within safe parameters</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
