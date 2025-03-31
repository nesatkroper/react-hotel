import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/sidebar/app-sidebar";
import AppHeader from "@/components/app/header/app-header";

export default function Layout({ children, className }) {
  const [_open, _setOpen] = useState(false);

  useEffect(() => {
    _setOpen(localStorage.getItem("sidebar-open") === "true");
  }, [_open]);

  return (
    <SidebarProvider defaultOpen={_open}>
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
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  className: PropTypes.string,
};
