import { AppSidebar } from "@/components/app/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "./header/app-header";
import PropTypes from "prop-types";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <Separator />
        {/* // ! THIS  IS SLOT FOR CHILDREN */}

        <div className="flex flex-1 flex-col gap-4 p-3">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};
