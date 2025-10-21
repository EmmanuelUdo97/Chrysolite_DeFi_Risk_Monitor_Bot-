"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, AlertTriangle, TrendingDown } from "lucide-react"

interface Recommendation {
  id: string
  protocol: string
  message: string
  type: "warning" | "info" | "suggestion"
  icon: React.ReactNode
}

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [userQuery, setUserQuery] = useState("")
  const [response, setResponse] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecommendations([
        {
          id: "1",
          protocol: "AAVE",
          message: "AAVE showing stable performance. Safe to maintain current exposure.",
          type: "info",
          icon: <Lightbulb className="w-5 h-5" />,
        },
        {
          id: "2",
          protocol: "Curve",
          message: "Curve showing moderate volatility. Consider reducing exposure by 15-20%.",
          type: "warning",
          icon: <AlertTriangle className="w-5 h-5" />,
        },
        {
          id: "3",
          protocol: "MakerDAO",
          message: "MakerDAO risk score elevated. Recommend immediate risk assessment.",
          type: "warning",
          icon: <TrendingDown className="w-5 h-5" />,
        },
      ])
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleQuery = (e: React.FormEvent) => {
    e.preventDefault()
    if (userQuery.trim()) {
      // Simulate AI response
      setResponse(
        "Based on current market conditions, AAVE and Uniswap are the safest protocols today with risk scores below 35%. I recommend maintaining or increasing exposure to these protocols while reducing exposure to Curve and MakerDAO.",
      )
      setUserQuery("")
    }
  }

  if (loading) {
    return <div className="h-96 bg-slate-800/50 rounded-lg animate-pulse" />
  }

  return (
    <div className="space-y-6">
      {/* AI Recommendations */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              AI-Driven Recommendations
            </CardTitle>
            <CardDescription>Smart insights based on real-time protocol analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  rec.type === "warning"
                    ? "bg-yellow-500/10 border-yellow-500/30"
                    : rec.type === "info"
                      ? "bg-blue-500/10 border-blue-500/30"
                      : "bg-emerald-500/10 border-emerald-500/30"
                }`}
              >
                <div className="flex gap-3">
                  <div
                    className={`${
                      rec.type === "warning"
                        ? "text-yellow-400"
                        : rec.type === "info"
                          ? "text-blue-400"
                          : "text-emerald-400"
                    }`}
                  >
                    {rec.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-100">{rec.protocol}</p>
                    <p className="text-sm text-slate-300 mt-1">{rec.message}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Chat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle>Ask the AI</CardTitle>
            <CardDescription>Get instant insights about DeFi protocols</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleQuery} className="flex gap-2">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="e.g., What's the safest protocol today?"
                className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 font-medium rounded-lg hover:from-emerald-400 hover:to-cyan-400 transition-all"
              >
                Ask
              </button>
            </form>

            {response && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
              >
                <p className="text-slate-100">{response}</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
