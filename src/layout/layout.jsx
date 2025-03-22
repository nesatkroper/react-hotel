import React from "react";
import PropTypes from "prop-types";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/sidebar/app-sidebar";
import AppHeader from "@/components/app/header/app-header";
// import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function Layout({ children }) {
  const [_open, _setOpen] = React.useState();

  React.useEffect(() => {
    _setOpen(localStorage.getItem("sidebar-open") === "true");
  }, [_open]);

  // console.log(_open);
  return (
    <SidebarProvider defaultOpen={_open}>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />

        <div className='relative flex flex-1 flex-col gap-4 p-3'>
          {/* <FlickeringGrid
            className='absolute inset-0 z-0 size-full [mask-image:radial-gradient(850px_circle_at_center,white,transparent)] pointer-events-none'
            squareSize={4}
            gridGap={6}
            color='#60A5FA'
            maxOpacity={0.3}
            flickerChance={0.1}
          /> */}
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};
