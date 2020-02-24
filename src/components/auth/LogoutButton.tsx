import React, {ReactNode} from "react";
import {useLogout} from "./AuthProvider";

export const LogoutButton = ({children}: { children: ReactNode }) => {
  const logout = useLogout();
  return (
    <button onClick={() => logout()}>
      {children}
    </button>
  );
}
