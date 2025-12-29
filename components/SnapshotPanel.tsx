import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import type { AssistantStateSnapshot } from "../lib/types";
import { formatTimestamp } from "../lib/utils/time";

interface Props {
  snapshots: AssistantStateSnapshot[];
  onRestore: (snapshotId: string) => void;
}

const SnapshotPanel = ({ snapshots, onRestore }: Props) => (
  <section className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-5">
    <header className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
      <ArrowUturnLeftIcon className="h-5 w-5 text-sky-400" />
      Snapshots
    </header>
    {snapshots.length === 0 ? (
      <p className="text-xs text-slate-500">Create a snapshot to enable quick rollback.</p>
    ) : (
      <ul className="space-y-2 text-xs text-slate-300">
        {snapshots.slice(0, 4).map(snapshot => (
          <li
            key={snapshot.id}
            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/30 px-3 py-2"
          >
            <div>
              <p className="font-semibold text-slate-100">{snapshot.label}</p>
              <p className="text-[10px] uppercase tracking-wide text-slate-500">
                {formatTimestamp(snapshot.timestamp)} • {snapshot.messages.length} messages
              </p>
            </div>
            <button
              type="button"
              onClick={() => onRestore(snapshot.id)}
              className="rounded-md border border-slate-600 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-200 transition hover:border-slate-400 hover:bg-slate-800"
            >
              Restore
            </button>
          </li>
        ))}
      </ul>
    )}
  </section>
);

export default SnapshotPanel;
