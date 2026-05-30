import type { Job, JobPriority, JobStatus } from "../types"

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export function getPipelineValue(jobs: Job[]) {
  return jobs
    .filter((job) => job.status !== "Lost" && job.status !== "Paid")
    .reduce((total, job) => total + job.estimatedValue, 0)
}

export function getOpenJobs(jobs: Job[]) {
  return jobs.filter(
    (job) =>
      job.status !== "Completed" &&
      job.status !== "Paid" &&
      job.status !== "Lost"
  ).length
}

export function getScheduledThisWeek(jobs: Job[]) {
  return jobs.filter((job) => job.status === "Scheduled").length
}

export function getConversionRate(jobs: Job[]) {
  const closedJobs = jobs.filter(
    (job) => job.status === "Paid" || job.status === "Lost"
  )

  if (closedJobs.length === 0) {
    return 0
  }

  const wonJobs = closedJobs.filter((job) => job.status === "Paid")

  return Math.round((wonJobs.length / closedJobs.length) * 100)
}

export function getFollowUpJobs(jobs: Job[]) {
  return jobs.filter((job) =>
    ["New Lead", "Quoted", "Approved", "Completed"].includes(job.status)
  )
}


export function getStatusStyles(status: JobStatus) {
  const styles: Record<JobStatus, string> = {
    "New Lead": "border-blue-300/20 bg-blue-300/10 text-blue-200",
    Quoted: "border-cyan-300/20 bg-cyan-300/10 text-cyan-200",
    Approved: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
    Scheduled: "border-violet-300/20 bg-violet-300/10 text-violet-200",
    "In Progress": "border-amber-300/20 bg-amber-300/10 text-amber-200",
    Completed: "border-teal-300/20 bg-teal-300/10 text-teal-200",
    Paid: "border-green-300/20 bg-green-300/10 text-green-200",
    Lost: "border-rose-300/20 bg-rose-300/10 text-rose-200",
  }

  return styles[status]
}

export function getPriorityStyles(priority: JobPriority) {
  const styles: Record<JobPriority, string> = {
    Low: "bg-slate-300/10 text-slate-300",
    Medium: "bg-amber-300/10 text-amber-200",
    High: "bg-rose-300/10 text-rose-200",
  }

  return styles[priority]
}