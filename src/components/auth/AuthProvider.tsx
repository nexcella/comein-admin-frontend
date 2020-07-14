import React, {useContext} from "react";
import {useObserver} from 'mobx-react';

import {AuthStore, AuthStoreKey} from "../../stores/AuthStore";
import {useStore} from "../../stores/StoreProvider";

const AuthContext = React.createContext<AuthStore | undefined>(undefined);

export function useAuthState() {
  const authStore = useContext(AuthContext);
  if (!authStore) {
    throw new Error('Incorrect useAuthState usage');
  }
  return useObserver(() => ({
    profile: authStore.profile,
    tokenTtl: authStore.tokenTtl,
    refreshToken: authStore.refreshToken,
    isLoading: authStore.isLoading,
    error: authStore.error,
    isLoggedIn: authStore.isLoggedIn,
    token: authStore.token
  }));
}

export function useAuthActions() {
  const authStore = useContext(AuthContext);
  if (!authStore) {
    throw new Error('Incorrect useAuthActions usage');
  }
  return {
    login: authStore.login,
    logout: authStore.logout,
    getProfile: authStore.getProfile,
    usernameRegister: authStore.usernameRegister,
  }
}

export const AuthProvider = (props: any) => {
  const store = useStore();
  return <AuthContext.Provider value={store[AuthStoreKey]}>{props.children}</AuthContext.Provider>
};
