"use client";

import {
  ArrowDownAZIcon,
  BookOpenTextIcon,
  CheckIcon,
  Code2Icon,
  ExternalLinkIcon,
  ShuffleIcon,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  compatibleClients,
  type CompatibleClient,
  type McpTransport,
} from "@/lib/compatible-clients";
import { cn } from "@/lib/utils";

const mcpTransportLabels: Record<McpTransport, string> = {
  stdio: "stdio",
  "streamable-http": "Streamable HTTP",
  sse: "legacy SSE",
};

const shuffleClients = (clients: readonly CompatibleClient[]) => {
  const shuffled = [...clients];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
};

const ClientLogo = ({ client }: { client: CompatibleClient }) => {
  if (client.logo) {
    const alt = client.logo.alt ?? client.name;
    const requestedScale = client.logo.scale ?? 1;
    const scale =
      Number.isFinite(requestedScale) && requestedScale > 0
        ? requestedScale
        : 1;
    const logoStyle = {
      maxHeight: `${80 * Math.min(scale, 1)}px`,
      width: `${192 * scale}px`,
    };

    return (
      <a
        aria-label={`Visit ${client.name}`}
        className="flex h-20 w-full max-w-64 items-center justify-center"
        href={client.homepageUrl}
      >
        <img
          alt={alt}
          className={cn(
            "h-auto max-w-full object-contain",
            client.logo.darkSrc && "dark:hidden"
          )}
          src={client.logo.lightSrc}
          style={logoStyle}
        />
        {client.logo.darkSrc ? (
          <img
            alt={alt}
            className="hidden h-auto max-w-full object-contain dark:block"
            src={client.logo.darkSrc}
            style={logoStyle}
          />
        ) : null}
      </a>
    );
  }

  return (
    <a
      aria-label={`Visit ${client.name}`}
      className="flex size-20 items-center justify-center rounded-2xl border bg-muted text-2xl font-semibold tracking-tight text-muted-foreground no-underline"
      href={client.homepageUrl}
    >
      {client.name
        .split(/\s+/)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()}
    </a>
  );
};

const ClientLink = ({
  children,
  href,
  icon,
}: {
  children: ReactNode;
  href: string;
  icon: ReactNode;
}) => (
  <a
    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
    href={href}
  >
    {icon}
    {children}
  </a>
);

const Capability = ({ children }: { children: ReactNode }) => (
  <li className="flex items-start gap-3 rounded-lg border bg-background/80 px-3.5 py-2.5">
    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
      <CheckIcon aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
    </span>
    <span className="text-sm font-medium leading-5">{children}</span>
  </li>
);

const McpTransports = ({
  transports,
}: {
  transports: readonly McpTransport[];
}) => (
  <span className="flex min-w-0 flex-col">
    <span>MCP</span>
    <span className="whitespace-nowrap text-xs font-normal leading-4 text-muted-foreground">
      {transports.map((transport) => mcpTransportLabels[transport]).join(",\u2002")}
    </span>
  </span>
);

const ClientCard = ({ client }: { client: CompatibleClient }) => (
  <article className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
    <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(18rem,2fr)]">
      <div className="flex min-h-72 flex-col p-4 sm:p-5">
        <div className="mb-4 flex justify-center">
          <ClientLogo client={client} />
        </div>

        <h2 className="mb-2 text-lg font-semibold tracking-tight">
          <a
            className="inline-flex items-center gap-1.5 text-foreground no-underline hover:text-primary"
            href={client.homepageUrl}
          >
            {client.name}
            <ExternalLinkIcon aria-hidden="true" className="size-3.5" />
          </a>
        </h2>
        <p className="m-0 text-sm leading-6 text-muted-foreground">
          {client.description}
        </p>

        {client.instructionsUrl || client.sourceUrl ? (
          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t pt-4">
            {client.instructionsUrl ? (
              <ClientLink
                href={client.instructionsUrl}
                icon={
                  <BookOpenTextIcon aria-hidden="true" className="size-3.5" />
                }
              >
                Setup instructions
              </ClientLink>
            ) : null}
            {client.sourceUrl ? (
              <ClientLink
                href={client.sourceUrl}
                icon={<Code2Icon aria-hidden="true" className="size-3.5" />}
              >
                Source code
              </ClientLink>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="border-t bg-muted/35 p-4 sm:p-5 lg:border-t-0 lg:border-l">
        <ul
          aria-label={`Components supported by ${client.name}`}
          className="m-0 w-full list-none space-y-1 p-0"
        >
          {client.supports.skills ? (
            <Capability>Agent Skills</Capability>
          ) : null}
          {client.supports.mcp ? (
            <Capability>
              <McpTransports transports={client.supports.mcp.transports} />
            </Capability>
          ) : null}
        </ul>
      </div>
    </div>
  </article>
);

export const CompatibleClients = () => {
  const [mode, setMode] = useState<"shuffle" | "alphabetical">("shuffle");
  const [clients, setClients] = useState<readonly CompatibleClient[]>(
    compatibleClients
  );

  useEffect(() => {
    setClients(shuffleClients(compatibleClients));
  }, []);

  if (compatibleClients.length === 0) {
    return null;
  }

  const shuffle = () => {
    setMode("shuffle");
    setClients(shuffleClients(compatibleClients));
  };

  const sortAlphabetically = () => {
    setMode("alphabetical");
    setClients(
      compatibleClients.toSorted((a, b) => a.name.localeCompare(b.name))
    );
  };

  return (
    <div className="not-prose mx-auto mt-8 w-full max-w-4xl">
      <div className="mb-3 flex justify-end">
        <ButtonGroup aria-label="Client order">
          <Button
            aria-label="Shuffle clients"
            aria-pressed={mode === "shuffle"}
            className={cn(
              mode === "shuffle" && "bg-accent text-accent-foreground"
            )}
            onClick={shuffle}
            size="icon-sm"
            title="Shuffle clients"
            type="button"
            variant="outline"
          >
            <ShuffleIcon aria-hidden="true" />
          </Button>
          <Button
            aria-label="Sort clients alphabetically"
            aria-pressed={mode === "alphabetical"}
            className={cn(
              mode === "alphabetical" && "bg-accent text-accent-foreground"
            )}
            onClick={sortAlphabetically}
            size="icon-sm"
            title="Sort clients alphabetically"
            type="button"
            variant="outline"
          >
            <ArrowDownAZIcon aria-hidden="true" />
          </Button>
        </ButtonGroup>
      </div>

      <div className="space-y-3">
        {clients.map((client) => (
          <ClientCard client={client} key={client.name} />
        ))}
      </div>
    </div>
  );
};
