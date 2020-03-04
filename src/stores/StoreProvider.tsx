import React, {useEffect, useState} from "react";
import {MobXProviderContext, observer} from "mobx-react";
import {reaction} from "mobx";

import {store} from "./RootStore";
import {initStorage} from "./initStore";
import i18n from "../i18n";
import {AppStore, AppStoreKey} from "./AppStore";

const SHOW_LOADER_TIMEOUT = 200;

export function useStore() {
  return React.useContext(MobXProviderContext)
}

export function useAppStore(): AppStore {
  return React.useContext(MobXProviderContext)[AppStoreKey];
}

initStorage();

let loaderTimeoutId: number;

export const StoreProvider = observer(({children}: { children: React.ReactNode }) => {

  const [needLoader, setNeedLoader] = useState<boolean | null>(null);

  useEffect(() => {
    if (store.storeLoaded) {
      window.clearTimeout(loaderTimeoutId);
      setNeedLoader(false);
    } else if (!loaderTimeoutId) {
      loaderTimeoutId = window.setTimeout(() => {
        setNeedLoader(true);
      }, SHOW_LOADER_TIMEOUT);
    }
  }, [store.storeLoaded])

  // @TODO add store loader animation
  return (
    <MobXProviderContext.Provider value={store}>
      {needLoader === null ? null : (needLoader ? 'storage loader' : children)}
    </MobXProviderContext.Provider>
  )
});
