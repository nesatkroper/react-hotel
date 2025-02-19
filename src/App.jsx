import { ThemeProvider } from "@/components/app/theme/theme-provider";
import AuthProvider from "./providers/auth-provider";
import Routes from "./routes/router";
import CodeProvider from "./providers/shift-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <CodeProvider>
          <Routes />
        </CodeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
