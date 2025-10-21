"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Send } from "lucide-react"

interface Protocol {
  id: string
  name: string
  symbol: string
  riskScore: number
  severity: "low" | "medium" | "high"
  lastUpdated: string
}

export default function Alerts() {
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProtocols([
        { id: "1", name: "Aave", symbol: "AAVE", riskScore: 28, severity: "low", lastUpdated: "2 min ago" },
        { id: "2", name: "Uniswap", symbol: "UNI", riskScore: 35, severity: "low", lastUpdated: "1 min ago" },
        { id: "3", name: "Curve", symbol: "CRV", riskScore: 52, severity: "medium", lastUpdated: "3 min ago" },
        { id: "4", name: "Lido", symbol: "LDO", riskScore: 41, severity: "medium", lastUpdated: "5 min ago" },
        { id: "5", name: "MakerDAO", symbol: "MKR", riskScore: 68, severity: "high", lastUpdated: "Just now" },
      ])
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getSeverityEmoji = (severity: string) => {
    switch (severity) {
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
    return <div className="h-96 bg-slate-800/50 rounded-lg animate-pulse" />
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-400" />
            Protocol Alerts
          </CardTitle>
          <CardDescription>Real-time risk monitoring for DeFi protocols</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Protocol</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Risk Score</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Severity</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Last Updated</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {protocols.map((protocol, index) => (
                  <motion.tr
                    key={protocol.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {protocol.symbol === "AAVE" ? "🪙" : protocol.symbol === "UNI" ? "🧩" : "💎"}
                        </span>
                        <div>
                          <p className="font-medium text-slate-100">{protocol.name}</p>
                          <p className="text-xs text-slate-400">{protocol.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-700/50 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              protocol.riskScore < 40
                                ? "bg-emerald-500"
                                : protocol.riskScore < 60
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${protocol.riskScore}%` }}
                          />
                        </div>
                        <span className="text-slate-300 font-medium">{protocol.riskScore}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium ${getSeverityColor(protocol.severity)}`}
                      >
                        {getSeverityEmoji(protocol.severity)}{" "}
                        {protocol.severity.charAt(0).toUpperCase() + protocol.severity.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-400">{protocol.lastUpdated}</td>
                    <td className="py-4 px-4 text-right">
                      {protocol.severity === "high" && (
                        <Button
                          size="sm"
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                          variant="outline"
                        >
                          <Send className="w-3 h-3 mr-1" />
                          Alert
                        </Button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
