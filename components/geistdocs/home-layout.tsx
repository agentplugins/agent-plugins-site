import { DocsLayout as FumadocsDocsLayout } from "fumadocs-ui/layouts/docs";
import {
  SidebarTrigger,
  useSidebar,
} from "fumadocs-ui/layouts/docs/slots/sidebar";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { i18nConfig } from "@/lib/geistdocs/i18n";
import { InheritedSidebarProvider, Sidebar } from "./sidebar";

interface HomeLayoutProps {
  children: ReactNode;
  tree: ComponentProps<typeof FumadocsDocsLayout>["tree"];
}

export const HomeLayout = ({ tree, children }: HomeLayoutProps) => (
  <FumadocsDocsLayout
    containerProps={{
      className: "p-0! max-w-full mx-0 [&_[data-sidebar-placeholder]]:hidden",
      style: {
        display: "flex",
        flexDirection: "column",
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
