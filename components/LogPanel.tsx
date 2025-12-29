import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import type { LogEntry } from "../lib/types";
import { formatTimestamp } from "../lib/utils/time";

interface Props {
  logs: LogEntry[];
}

const LogPanel = ({ logs }: Props) => (
  <section className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-5">
    <header className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
      <ClipboardDocumentListIcon className="h-5 w-5 text-sky-400" />
      Audit Log
    </header>
    <div className="max-h-48 space-y-2 overflow-y-auto pr-1 text-xs text-slate-400">
      {logs.length === 0 ? (
        <p>No events recorded yet.</p>
      ) : (
        logs
          .slice(-12)
          .reverse()
          .map(log => (
            <article
              key={log.id}
              className="rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-2"
            >
              <header className="flex items-center justify-between text-[10px] uppercase tracking-wide text-slate-500">
                <span>{log.label}</span>
                <span>{formatTimestamp(log.timestamp)}</span>
              </header>
              <p className="mt-1 text-slate-300">{log.details}</p>
            </article>
          ))
      )}
    </div>
  </section>
);

export default LogPanel;
