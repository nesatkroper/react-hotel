import React from "react";

import PropTypes from "prop-types";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import AppHeader from "@/components/app/header/app-header";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <Separator />

        <div className="flex flex-1 flex-col gap-4 p-3">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};
