import React, {createContext, useContext, useEffect} from "react";
import localForage from "localforage";
import {AsyncStorage, AsyncTrunk} from "mobx-sync";

import {ErrorData, ERRORS} from "@nexcella/comein-api";

import {NetworkService} from "../services/network/NetworkService";
import {XHRTransport} from "../services/network/transport/XHRTransport";
import {ApiService} from "../services/api/ApiService";
import {AuthStore} from "../stores/AuthStore";
import {AppStore} from "../stores/AppStore";
import {NetworkStore} from "../stores/NetworkStore";
import {logger} from "../utils/logger";

const transport = new XHRTransport();
const networkService = new NetworkService(transport);
const apiService = new ApiService();

export type Stores = {
  auth: AuthStore,
  app: AppStore,
  network: NetworkStore
};

export const NetworkServiceContext = createContext(networkService);
export const ApiServiceContext = createContext(apiService);
export const StoresContext = createContext<Stores | undefined>(undefined);

export function useNetworkService() {
  const networkService = useContext(NetworkServiceContext);
  if (!networkService) {
    throw new Error('Wrong useNetworkService usage. Incorrect NetworkServiceContext')
  }
  return networkService;
}

export function useApiService() {
  const apiService = useContext(ApiServiceContext);
  return apiService;
}

export function useStores(): Stores {
  const stores = useContext(StoresContext);
  if (!stores) {
    throw new Error('Wrong useStore usage. Incorrect StoresContext')
  }
  return stores;
}

export function useAuthStore() {
  const stores = useStores();
  return stores.auth;
}

export function useAppStore() {
  const stores = useStores();
  return stores.app;
}

export function useNetworkStore() {
  const stores = useStores();
  return stores.network;
}

function getInitialStores() {

  const authStore = new AuthStore(apiService);
  const networkStore = new NetworkStore();
  const appStore = new AppStore();

  apiService.setOnRequestCallback((requestId) => {
    networkStore.setIsLoading(requestId, true)
  })

  apiService.setOnRequestSuccessCallback((requestId) => {
    networkStore.handleSuccess();
    networkStore.setIsLoading(requestId, false)
  })

  apiService.setOnRequestFailCallback((requestId, error: ErrorData) => {
    networkStore.setIsLoading(requestId, false);
    switch (error.code) {
      case ERRORS.FORBIDDEN.PERMISSION_DENIED:
        authStore.logout();
        break;
      case ERRORS.COMMON.INTERNAL:
        networkStore.handleError();
        break;
    }
  })

  return {auth: authStore, network: networkStore, app: appStore}
}

async function initStorage(stores: Stores) {
  const STORAGE_KEY = '__persist_stores_';

  try {
    await localForage.ready();
    logger.debug(`use storage driver: ${localForage.driver()}`);
    const trunk = new AsyncTrunk(stores, {
      storage: localForage as AsyncStorage,
      storageKey: STORAGE_KEY
    });
    await trunk.init()
  } catch (error) {
    // @TODO show global error? check store available (store.catchGlobalError?)
    logger.error('incorrect store initialization', error.message);
  } finally {
    stores.app.storageIsLoaded(true);
  }
}

export function StoreProvider({children}: { children: React.ReactNode }) {
  const stores = getInitialStores();

  useEffect(() => {
    initStorage(stores);
  }, [])

  return (
    <StoresContext.Provider value={stores}>
      {children}
    </StoresContext.Provider>
  )
}