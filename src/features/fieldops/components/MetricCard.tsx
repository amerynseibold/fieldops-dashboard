import type { LucideIcon } from "lucide-react"

type MetricCardProps = {
  label: string
  value: string
  detail: string
  icon: LucideIcon
}

export function MetricCard({ label, value, detail, icon: Icon }: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10">
      <div className="mb-5 flex items-center justify-between">
        <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
          <Icon size={20} />
        </div>

        <span className="text-xs text-slate-500">Live Demo</span>
      </div>

      <p className="text-sm text-slate-400">{label}</p>

      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>

      <p className="mt-2 text-sm text-emerald-300">{detail}</p>
    </div>
  )
}