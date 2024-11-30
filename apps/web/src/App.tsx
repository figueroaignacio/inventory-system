// Components
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./config/router.tsx";
import { Header } from "./shared/components/header.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./modules/auth/hooks/contexts/auth-provider.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div>
            <Header />
            <main className="min-h-dvh flex flex-col justify-center items-center">
              <AppRouter />
            </main>
          </div>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
