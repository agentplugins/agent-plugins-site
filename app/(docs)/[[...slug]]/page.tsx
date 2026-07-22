import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CopyPage } from "@/components/geistdocs/copy-page";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "@/components/geistdocs/docs-page";
import { EditSource } from "@/components/geistdocs/edit-source";
import { getMDXComponents } from "@/components/geistdocs/mdx-components";
import { OpenInChat } from "@/components/geistdocs/open-in-chat";
import { ScrollTop } from "@/components/geistdocs/scroll-top";
import { Separator } from "@/components/ui/separator";
import { getLLMText, getPageImage, source } from "@/lib/geistdocs/source";

const Page = async ({ params }: PageProps<"/[[...slug]]">) => {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const markdown = await getLLMText(page);
  const MDX = page.data.body;

  return (
    <DocsPage
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
        footer: (
          <div className="my-3 space-y-3">
            <Separator />
            <EditSource path={page.path} />
            <ScrollTop />
            <CopyPage text={markdown} />
            <OpenInChat href={page.url} />
          </div>
        ),
      }}
      toc={page.data.toc}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),

            // Add your custom components here
          })}
        />
      </DocsBody>
    </DocsPage>
  );
};

export const generateStaticParams = () => source.generateParams();

export const generateMetadata = async ({
  params,
}: PageProps<"/[[...slug]]">) => {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const title = page.data.title;
  const description = page.data.description;
  const image = {
    alt: title,
    url: getPageImage(page).url,
  };

  const metadata: Metadata = {
    title: page.url === "/" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: page.url,
      types: {
        "text/markdown": page.url === "/" ? "/docs.md" : `${page.url}.md`,
      },
    },
    openGraph: {
      type: "website",
      url: page.url,
      siteName: "Agent Plugins",
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };

  return metadata;
};

export default Page;
