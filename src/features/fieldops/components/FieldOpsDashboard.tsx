"use client"


import {
  BriefcaseBusiness,
  CalendarDays,
  DollarSign,
  Search,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"
import { AddNewJobModal } from "./AddNewJobModal"

import type { ActivityItem, Job, JobPriority, JobStatus } from "../types"
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

const statusFilterOptions: Array<JobStatus | "All"> = [
  "All",
  "New Lead",
  "Quoted",
  "Approved",
  "Scheduled",
  "In Progress",
  "Completed",
  "Paid",
  "Lost",
]

const priorityFilterOptions: Array<JobPriority | "All"> = [
  "All",
  "Low",
  "Medium",
  "High",
]

export function FieldOpsDashboard({
  jobs: initialJobs,
  activity,
}: FieldOpsDashboardProps) {
  const [jobs, setJobs] = useState(initialJobs)
  const [activityItems, setActivityItems] = useState(activity)
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<JobStatus | "All">("All")
  const [priorityFilter, setPriorityFilter] = useState<JobPriority | "All">("All")

  function addActivity(title: string, description: string, jobId: string) {
    setActivityItems((currentActivity) => [
      {
        id: `activity-${Date.now()}`,
        jobId,
        title,
        description,
        timestamp: "Just now",
      },
      ...currentActivity,
    ])
  }

  function handleUpdateJobStatus(jobId: string, status: Job["status"]) {
    const jobToUpdate = jobs.find((job) => job.id === jobId)

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

    if (jobToUpdate && jobToUpdate.status !== status) {
      addActivity(
        "Status updated",
        `${jobToUpdate.customerName} moved from ${jobToUpdate.status} to ${status}.`,
        jobId
      )
    }
  }

  function handleAddJob(job: Job) {
    setJobs((currentJobs) => [job, ...currentJobs])

    addActivity(
      "New job added",
      `${job.customerName} was added to the ${job.status} stage.`,
      job.id
    )
  }


  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase().trim()

    const matchesSearch =
      query.length === 0 ||
      job.customerName.toLowerCase().includes(query) ||
      job.serviceType.toLowerCase().includes(query) ||
      job.address.toLowerCase().includes(query) ||
      job.notes?.toLowerCase().includes(query)

    const matchesStatus =
      statusFilter === "All" || job.status === statusFilter

    const matchesPriority =
      priorityFilter === "All" || job.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    statusFilter !== "All" ||
    priorityFilter !== "All"

  function clearFilters() {
    setSearchQuery("")
    setStatusFilter("All")
    setPriorityFilter("All")
  }

  const followUpJobs = getFollowUpJobs(filteredJobs)

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

            <button
              type="button"
              onClick={() => setIsAddJobModalOpen(true)}
              className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-200"
            >
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

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Find Work</h3>
                <p className="text-sm text-slate-400">
                  Search and filter the active job pipeline.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:items-end">
                <span className="text-sm text-slate-500">
                  Showing {filteredJobs.length} of {jobs.length} jobs
                </span>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
              <label className="relative">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40"
                  placeholder="Search customer, service, address, or notes..."
                />
              </label>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as JobStatus | "All")
                }
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-medium text-slate-100 outline-none transition focus:border-cyan-300/40"
              >
                {statusFilterOptions.map((option) => (
                  <option key={option} value={option} className="bg-[#080c16]">
                    {option === "All" ? "All statuses" : option}
                  </option>
                ))}
              </select>

              <select
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(event.target.value as JobPriority | "All")
                }
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-medium text-slate-100 outline-none transition focus:border-cyan-300/40"
              >
                {priorityFilterOptions.map((option) => (
                  <option key={option} value={option} className="bg-[#080c16]">
                    {option === "All" ? "All priorities" : option}
                  </option>
                ))}
              </select>
            </div>
            {filteredJobs.length === 0 && (
              <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-black/20 p-5 text-sm text-slate-400">
                No jobs match the current search or filters. Try clearing filters or
                adjusting the search terms.
              </div>
            )}
          </div>

          <PipelineBoard
            jobs={filteredJobs}
            onUpdateJobStatus={handleUpdateJobStatus}
          />

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <RecentJobs jobs={filteredJobs} />
            <FollowUpQueue jobs={followUpJobs} />
          </div>

          <ActivityFeed activity={activityItems} />
        </section>
      </div>
      <AddNewJobModal
        isOpen={isAddJobModalOpen}
        onClose={() => setIsAddJobModalOpen(false)}
        onAddJob={handleAddJob}
      />
    </main>
  )
}