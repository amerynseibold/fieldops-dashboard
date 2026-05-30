import type { ActivityItem } from "../types"

type ActivityFeedProps = {
  activity: ActivityItem[]
}

export function ActivityFeed({ activity }: ActivityFeedProps) {
  return (
    <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/10">
      <div className="mb-5">
        <h3 className="text-lg font-semibold">Live Operational Activity</h3>
        <p className="text-sm text-slate-400">
          Recent updates across quotes, jobs, scheduling, and follow-ups.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {activity.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <p className="font-medium text-slate-100">{item.title}</p>

            <p className="mt-2 text-sm text-slate-400">{item.description}</p>

            <p className="mt-4 text-xs text-cyan-300">{item.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  )
}