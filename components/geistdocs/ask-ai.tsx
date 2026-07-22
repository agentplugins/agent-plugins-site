"use client";

import { MessageCircleIcon } from "lucide-react";
import { siteUrl } from "@/geistdocs";
import { useChatContext } from "@/hooks/geistdocs/use-chat";

interface AskAIProps {
  href: string;
}

export const AskAI = ({ href }: AskAIProps) => {
  const { setIsOpen, setPrompt } = useChatContext();

  const url = new URL(href, siteUrl).toString();
  const query = `Read this page, I want to ask questions about it. ${url}`;

  return (
    <button
      className="flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
      onClick={() => {
        setPrompt(query);
        setIsOpen(true);
      }}
      type="button"
    >
      <MessageCircleIcon className="size-3.5" />
      <span>Ask AI about this page</span>
    </button>
  );
};
