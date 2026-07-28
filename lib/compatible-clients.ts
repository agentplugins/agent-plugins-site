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
  };
  supports: {
    skills?: true;
    mcp?: McpSupport;
  };
};

export const compatibleClients: readonly CompatibleClient[] = [];
