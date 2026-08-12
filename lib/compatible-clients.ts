export const mcpTransports = [
  "stdio",
  "streamable-http",
  "sse",
] as const;

export type McpTransport = (typeof mcpTransports)[number];

type McpSupport = {
  transports: readonly [McpTransport, ...McpTransport[]];
};

export type CompatibleClient = {
  name: string;
  description: string;
  homepageUrl: string;
  instructionsUrl?: string;
  sourceUrl?: string;
  logo?: {
    lightSrc: string;
    darkSrc?: string;
    alt?: string;
    scale?: number;
  };
  supports: {
    skills?: true;
    mcp?: McpSupport;
  };
};

export const compatibleClients: readonly CompatibleClient[] = [
  {
    name: "VS Code",
    description:
      "Visual Studio Code combines the simplicity of a code editor with what developers need for their core edit-build-debug cycle.",
    homepageUrl: "https://code.visualstudio.com/",
    instructionsUrl:
      "https://code.visualstudio.com/docs/agent-customization/agent-plugins",
    sourceUrl: "https://github.com/microsoft/vscode",
    logo: {
      lightSrc: "/images/logos/vscode/light.svg",
      darkSrc: "/images/logos/vscode/dark.svg",
    },
    supports: {
      skills: true,
      mcp: {
        transports: ["stdio", "streamable-http", "sse"],
      },
    },
  },
  {
    name: "Cursor",
    description:
      "Cursor is an AI editor and coding agent. Use it to understand your codebase, plan and build features, fix bugs, review changes, and work with the tools you already use.",
    homepageUrl: "https://cursor.com/",
    instructionsUrl: "https://cursor.com/docs/plugins",
    logo: {
      lightSrc: "/images/logos/cursor/light.svg",
      darkSrc: "/images/logos/cursor/dark.svg",
    },
    supports: {
      skills: true,
      mcp: {
        transports: ["stdio", "streamable-http", "sse"],
      },
    },
  },
  {
    name: "GitHub Copilot",
    description:
      "GitHub Copilot is an AI coding assistant that helps developers build, understand, and ship software across editors, terminals, GitHub, and its desktop app.",
    homepageUrl: "https://github.com/features/copilot",
    instructionsUrl:
      "https://docs.github.com/en/copilot/concepts/agents/about-plugins",
    logo: {
      lightSrc: "/images/logos/github/light.svg",
      darkSrc: "/images/logos/github/dark.svg",
    },
    supports: {
      skills: true,
      mcp: {
        transports: ["stdio", "streamable-http", "sse"],
      },
    },
  },
  {
    name: "ChatGPT & Codex",
    description:
      "ChatGPT brings together agents for different kinds of work, including Codex for software development and ChatGPT Work for broader work. Use ChatGPT across desktop, web, and mobile, with Codex also available in your editor and terminal.",
    homepageUrl: "https://chatgpt.com/codex/",
    instructionsUrl: "https://developers.openai.com/plugins",
    sourceUrl: "https://github.com/openai/codex",
    logo: {
      lightSrc: "/images/logos/chatgpt/light.svg",
      darkSrc: "/images/logos/chatgpt/dark.svg",
      alt: "ChatGPT",
    },
    supports: {
      skills: true,
      mcp: {
        transports: ["stdio", "streamable-http"],
      },
    },
  },
  {
    name: "Kiro",
    description:
      "Kiro helps you do your best work by bringing structure to AI coding with spec-driven development.",
    homepageUrl: "https://kiro.dev/",
    instructionsUrl: "https://kiro.dev/docs/powers/",
    logo: {
      lightSrc: "/images/logos/kiro/light.svg",
      darkSrc: "/images/logos/kiro/dark.svg",
    },
    supports: {
      skills: true,
      mcp: {
        transports: ["stdio", "streamable-http", "sse"],
      },
    },
  },
  {
    name: "Hermes Agent",
    description:
      "Hermes Agent is a personal AI agent that runs across a CLI, a desktop app, and messaging platforms. It learns across sessions, runs scheduled jobs, and drives a real terminal and browser.",
    homepageUrl: "https://hermes-agent.nousresearch.com/",
    instructionsUrl:
      "https://hermes-agent.nousresearch.com/docs/developer-guide/plugins#portable-agent-plugins-v1-packages",
    sourceUrl: "https://github.com/NousResearch/hermes-agent",
    logo: {
      lightSrc: "/images/logos/hermes/light.svg",
      darkSrc: "/images/logos/hermes/dark.svg",
      alt: "Hermes Agent",
    },
    supports: {
      skills: true,
      mcp: {
        transports: ["stdio", "streamable-http"],
      },
    },
  },
  {
    name: "OpenClaw",
    description:
      "OpenClaw is an open-source personal AI assistant that runs locally and connects to the messaging platforms and tools you already use.",
    homepageUrl: "https://openclaw.ai/",
    instructionsUrl: "https://docs.openclaw.ai/plugins/bundles",
    sourceUrl: "https://github.com/openclaw/openclaw",
    logo: {
      lightSrc: "/images/logos/openclaw/light.svg",
      darkSrc: "/images/logos/openclaw/dark.svg",
      alt: "OpenClaw",
    },
    supports: {
      skills: true,
      mcp: {
        transports: ["stdio", "streamable-http", "sse"],
      },
    },
  },
  {
    name: "Grok Bot",
    description:
      "Grok Bot is xAI's team of always-on AI agents. Bots work on a persistent cloud computer, sign into apps and tools, and finish multi-step jobs end to end from desktop and iOS.",
    homepageUrl: "https://x.ai/bot",
    instructionsUrl:
      "https://docs.x.ai/grok-bot/skills-routines-and-automations",
    logo: {
      lightSrc: "/images/logos/grok-bot/light.svg",
      darkSrc: "/images/logos/grok-bot/dark.svg",
      alt: "Grok",
      scale: 0.7,
    },
    supports: {
      skills: true,
      mcp: {
        transports: ["stdio", "streamable-http", "sse"],
      },
    },
  },
];
