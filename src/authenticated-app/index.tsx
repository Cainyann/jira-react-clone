import React from "react";
import ProjectListScreen from "screens/project-list";
import { useAuth } from "../context/auth-context";
import { Button } from "antd";

const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <div>
      <Button onClick={logout}>退出</Button>
      <ProjectListScreen />
    </div>
  );
};

export default AuthenticatedApp;
