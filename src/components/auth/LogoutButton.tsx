import React, {ReactNode} from "react";
import {useAuthActions} from "./AuthProvider";

export const LogoutButton = ({children}: { children: ReactNode }) => {
  const {logout} = useAuthActions();
  return (
    <button onClick={() => logout()}>
      {children}
    </button>
  );
}
