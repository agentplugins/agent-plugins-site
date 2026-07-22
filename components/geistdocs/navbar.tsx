import { DynamicLink } from "fumadocs-core/dynamic-link";
import { Logo, nav } from "@/geistdocs";
import { DesktopMenu } from "./desktop-menu";
import { MobileMenu } from "./mobile-menu";
import { SearchButton } from "./search";

export const Navbar = () => (
  <header className="sticky top-0 z-40 w-full gap-6 border-b bg-sidebar">
    <div className="mx-auto flex h-16 w-full max-w-(--fd-layout-width) items-center gap-4 px-4 py-3.5 md:px-6">
      <div className="flex shrink-0 items-center gap-2.5">
        <DynamicLink href="/">
          <Logo />
        </DynamicLink>
      </div>
      <DesktopMenu className="hidden xl:flex" items={nav} />
      <div className="ml-auto flex flex-1 items-center justify-end gap-2">
        <SearchButton className="hidden xl:flex" />
        <MobileMenu />
      </div>
    </div>
  </header>
);
