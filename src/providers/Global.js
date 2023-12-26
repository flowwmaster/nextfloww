"use client";
import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  const [user, setUser] = useState({ name: "amc" });

  const contextData = {
    user,
    setUser,
  };

  return (
    <GlobalContext.Provider value={contextData}>
      {children}
    </GlobalContext.Provider>
  );
}
