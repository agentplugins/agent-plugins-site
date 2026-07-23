import "./global.css";
import { Footer } from "@/components/geistdocs/footer";
import { Navbar } from "@/components/geistdocs/navbar";
import { GeistdocsProvider } from "@/components/geistdocs/provider";
import { basePath, siteUrl } from "@/geistdocs";
import { mono, sans } from "@/lib/geistdocs/fonts";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "fumadocs-ui/layouts/docs/slots/sidebar";
import type { Metadata } from "next";

const description =
  "A portable package format for reusable components that extend AI agents.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Agent Plugins",
    template: "%s | Agent Plugins",
  },
  description,
};

const Layout = ({ children }: LayoutProps<"/">) => (
  <html
    className={cn(sans.variable, mono.variable, "scroll-smooth antialiased")}
    data-scroll-behavior="smooth"
    lang="en"
    suppressHydrationWarning
  >
    <body>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        href="#nd-page"
      >
        Skip to content
      </a>
      <GeistdocsProvider basePath={basePath}>
        <SidebarProvider>
          <Navbar />
          {children}
        </SidebarProvider>
        <Footer />
      </GeistdocsProvider>
    </body>
  </html>
);

export default Layout;
