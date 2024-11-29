import React, { createContext, useState, ReactNode } from "react";
import { AuthContextType } from "../../types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, userName, setUserName }}
    >
      {children}
    </AuthContext.Provider>
  );
};
