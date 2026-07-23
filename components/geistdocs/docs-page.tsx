import {
  DocsBody as FumadocsDocsBody,
  DocsDescription as FumadocsDocsDescription,
  DocsPage as FumadocsDocsPage,
  DocsTitle as FumadocsDocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type PageProps = ComponentProps<typeof FumadocsDocsPage>;

export const DocsPage = ({ className, ...props }: PageProps) => (
  <FumadocsDocsPage
    {...props}
    className={cn("scroll-mt-[var(--fd-docs-row-3)]", className)}
    role="main"
    tabIndex={-1}
  />
);

export const DocsTitle = ({
  className,
  ...props
}: ComponentProps<typeof FumadocsDocsTitle>) => (
  <FumadocsDocsTitle
    className={cn("mb-4 text-4xl tracking-tight", className)}
    {...props}
  />
);

export const DocsDescription = (
  props: ComponentProps<typeof FumadocsDocsDescription>
) => <FumadocsDocsDescription {...props} />;

export const DocsBody = ({
  className,
  ...props
}: ComponentProps<typeof FumadocsDocsBody>) => (
  <FumadocsDocsBody className={cn("mx-auto w-full", className)} {...props} />
);
