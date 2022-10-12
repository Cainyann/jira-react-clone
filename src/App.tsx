import React from "react";
import { useAuth } from "./context/auth-context";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AuthenticatedApp from "authenticated-app/index";
import UnAuthenticatedApp from "unauthenticated-app/index";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? (
        <BrowserRouter>
          <AuthenticatedApp />
        </BrowserRouter>
      ) : (
        <UnAuthenticatedApp />
      )}
    </div>
  );
}

export default App;
