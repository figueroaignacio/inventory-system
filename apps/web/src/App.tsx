import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./config/router.tsx";
import { AuthProvider } from "./modules/auth/hooks/contexts/auth-provider.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <main className="min-h-dvh flex flex-col justify-center items-center">
            <AppRouter />
          </main>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
