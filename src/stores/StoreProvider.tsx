import React from "react";
import {MobXProviderContext} from "mobx-react";
import {AuthStore} from "./AuthStore";

const stores = {
  authStore: new AuthStore()
}

export function useStores() {
  return React.useContext(MobXProviderContext)
}

export function StoreProvider({children}: { children: React.ReactNode }) {
  return (
    <MobXProviderContext.Provider value={stores}>
      {children}
    </MobXProviderContext.Provider>
  )
}
