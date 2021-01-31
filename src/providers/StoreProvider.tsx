import React, {createContext, useEffect, useState} from "react";

import {RootStore, store} from "../stores/RootStore";
import {initStorage} from "../stores/utils/initStorage";
import {apiService} from "../services/api/ApiService";
import {observer} from "mobx-react";

const StoreContext = createContext<RootStore | undefined>(undefined);

export function useStore(): RootStore {
  const store = React.useContext(StoreContext)
  if (!store) {
    throw Error('Incorrect useStore usage. Wrap application into StoreContext');
  }
  return store;
}

export function useAuthStore() {
  const store = useStore();
  return store.auth
}

export const StoreProvider = observer(({children}: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  useEffect(() => {
    initStorage().then(() => setIsLoaded(true));
  }, [])

  useEffect(() => {
    const token = store.auth.token;
    apiService.setToken(token)
  }, [store.auth.token])

  // @TODO add storage loader
  return (
    <StoreContext.Provider value={store}>
      {isLoaded ? children : 'loading'}
    </StoreContext.Provider>
  )
});
