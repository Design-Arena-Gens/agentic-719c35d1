"use client";

import { useState } from "react";
import { ArrowPathIcon, BoltIcon, Cog6ToothIcon, SparklesIcon } from "@heroicons/react/24/outline";
import ConversationView from "./ConversationView";
import Composer from "./Composer";
import PlanPanel from "./PlanPanel";
import ModuleManager from "./ModuleManager";
import LogPanel from "./LogPanel";
import SnapshotPanel from "./SnapshotPanel";
import { useAssistantStore } from "../lib/stores/assistant";
import { formatTimestamp } from "../lib/utils/time";

const AssistantShell = () => {
  const [draft, setDraft] = useState("");
  const sessionId = useAssistantStore(state => state.sessionId);
  const messages = useAssistantStore(state => state.messages);
  const plan = useAssistantStore(state => state.plan);
  const modules = useAssistantStore(state => state.modules);
  const logs = useAssistantStore(state => state.logs);
  const snapshots = useAssistantStore(state => state.snapshots);
  const sendMessage = useAssistantStore(state => state.sendMessage);
  const toggleModule = useAssistantStore(state => state.toggleModule);
  const createSnapshot = useAssistantStore(state => state.createSnapshot);
  const restoreSnapshot = useAssistantStore(state => state.restoreSnapshot);

  const handleSubmit = () => {
    const content = draft.trim();
    if (!content) {
      return;
    }
    sendMessage(content);
    setDraft("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <div>
            <p className="text-sm text-slate-400">Session</p>
            <p className="font-mono text-xs text-slate-300">{sessionId}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 rounded-full border border-emerald-400/50 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              <SparklesIcon className="h-4 w-4" />
              Offline-first
            </span>
            <span className="flex items-center gap-1 rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-xs text-blue-200">
              <BoltIcon className="h-4 w-4" />
              Deterministic
            </span>
            <button
              type="button"
              className="flex items-center gap-2 rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-200 transition hover:border-slate-500 hover:bg-slate-700"
              onClick={() => {
                const snapshot = createSnapshot();
                console.info("Snapshot created:", snapshot.id);
              }}
            >
              <ArrowPathIcon className="h-4 w-4" />
              Snapshot
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-6 py-6">
        <section className="flex w-full flex-1 flex-col rounded-3xl border border-slate-800/80 bg-slate-900/60 shadow-soft">
          <ConversationView messages={messages} />
          <Composer
            value={draft}
            onChange={setDraft}
            onSubmit={handleSubmit}
            placeholder="Sync with Jarvis…"
          />
        </section>

        <aside className="flex w-96 flex-col gap-6">
          <PlanPanel plan={plan} lastUpdated={messages.at(-1)?.createdAt} />
          <ModuleManager modules={modules} onToggle={toggleModule} />
          <SnapshotPanel snapshots={snapshots} onRestore={restoreSnapshot} />
          <LogPanel logs={logs} />
        </aside>
      </main>

      <footer className="border-t border-slate-800/70 bg-slate-900/70">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3 text-xs text-slate-500">
          <span>Jarvis build 1.0.0 — Local-first, mentor oriented.</span>
          <span className="flex items-center gap-1">
            <Cog6ToothIcon className="h-4 w-4" />
            Updated {messages.length ? formatTimestamp(messages[messages.length - 1].createdAt) : "just now"}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default AssistantShell;
