import { Clock, MessageSquareText } from "lucide-react"

import type { Job } from "../types"

type FollowUpQueueProps = {
    jobs: Job[]
}

export function FollowUpQueue({ jobs }: FollowUpQueueProps) {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">Follow-Up Queue</h3>
                    <p className="text-sm text-slate-400">Work that needs attention.</p>
                </div>

                <Clock className="text-cyan-300" size={22} />
            </div>

            <div className="space-y-3">
                {jobs.slice(0, 3).map((job) => (
                    <div
                        key={job.id}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                        <div className="mb-3 flex items-start justify-between gap-3">
                            <div>
                                <p className="font-medium text-slate-100">{job.customerName}</p>
                                <p className="text-sm text-slate-400">{job.serviceType}</p>
                            </div>

                            <span className="rounded-full bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-200">
                                {job.priority}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <MessageSquareText size={16} />
                            <span>{job.notes}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}