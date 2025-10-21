"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Overview from "@/components/sections/overview"
import Alerts from "@/components/sections/alerts"
import Trends from "@/components/sections/trends"
import Recommendations from "@/components/sections/recommendations"
import About from "@/components/sections/about"

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-emerald-500/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
            >
              Alerts
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
            >
              Trends
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
            >
              Recommendations
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
            >
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <Overview />
          </TabsContent>

          <TabsContent value="alerts" className="mt-8">
            <Alerts />
          </TabsContent>

          <TabsContent value="trends" className="mt-8">
            <Trends />
          </TabsContent>

          <TabsContent value="recommendations" className="mt-8">
            <Recommendations />
          </TabsContent>

          <TabsContent value="about" className="mt-8">
            <About />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/50 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          Built with ❤️ using AI and FastAPI
        </div>
      </footer>
    </div>
  )
}
