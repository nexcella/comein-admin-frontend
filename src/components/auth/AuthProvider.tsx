import React, {useContext} from "react";
import {useObserver} from 'mobx-react';

import {AuthStore, AuthStoreKey} from "../../stores/AuthStore";
import {useStores} from "../../stores/StoreProvider";

const AuthContext = React.createContext<AuthStore | undefined>(undefined);

export function useAuthState() {
  const authStore = useContext(AuthContext);
  if (!authStore) {
    throw new Error('Incorrect useAuthState usage');
  }
  return useObserver(() => ({
    isLoggedIn: authStore.isLoggedIn,
    isLoading: authStore.isLoading
  }));
}

export function useAuthActions() {
  const authStore = useContext(AuthContext);
  if (!authStore) {
    throw new Error('Incorrect authActions usage');
  }
  return {
    login: authStore.login,
    logout: authStore.logout
  }
}

export const AuthProvider = (props: any) => {
  const stores = useStores();
  return <AuthContext.Provider value={stores[AuthStoreKey]}>{props.children}</AuthContext.Provider>
};
