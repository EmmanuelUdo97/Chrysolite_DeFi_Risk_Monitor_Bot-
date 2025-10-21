"use client"

import { motion } from "framer-motion"
import { Activity } from "lucide-react"

export default function Header() {
  return (
    <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-blue-500/10" />
      </div>

      <div className="relative px-6 py-8">
        <div className="container mx-auto flex items-center justify-between">
          {/* Left side - Chrysolite */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg blur opacity-75 animate-pulse" />
              <div className="relative bg-slate-900 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                CHRYSOLITE
              </h1>
              <p className="text-xs text-slate-400">Risk Monitor</p>
            </div>
          </motion.div>

          {/* Right side - DeFi Risk Bot */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-right"
          >
            <div className="flex items-center gap-4">
              <div className="text-right">
                <h2 className="text-xl font-semibold text-slate-100">DeFi Risk Bot</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <p className="text-xs text-emerald-400">Live Monitoring</p>
                </div>
              </div>
              <div className="hidden sm:block text-right text-xs text-slate-400">
                <p>
                  Last Updated: <span className="text-emerald-400">Just now</span>
                </p>
                <p>
                  Status: <span className="text-emerald-400">Operational</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
