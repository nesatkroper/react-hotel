import { ThemeProvider } from "@/components/app/theme/theme-provider";
import AuthProvider from "./providers/auth-provider";
import Routes from "./routes/router";
import CodeProvider from "./providers/shift-provider";
import React from "react";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <CodeProvider>
          <Routes />
          <Toaster />
        </CodeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
