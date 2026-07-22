"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  type Framework,
  FrameworkProvider,
} from "fumadocs-core/framework";
import type { SharedProps } from "fumadocs-ui/contexts/search";
import { RootProvider } from "fumadocs-ui/provider/base";
import NextImage from "next/image";
import NextLink from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { type ComponentProps, useCallback } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "../ui/tooltip";
import { SearchDialog } from "./search";

type GeistdocsProviderProps = ComponentProps<typeof RootProvider> & {
  basePath: string | undefined;
  className?: string;
};

const FrameworkImage = NextImage as NonNullable<Framework["Image"]>;
const FrameworkLink = NextLink as NonNullable<Framework["Link"]>;

export const GeistdocsProvider = ({
  basePath,
  search,
  className,
  ...props
}: GeistdocsProviderProps) => {
  const SearchDialogComponent = useCallback(
    (sdProps: SharedProps) => <SearchDialog basePath={basePath} {...sdProps} />,
    [basePath]
  );

  return (
    <div className={className}>
      <TooltipProvider>
        <FrameworkProvider
          Image={FrameworkImage}
          Link={FrameworkLink}
          useParams={useParams}
          usePathname={usePathname}
          useRouter={useRouter}
        >
          <RootProvider
            search={{
              SearchDialog: SearchDialogComponent,
              ...search,
            }}
            {...props}
          />
        </FrameworkProvider>
      </TooltipProvider>
      <Analytics />
      <Toaster />
      <SpeedInsights />
    </div>
  );
};
