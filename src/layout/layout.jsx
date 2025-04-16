import React from "react";
import PropTypes from "prop-types";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/sidebar/app-sidebar";
import AppHeader from "@/components/app/admin/header";

export default function Layout({ children, className }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className={`relative flex flex-1 flex-col gap-4 p-3 ${className}`}>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
