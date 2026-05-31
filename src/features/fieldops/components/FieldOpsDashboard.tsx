"use client"


import {
  BriefcaseBusiness,
  CalendarDays,
  DollarSign,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"

import type { ActivityItem, Job } from "../types"
import {
  formatCurrency,
  getConversionRate,
  getFollowUpJobs,
  getOpenJobs,
  getPipelineValue,
  getScheduledThisWeek,
} from "../utils/calculations"
import { ActivityFeed } from "./ActivityFeed"
import { FollowUpQueue } from "./FollowUpQueue"
import { MetricCard } from "./MetricCard"
import { RecentJobs } from "./RecentJobs"
import { Sidebar } from "./Sidebar"
import { PipelineBoard } from "./PipelineBoard"


type FieldOpsDashboardProps = {
  jobs: Job[]
  activity: ActivityItem[]
}

export function FieldOpsDashboard({
  jobs: initialJobs,
  activity,
}: FieldOpsDashboardProps) {
  const [jobs, setJobs] = useState(initialJobs)

  function handleUpdateJobStatus(jobId: string, status: Job["status"]) {
    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === jobId
          ? {
            ...job,
            status,
          }
          : job
      )
    )
  }

  const followUpJobs = getFollowUpJobs(jobs)

  const stats = [
    {
      label: "Pipeline Value",
      value: formatCurrency(getPipelineValue(jobs)),
      detail: "+12% from last month",
      icon: DollarSign,
    },
    {
      label: "Open Jobs",
      value: getOpenJobs(jobs).toString(),
      detail: `${followUpJobs.length} need attention`,
      icon: BriefcaseBusiness,
    },
    {
      label: "Scheduled This Week",
      value: getScheduledThisWeek(jobs).toString(),
      detail: "4 crews assigned",
      icon: CalendarDays,
    },
    {
      label: "Conversion Rate",
      value: `${getConversionRate(jobs)}%`,
      detail: "+8% over 30 days",
      icon: TrendingUp,
    },
  ]

  return (
    <main className="min-h-screen bg-[#050812] text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">
          <header className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-5 shadow-2xl shadow-black/20 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-cyan-300">Operations Command Center</p>

              <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                FieldOps Dashboard
              </h2>

              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Track leads, quotes, scheduled jobs, follow-ups, and pipeline
                visibility from one internal workspace.
              </p>
            </div>

            <button className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-200">
              Add New Job
            </button>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <MetricCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                detail={stat.detail}
                icon={stat.icon}
              />
            ))}
          </div>

          <PipelineBoard jobs={jobs} onUpdateJobStatus={handleUpdateJobStatus} />

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <RecentJobs jobs={jobs} />
            <FollowUpQueue jobs={followUpJobs} />
          </div>

          <ActivityFeed activity={activity} />
        </section>
      </div>
    </main>
  )
}