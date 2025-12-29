"use client";

import { useEffect, useRef } from "react";
import { ChatBubbleBottomCenterIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline";
import type { Message } from "../lib/types";
import { formatTimestamp } from "../lib/utils/time";

interface Props {
  messages: Message[];
}

const roleMeta: Record<Message["role"], { label: string; icon: React.ElementType; bubble: string }> = {
  system: {
    label: "System",
    icon: ShieldCheckIcon,
    bubble: "bg-slate-800/60 text-slate-200 border-slate-700"
  },
  assistant: {
    label: "Jarvis",
    icon: ChatBubbleBottomCenterIcon,
    bubble: "bg-gradient-to-br from-sky-600/40 to-cyan-500/20 text-slate-100 border-sky-500/40"
  },
  user: {
    label: "You",
    icon: UserIcon,
    bubble: "bg-slate-800/80 text-slate-100 border-slate-700"
  }
};

const ConversationView = ({ messages }: Props) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
      {messages.map(message => {
        const meta = roleMeta[message.role];
        const Icon = meta.icon;
        return (
          <article
            key={message.id}
            className="group flex items-start gap-3 text-sm"
            aria-label={`${meta.label} message`}
          >
            <div className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-slate-800 text-slate-200">
              <Icon className="h-4 w-4" />
            </div>
            <div
              className={`flex-1 rounded-2xl border px-4 py-3 leading-relaxed shadow-sm transition group-hover:border-slate-500 ${meta.bubble}`}
            >
              <header className="mb-2 flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
                <span>{meta.label}</span>
                <span>{formatTimestamp(message.createdAt)}</span>
              </header>
              <pre className="whitespace-pre-wrap font-sans text-[0.925rem] text-slate-100">
                {message.content}
              </pre>
            </div>
          </article>
        );
      })}
      <div ref={endRef} />
    </div>
  );
};

export default ConversationView;
