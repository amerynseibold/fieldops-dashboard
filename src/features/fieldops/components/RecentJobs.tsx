import { CheckCircle2 } from "lucide-react"

import type { Job } from "../types"
import { formatCurrency } from "../utils/calculations"

type RecentJobsProps = {
  jobs: Job[]
}

export function RecentJobs({ jobs }: RecentJobsProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Recent Job Activity</h3>
          <p className="text-sm text-slate-400">
            Latest quote, scheduling, and job status updates.
          </p>
        </div>

        <CheckCircle2 className="text-cyan-300" size={22} />
      </div>

      <div className="space-y-3">
        {jobs.slice(0, 4).map((job) => (
          <div
            key={job.id}
            className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center"
          >
            <div>
              <p className="font-medium text-slate-100">{job.customerName}</p>
              <p className="text-sm text-slate-400">{job.serviceType}</p>
            </div>

            <span className="w-fit rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200">
              {job.status}
            </span>

            <p className="font-semibold text-slate-100">
              {formatCurrency(job.estimatedValue)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}