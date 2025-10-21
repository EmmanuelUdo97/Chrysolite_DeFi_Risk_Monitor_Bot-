"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, Zap, Shield, BarChart3 } from "lucide-react"

export default function About() {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Real-Time Monitoring",
      description: "Track protocol safety and risk scores with live updates every 30-60 seconds",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Visualize historical trends and patterns in protocol performance",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations based on real-time market analysis",
    },
    {
      icon: <Info className="w-6 h-6" />,
      title: "Instant Alerts",
      description: "Receive notifications for high-risk protocols via Telegram",
    },
  ]

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-emerald-400" />
              About Chrysolite
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-300 leading-relaxed">
              <span className="font-semibold text-emerald-400">Chrysolite</span> is an AI-driven DeFi Risk Monitor
              designed to track protocol safety, prices, and alerts in real-time. Built with cutting-edge technology, it
              provides investors and DeFi risk analysts with comprehensive insights into the health and stability of
              major decentralized finance protocols.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Our mission is to make DeFi safer by providing transparent, real-time risk assessments and actionable
              recommendations to help you make informed investment decisions.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
            <CardDescription>What makes Chrysolite powerful</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/30 hover:border-emerald-500/30 transition-colors"
                >
                  <div className="text-emerald-400 mb-2">{feature.icon}</div>
                  <h3 className="font-semibold text-slate-100 mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/30">
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["Next.js", "React", "TailwindCSS", "Framer Motion", "Recharts", "FastAPI"].map((tech, index) => (
                <div key={index} className="p-3 bg-slate-700/50 rounded-lg text-center">
                  <p className="text-sm font-medium text-emerald-400">{tech}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
