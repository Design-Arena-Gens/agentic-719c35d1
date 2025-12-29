import { Switch } from "@headlessui/react";
import { PuzzlePieceIcon } from "@heroicons/react/24/outline";
import type { ModuleDescriptor } from "../lib/types";

interface Props {
  modules: ModuleDescriptor[];
  onToggle: (moduleId: string) => void;
}

const ModuleManager = ({ modules, onToggle }: Props) => (
  <section className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-5">
    <header className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-200">
      <PuzzlePieceIcon className="h-5 w-5 text-sky-400" />
      Module Deck
    </header>
    <ul className="space-y-3 text-sm text-slate-300">
      {modules.map(module => (
        <li
          key={module.id}
          className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/30 px-3 py-3"
        >
          <div>
            <p className="font-semibold text-slate-100">{module.name}</p>
            <p className="text-xs text-slate-500">{module.description}</p>
            <p className="text-[10px] uppercase tracking-wide text-slate-600">
              {module.category} • v{module.version}
            </p>
          </div>
          <Switch
            checked={module.enabled}
            onChange={() => onToggle(module.id)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
              module.enabled ? "bg-sky-500/80" : "bg-slate-700"
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ${
                module.enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </Switch>
        </li>
      ))}
    </ul>
  </section>
);

export default ModuleManager;
