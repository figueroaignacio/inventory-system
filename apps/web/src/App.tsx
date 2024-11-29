// Components
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./config/router.tsx";

import { AuthProvider } from "./modules/auth/hooks/contexts/auth-provider.tsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <main className="py-12">
          <AppRouter />
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
