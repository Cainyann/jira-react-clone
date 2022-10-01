import React from "react";
import ProjectListScreen from "screens/project-list";
import { useAuth } from "../context/auth-context";

const AuthenticatedApp = () => {
  const { logout } = useAuth();

  // window.localStorage.removeItem("__auth_provider_token__")

  return (
    <div>
      <button onClick={logout}>退出</button>
      <ProjectListScreen />
    </div>
  );
};

export default AuthenticatedApp;
