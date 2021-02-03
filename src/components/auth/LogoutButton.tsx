import React, {ReactNode, useCallback} from "react";
import {useAuthStore} from "../../providers/StoreProvider";

export const LogoutButton = ({children}: { children: ReactNode }) => {
  const authStore = useAuthStore();
  const logoutCallback = useCallback(() => authStore.logout(), [authStore.logout])
  return (
    <button onClick={logoutCallback}>
      {children}
    </button>
  );
}
