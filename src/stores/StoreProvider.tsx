import React from "react";
import {Provider as MobXReactProvider} from "mobx-react";
import {AuthStore} from "./AuthStore";

const stores = {
  authStore: new AuthStore()
}

export function StoreProvider({children}: { children: React.ReactNode }) {
  return (
    <MobXReactProvider {...stores}>
      {children}
    </MobXReactProvider>
  )
}
