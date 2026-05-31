"use client"

import { ArrowRight, Eye } from "lucide-react"
import { useState } from "react"

import type { Job, JobStatus } from "../types"
import {
    formatCurrency,
    getPriorityStyles,
    getStatusStyles,
} from "../utils/calculations"
import { JobDetailDrawer } from "./JobDetailDrawer"

type PipelineBoardProps = {
    jobs: Job[]
    onUpdateJobStatus: (jobId: string, status: JobStatus) => void
}

const pipelineStatuses: JobStatus[] = [
    "New Lead",
    "Quoted",
    "Approved",
    "Scheduled",
    "In Progress",
    "Completed",
]

export function PipelineBoard({
    jobs,
    onUpdateJobStatus,
}: PipelineBoardProps) {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)

    return (
        <>
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10">
                <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                        <h3 className="text-lg font-semibold">Pipeline Board</h3>
                        <p className="text-sm text-slate-400">
                            Track active work from new lead to completed job.
                        </p>
                    </div>

                    <span className="w-fit rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200">
                        {jobs.length} total jobs
                    </span>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-3">
                    {pipelineStatuses.map((status) => {
                        const statusJobs = jobs.filter((job) => job.status === status)
                        const columnValue = statusJobs.reduce(
                            (total, job) => total + job.estimatedValue,
                            0
                        )

                        return (
                            <div
                                key={status}
                                className="w-[280px] shrink-0 rounded-2xl border border-white/10 bg-black/20 p-3"
                            >
                                <div className="mb-3 flex items-start justify-between gap-3">
                                    <div>
                                        <span
                                            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusStyles(
                                                status
                                            )}`}
                                        >
                                            {status}
                                        </span>

                                        <p className="mt-1 text-xs text-slate-500">
                                            {statusJobs.length} jobs · {formatCurrency(columnValue)}
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-300">
                                        {statusJobs.length}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {statusJobs.length > 0 ? (
                                        statusJobs.map((job) => (
                                            <button
                                                type="button"
                                                key={job.id}
                                                onClick={() => setSelectedJob(job)}
                                                className="w-full cursor-pointer rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.04]"
                                            >
                                                <div className="mb-3 flex items-start justify-between gap-3">
                                                    <div>
                                                        <p className="font-medium text-slate-100">
                                                            {job.customerName}
                                                        </p>
                                                        <p className="mt-1 text-xs text-slate-400">
                                                            {job.serviceType}
                                                        </p>
                                                    </div>

                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityStyles(
                                                            job.priority
                                                        )}`}
                                                    >
                                                        {job.priority}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-slate-500">Value</span>
                                                    <span className="font-semibold text-slate-100">
                                                        {formatCurrency(job.estimatedValue)}
                                                    </span>
                                                </div>

                                                {job.followUpDate && (
                                                    <p className="mt-3 text-xs text-cyan-300">
                                                        Follow-up: {job.followUpDate}
                                                    </p>
                                                )}

                                                {job.scheduledDate && (
                                                    <p className="mt-3 text-xs text-emerald-300">
                                                        Scheduled: {job.scheduledDate}
                                                    </p>
                                                )}

                                                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-slate-500">
                                                    <span className="inline-flex items-center gap-1">
                                                        <Eye size={14} />
                                                        View details
                                                    </span>

                                                    <ArrowRight size={14} className="text-cyan-300" />
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="rounded-2xl border border-dashed border-white/10 p-4 text-center text-xs text-slate-500">
                                            No jobs in this stage
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <JobDetailDrawer
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
                onUpdateJobStatus={(jobId, status) => {
                    onUpdateJobStatus(jobId, status)
                    setSelectedJob((currentJob) =>
                        currentJob && currentJob.id === jobId
                            ? {
                                ...currentJob,
                                status,
                            }
                            : currentJob
                    )
                }}
            />
        </>
    )
}