import React from "react";
import { useAuth } from "./context/auth-context";
import "./App.css";
import AuthenticatedApp from "authenticated-app/index";
import UnAuthenticatedApp from "unauthenticated-app/index";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;
