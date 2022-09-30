import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

const AppContext = React.createContext(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
