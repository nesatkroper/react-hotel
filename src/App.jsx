import React from "react";
import AuthProvider from "./providers/auth-provider";
import Routes from "./routes/router";
import CodeProvider from "./providers/shift-provider";
import { ThemeProvider } from "@/components/app/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const App = () => {
  const { i18n } = useTranslation();
  const font = i18n.language === "kh" ? "font-kh" : "font-en";

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <AuthProvider>
        <CodeProvider>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`${font}`}>
            <Routes />
            <Toaster />
          </motion.div>
        </CodeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
