"use client";

import { FormEvent } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useDebounce } from "use-debounce";

interface Props {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const Composer = ({ value, placeholder, onChange, onSubmit }: Props) => {
  const [debounced] = useDebounce(value, 250);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-slate-800/90 bg-slate-900/80 p-6">
      <div className="rounded-xl border border-slate-700 bg-slate-900 shadow-inner focus-within:border-sky-400/60">
        <textarea
          value={value}
          onChange={event => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-24 w-full resize-none rounded-xl bg-transparent p-4 text-sm text-slate-100 outline-none placeholder:text-slate-500"
          spellCheck
        />
        <div className="flex items-center justify-between border-t border-slate-800 px-4 py-3 text-xs text-slate-500">
          <div>
            <span className="font-mono text-slate-400">Checksum:</span> {debounced.length}
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-sky-500 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default Composer;
