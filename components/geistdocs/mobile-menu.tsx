"use client";

import { MenuIcon } from "lucide-react";
import { SidebarTrigger } from "fumadocs-ui/layouts/docs/slots/sidebar";
import { buttonVariants } from "../ui/button";

export const MobileMenu = () => (
  <SidebarTrigger
    className={buttonVariants({
      className: "md:hidden",
      size: "icon-sm",
      variant: "ghost",
    })}
  >
    <MenuIcon className="size-4" />
  </SidebarTrigger>
);
