import { LayoutDashboard } from "lucide-react"

const navItems = [
  "Overview",
  "Pipeline",
  "Jobs",
  "Customers",
  "Follow-Ups",
  "Reports",
]

export function Sidebar() {
  return (
    <aside className="hidden w-72 border-r border-white/10 bg-white/[0.03] px-5 py-6 lg:block">
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
            <LayoutDashboard size={22} />
          </div>

          <div>
            <p className="text-sm text-slate-400">Auxilium Demo</p>
            <h1 className="text-lg font-semibold tracking-tight">FieldOps</h1>
          </div>
        </div>
      </div>

      <nav className="space-y-2 text-sm">
        {navItems.map((item, index) => (
          <div
            key={item}
            className={`rounded-xl px-4 py-3 ${
              index === 0
                ? "bg-cyan-400/10 text-cyan-200"
                : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-100"
            }`}
          >
            {item}
          </div>
        ))}
      </nav>
    </aside>
  )
}