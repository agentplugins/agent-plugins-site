import { DocsLayout as FumadocsDocsLayout } from "fumadocs-ui/layouts/docs";
import {
  SidebarTrigger,
  useSidebar,
} from "fumadocs-ui/layouts/docs/slots/sidebar";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import {
  InheritedSidebarProvider,
  Sidebar,
} from "@/components/geistdocs/sidebar";
import { i18nConfig } from "@/lib/geistdocs/i18n";

interface DocsLayoutProps {
  children: ReactNode;
  tree: ComponentProps<typeof FumadocsDocsLayout>["tree"];
}

export const DocsLayout = ({ tree, children }: DocsLayoutProps) => (
  <FumadocsDocsLayout
    containerProps={{
      style: {
        "--fd-docs-row-1": "4rem",
      } as CSSProperties,
    }}
    i18n={i18nConfig}
    nav={{
      enabled: false,
    }}
    searchToggle={{
      enabled: false,
    }}
    slots={{
      sidebar: {
        provider: InheritedSidebarProvider,
        root: Sidebar,
        trigger: SidebarTrigger,
        useSidebar,
      },
    }}
    tabMode="auto"
    themeSwitch={{
      enabled: false,
    }}
    tree={tree}
  >
    {children}
  </FumadocsDocsLayout>
);
