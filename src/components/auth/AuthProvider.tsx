import React, {useContext} from "react";
import {MobXProviderContext, useObserver} from 'mobx-react';

import {AuthStore, AuthStoreKey} from "../../stores/AuthStore";


export function useAuthState() {
  const authStore = useContext(MobXProviderContext)[AuthStoreKey];
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
    token: authStore.token,
    successForgotEmail: authStore.successForgotEmail
  }));
}

export function useAuthActions() {
  const authStore: AuthStore = useContext(MobXProviderContext)[AuthStoreKey];
  if (!authStore) {
    throw new Error('Incorrect useAuthActions usage');
  }
  return {
    login: authStore.login,
    logout: authStore.logout,
    getProfile: authStore.getProfile,
    usernameRegister: authStore.usernameRegister,
    usernameForgot: authStore.usernameForgot,
    clear: authStore.clear
  }
}
