import { ThemeProvider } from "@/components/app/theme/theme-provider";
import AuthProvider from "./providers/auth-provider";
import Routes from "./routes/router";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
