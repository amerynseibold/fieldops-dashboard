import { CalendarDays, Mail, MapPin, Phone, X } from "lucide-react"

import type { Job, JobStatus } from "../types"
import { formatCurrency } from "../utils/calculations"

type JobDetailDrawerProps = {
    job: Job | null
    onClose: () => void
    onUpdateJobStatus: (jobId: string, status: JobStatus) => void
}

const jobStatuses: JobStatus[] = [
    "New Lead",
    "Quoted",
    "Approved",
    "Scheduled",
    "In Progress",
    "Completed",
    "Paid",
    "Lost",
]

export function JobDetailDrawer({
    job,
    onClose,
    onUpdateJobStatus,
}: JobDetailDrawerProps) {
    if (!job) {
        return null
    }

    return (
        <div className="fixed inset-0 z-50">
            <button
                type="button"
                aria-label="Close job details"
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#080c16] p-6 shadow-2xl shadow-black/40">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm text-cyan-300">Job Details</p>
                        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-100">
                            {job.customerName}
                        </h2>
                        <p className="mt-2 text-sm text-slate-400">{job.serviceType}</p>
                    </div>

                    <button
                        type="button"
                        className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
                        onClick={onClose}
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="mb-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <p className="text-xs text-slate-500">Status</p>
                        <p className="mt-2 text-sm font-semibold text-cyan-200">
                            {job.status}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <p className="text-xs text-slate-500">Priority</p>
                        <p className="mt-2 text-sm font-semibold text-amber-200">
                            {job.priority}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <p className="text-xs text-slate-500">Value</p>
                        <p className="mt-2 text-sm font-semibold text-emerald-200">
                            {formatCurrency(job.estimatedValue)}
                        </p>
                    </div>
                </div>

                <div className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <h3 className="text-sm font-semibold text-slate-100">
                        Customer Information
                    </h3>

                    <div className="flex gap-3 text-sm text-slate-400">
                        <MapPin className="mt-0.5 shrink-0 text-cyan-300" size={17} />
                        <span>{job.address}</span>
                    </div>

                    <div className="flex gap-3 text-sm text-slate-400">
                        <Phone className="mt-0.5 shrink-0 text-cyan-300" size={17} />
                        <span>{job.phone}</span>
                    </div>

                    {job.email && (
                        <div className="flex gap-3 text-sm text-slate-400">
                            <Mail className="mt-0.5 shrink-0 text-cyan-300" size={17} />
                            <span>{job.email}</span>
                        </div>
                    )}
                </div>

                <div className="mt-4 space-y-3 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <h3 className="text-sm font-semibold text-slate-100">
                        Timeline
                    </h3>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-black/20 p-4">
                            <p className="text-xs text-slate-500">Created</p>
                            <p className="mt-2 text-sm text-slate-300">{job.createdAt}</p>
                        </div>

                        {job.quoteSentAt && (
                            <div className="rounded-2xl bg-black/20 p-4">
                                <p className="text-xs text-slate-500">Quote Sent</p>
                                <p className="mt-2 text-sm text-slate-300">
                                    {job.quoteSentAt}
                                </p>
                            </div>
                        )}

                        {job.followUpDate && (
                            <div className="rounded-2xl bg-black/20 p-4">
                                <p className="text-xs text-slate-500">Follow-Up</p>
                                <p className="mt-2 text-sm text-cyan-300">
                                    {job.followUpDate}
                                </p>
                            </div>
                        )}

                        {job.scheduledDate && (
                            <div className="rounded-2xl bg-black/20 p-4">
                                <p className="text-xs text-slate-500">Scheduled</p>
                                <p className="mt-2 text-sm text-emerald-300">
                                    {job.scheduledDate}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {job.notes && (
                    <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                        <h3 className="text-sm font-semibold text-slate-100">Notes</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-400">
                            {job.notes}
                        </p>
                    </div>
                )}

                <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-100">Status Override</p>
                            <p className="mt-1 text-sm text-slate-500">
                                Manually move this job if it was updated by mistake.
                            </p>
                        </div>

                        <select
                            value={job.status}
                            onChange={(event) =>
                                onUpdateJobStatus(job.id, event.target.value as JobStatus)
                            }
                            className="rounded-2xl border border-white/10 bg-[#050812] px-4 py-3 text-sm font-semibold text-slate-100 outline-none transition focus:border-cyan-300/40"
                        >
                            {jobStatuses.map((status) => (
                                <option key={status} value={status} className="bg-[#050812]">
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <div>
                        <p className="text-sm font-semibold text-slate-100">Recommended Actions</p>
                        <p className="mt-1 text-sm text-slate-500">
                            Mock workflow actions based on this job&apos;s current status.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {job.status === "New Lead" && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => onUpdateJobStatus(job.id, "Quoted")}
                                    className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                                >
                                    Create Quote
                                </button>

                                <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]">
                                    Log First Contact
                                </button>
                            </>
                        )}

                        {job.status === "Quoted" && (
                            <>
                                <button className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                                    Send Follow-Up
                                </button>

                                <button
                                    type="button"
                                    onClick={() => onUpdateJobStatus(job.id, "Approved")}
                                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                                >
                                    Mark as Approved
                                </button>
                            </>
                        )}

                        {job.status === "Approved" && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => onUpdateJobStatus(job.id, "Scheduled")}
                                    className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                                >
                                    Schedule Job
                                </button>

                                <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]">
                                    Assign Crew
                                </button>
                            </>
                        )}

                        {job.status === "Scheduled" && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => onUpdateJobStatus(job.id, "In Progress")}
                                    className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                                >
                                    Mark In Progress
                                </button>

                                <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]">
                                    Send Reminder
                                </button>
                            </>
                        )}

                        {job.status === "In Progress" && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => onUpdateJobStatus(job.id, "Completed")}
                                    className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                                >
                                    Mark Complete
                                </button>

                                <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]">
                                    Add Job Note
                                </button>
                            </>
                        )}

                        {job.status === "Completed" && (
                            <>
                                <button className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                                    Create Invoice Task
                                </button>

                                <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]">
                                    Request Review
                                </button>
                            </>
                        )}

                        {job.status === "Paid" && (
                            <>
                                <button className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                                    Propose Recurring Work
                                </button>

                                <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]">
                                    Archive Job
                                </button>
                            </>
                        )}

                        {job.status === "Lost" && (
                            <>
                                <button className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                                    Reopen Lead
                                </button>

                                <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]">
                                    Add Loss Reason
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </aside>
        </div>
    )
}