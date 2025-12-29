import { BoltIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import type { AssistantPlan } from "../lib/types";
import { formatTimestamp } from "../lib/utils/time";

interface Props {
  plan: AssistantPlan | null;
  lastUpdated?: number;
}

const PlanPanel = ({ plan, lastUpdated }: Props) => {
  if (!plan) {
    return (
      <section className="rounded-3xl border border-slate-800/80 bg-slate-900/50 p-5">
        <header className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
          <BoltIcon className="h-5 w-5 text-sky-400" />
          Execution Plan
        </header>
        <p className="text-xs text-slate-500">
          Send a message to bootstrap a deterministic plan. Jarvis will keep steps short and verifiable.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-soft">
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <BoltIcon className="h-5 w-5 text-sky-400" />
          Execution Plan
        </div>
        <span className="text-[10px] uppercase tracking-wide text-slate-500">
          {lastUpdated ? `Updated ${formatTimestamp(lastUpdated)}` : "Pending"}
        </span>
      </header>
      <p className="mb-3 text-sm text-slate-300">{plan.headline}</p>
      <ul className="space-y-2">
        {plan.actions.map(action => (
          <li
            key={action.id}
            className="flex items-start gap-2 rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-2 text-xs text-slate-300"
          >
            {action.status === "complete" ? (
              <CheckCircleIcon className="mt-0.5 h-4 w-4 text-emerald-400" />
            ) : (
              <ExclamationTriangleIcon className="mt-0.5 h-4 w-4 text-sky-400" />
            )}
            <div>
              <p className="font-semibold text-slate-200">{action.label}</p>
              <p className="text-[10px] uppercase tracking-wide text-slate-500">
                Effort: {action.effort} • Status: {action.status}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <footer className="mt-4 rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-2 text-xs text-slate-400">
        Energy score: <span className="font-mono text-sky-300">{plan.energyScore}</span>
      </footer>
    </section>
  );
};

export default PlanPanel;
