import { CalendarDays, Mail, MapPin, Phone, X } from "lucide-react"

import type { Job } from "../types"
import { formatCurrency } from "../utils/calculations"

type JobDetailDrawerProps = {
  job: Job | null
  onClose: () => void
}

export function JobDetailDrawer({ job, onClose }: JobDetailDrawerProps) {
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

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
            Update Status
          </button>

          <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]">
            Add Follow-Up Note
          </button>
        </div>
      </aside>
    </div>
  )
}