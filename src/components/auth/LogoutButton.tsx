import React, {ReactNode} from "react";
import {useAuthStore} from "../../providers/StoreProvider";

export const LogoutButton = ({children}: { children: ReactNode }) => {
  const authStore = useAuthStore();

  return (
    <button onClick={authStore.logout}>
      {children}
    </button>
  );
}
