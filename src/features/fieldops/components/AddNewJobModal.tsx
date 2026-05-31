"use client"

import { X } from "lucide-react"
import { useState } from "react"

import type { Job, JobPriority, JobStatus } from "../types"

type AddNewJobModalProps = {
    isOpen: boolean
    onClose: () => void
    onAddJob: (job: Job) => void
}

const statusOptions: JobStatus[] = [
    "New Lead",
    "Quoted",
    "Approved",
    "Scheduled",
    "In Progress",
    "Completed",
    "Paid",
    "Lost",
]

const priorityOptions: JobPriority[] = ["Low", "Medium", "High"]

export function AddNewJobModal({
    isOpen,
    onClose,
    onAddJob,
}: AddNewJobModalProps) {
    const [customerName, setCustomerName] = useState("")
    const [serviceType, setServiceType] = useState("")
    const [estimatedValue, setEstimatedValue] = useState("")
    const [status, setStatus] = useState<JobStatus>("New Lead")
    const [priority, setPriority] = useState<JobPriority>("Medium")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [notes, setNotes] = useState("")

    if (!isOpen) {
        return null
    }

    function resetForm() {
        setCustomerName("")
        setServiceType("")
        setEstimatedValue("")
        setStatus("New Lead")
        setPriority("Medium")
        setAddress("")
        setPhone("")
        setEmail("")
        setNotes("")
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const newJob: Job = {
            id: `job-${Date.now()}`,
            customerName,
            serviceType,
            status,
            priority,
            estimatedValue: Number(estimatedValue),
            address,
            phone,
            email: email || undefined,
            createdAt: new Date().toISOString().split("T")[0],
            followUpDate: status === "New Lead" || status === "Quoted"
                ? new Date().toISOString().split("T")[0]
                : undefined,
            notes: notes || undefined,
        }

        onAddJob(newJob)
        resetForm()
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50">
            <button
                type="button"
                aria-label="Close add job modal"
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="absolute left-1/2 top-1/2 max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-white/10 bg-[#080c16] p-6 shadow-2xl shadow-black/40">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm text-cyan-300">Create Job</p>
                        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-100">
                            Add New Job
                        </h2>
                        <p className="mt-2 text-sm text-slate-400">
                            Add a new lead, quote, or active job to the FieldOps pipeline.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
                        onClick={onClose}
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2">
                            <span className="text-sm font-medium text-slate-300">
                                Customer Name
                            </span>
                            <input
                                required
                                value={customerName}
                                onChange={(event) => setCustomerName(event.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40"
                                placeholder="Example: Miller Residence"
                            />
                        </label>

                        <label className="space-y-2">
                            <span className="text-sm font-medium text-slate-300">
                                Service Type
                            </span>
                            <input
                                required
                                value={serviceType}
                                onChange={(event) => setServiceType(event.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40"
                                placeholder="Example: Tree removal"
                            />
                        </label>

                        <label className="space-y-2">
                            <span className="text-sm font-medium text-slate-300">
                                Estimated Value
                            </span>
                            <input
                                required
                                min="0"
                                type="number"
                                value={estimatedValue}
                                onChange={(event) => setEstimatedValue(event.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40"
                                placeholder="2500"
                            />
                        </label>

                        <label className="space-y-2">
                            <span className="text-sm font-medium text-slate-300">
                                Phone
                            </span>
                            <input
                                required
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40"
                                placeholder="(214) 555-0184"
                            />
                        </label>

                        <label className="space-y-2">
                            <span className="text-sm font-medium text-slate-300">
                                Status
                            </span>
                            <select
                                value={status}
                                onChange={(event) => setStatus(event.target.value as JobStatus)}
                                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/40"
                            >
                                {statusOptions.map((option) => (
                                    <option key={option} value={option} className="bg-[#080c16]">
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="space-y-2">
                            <span className="text-sm font-medium text-slate-300">
                                Priority
                            </span>
                            <select
                                value={priority}
                                onChange={(event) =>
                                    setPriority(event.target.value as JobPriority)
                                }
                                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/40"
                            >
                                {priorityOptions.map((option) => (
                                    <option key={option} value={option} className="bg-[#080c16]">
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-300">Address</span>
                        <input
                            required
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40"
                            placeholder="123 Main St, McKinney, TX"
                        />
                    </label>

                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-300">
                            Email optional
                        </span>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40"
                            placeholder="customer@example.com"
                        />
                    </label>

                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-300">Notes</span>
                        <textarea
                            rows={4}
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                            className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40"
                            placeholder="Add customer request details, site notes, or follow-up context..."
                        />
                    </label>

                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                            onClick={() => {
                                resetForm()
                                onClose()
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                        >
                            Add Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}