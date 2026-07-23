"use client";

import type { Node } from "fumadocs-core/page-tree";
import { usePathname } from "fumadocs-core/framework";
import {
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarItem,
  SidebarSeparator,
} from "fumadocs-ui/components/sidebar/base";
import type { SidebarPageTreeComponents } from "fumadocs-ui/components/sidebar/page-tree";
import { useTreeContext, useTreePath } from "fumadocs-ui/contexts/tree";
import {
  type SidebarProviderProps,
  useSidebar,
} from "fumadocs-ui/layouts/docs/slots/sidebar";
import { Fragment } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SearchButton } from "./search";

const isActive = (href: string, pathname: string) =>
  href.replace(/\/$/, "") === pathname.replace(/\/$/, "");

export const InheritedSidebarProvider = ({
  children,
}: SidebarProviderProps) => <>{children}</>;

export const Sidebar = () => {
  const { root } = useTreeContext();
  const { mode, open, setOpen } = useSidebar();

  const renderSidebarList = (items: Node[]) =>
    items.map((item) => {
      if (item.type === "separator") {
        return <Separator item={item} key={item.$id} />;
      }

      if (item.type === "folder") {
        return (
          <Folder item={item} key={item.$id}>
            {renderSidebarList(item.children)}
          </Folder>
        );
      }

      return <Item item={item} key={item.$id} />;
    });

  return (
    <>
      <div
        className="pointer-events-none sticky top-(--fd-docs-row-1) z-20 h-[calc(var(--fd-docs-height)-var(--fd-docs-row-1))] [grid-area:sidebar] *:pointer-events-auto max-md:hidden md:layout:[--fd-sidebar-width:268px]"
        data-sidebar-placeholder
      >
        <div className="h-full overflow-y-auto px-4 pt-12 pb-4">
          <Fragment key={root.$id}>
            {renderSidebarList(root.children)}
          </Fragment>
        </div>
      </div>
      <Sheet onOpenChange={setOpen} open={mode === "drawer" && open}>
        <SheetContent
          className="gap-0"
          id="nd-sidebar-mobile"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            document
              .querySelector<HTMLButtonElement>(
                '[aria-controls="nd-sidebar-mobile"]',
              )
              ?.focus();
          }}
          overlayClassName="top-16"
          style={{ bottom: 0, height: "auto", top: "4rem" }}
        >
          <SheetHeader className="mt-8">
            <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Navigation for the documentation.
            </SheetDescription>
            <SearchButton onClick={() => setOpen(false)} />
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {renderSidebarList(root.children)}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export const Folder: SidebarPageTreeComponents["Folder"] = ({
  children,
  item,
}) => {
  const path = useTreePath();
  const pathname = usePathname();
  const defaultOpen = item.defaultOpen ?? path.includes(item);
  const indexActive = item.index
    ? isActive(item.index.url, pathname)
    : false;

  return (
    <SidebarFolder
      active={path.includes(item)}
      collapsible={item.collapsible}
      defaultOpen={defaultOpen}
    >
      {item.index ? (
        <SidebarFolderLink
          active={indexActive}
          aria-current={indexActive ? "page" : undefined}
          className="flex items-center gap-2 text-pretty py-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground data-[active=true]:font-medium data-[active=true]:text-foreground [&_svg]:size-3.5"
          external={item.index.external}
          href={item.index.url}
        >
          {item.icon}
          {item.name}
        </SidebarFolderLink>
      ) : (
        <SidebarFolderTrigger className="flex items-center gap-2 text-pretty py-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground [&_svg]:size-3.5">
          {item.icon}
          {item.name}
        </SidebarFolderTrigger>
      )}
      <SidebarFolderContent className="ml-2">{children}</SidebarFolderContent>
    </SidebarFolder>
  );
};

export const Item: SidebarPageTreeComponents["Item"] = ({ item }) => {
  const pathname = usePathname();
  const active = isActive(item.url, pathname);

  return (
    <SidebarItem
      active={active}
      aria-current={active ? "page" : undefined}
      className="block w-full truncate text-pretty py-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground data-[active=true]:font-medium data-[active=true]:text-foreground"
      external={item.external}
      href={item.url}
      icon={item.icon}
    >
      {item.name}
    </SidebarItem>
  );
};

export const Separator: SidebarPageTreeComponents["Separator"] = ({ item }) => (
  <SidebarSeparator className="mt-4 mb-2 flex items-center gap-2 px-0 font-medium text-sm first-child:mt-0">
    {item.icon}
    {item.name}
  </SidebarSeparator>
);
