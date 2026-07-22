import { DocsLayout } from "@/components/geistdocs/docs-layout";
import { source } from "@/lib/geistdocs/source";

const Layout = ({ children }: LayoutProps<"/">) => (
  <DocsLayout tree={source.pageTree}>{children}</DocsLayout>
);

export default Layout;
