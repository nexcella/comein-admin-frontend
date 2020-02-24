import React, {useContext} from "react";
import {inject, observer} from "mobx-react";

import {AuthStore, AuthStoreKey} from "../../stores/AuthStore";

export const AuthContext = React.createContext<AuthStore>(new AuthStore());

export function useIsLoggedIn() {
  const authStore = useContext(AuthContext);
  return authStore.isLoggedIn;
}

export function useLogout() {
  const authStore = useContext(AuthContext);
  return () => authStore.logout();
}

export const AuthProvider = inject(AuthStoreKey)(observer((props: any) => {
  return <AuthContext.Provider value={props[AuthStoreKey]}>{props.children}</AuthContext.Provider>
}));
