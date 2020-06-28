import {action, observable} from "mobx";
import {ignore} from "mobx-sync";
import { ERRORS, ErrorData } from "@nexcella/comein-api";

import {AppStore, AppStoreKey} from "./AppStore";
import {AuthStore, AuthStoreKey} from "./AuthStore";
import {NetworkStore, NetworkStoreKey} from "./NetworkStore";
import {apiService} from "../services/api/ApiService";



const appStore = new AppStore();
const authStore = new AuthStore(apiService);
const networkStore = new NetworkStore();

apiService.setOnRequestCallback((requestId) => {
  networkStore.setIsLoading(requestId, true)
})

apiService.setOnRequestSuccessCallback((requestId) => {
  networkStore.setIsLoading(requestId, false)
})

apiService.setOnRequestFailCallback((requestId, error: ErrorData) => {
  networkStore.setIsLoading(requestId, false);
  switch (error.code) {
    case ERRORS.FORBIDDEN.PERMISSION_DENIED:
      authStore.logout();
  }
})

export class RootStore {
  @ignore @observable storeLoaded = false;

  [AuthStoreKey] = authStore;
  [AppStoreKey] = appStore;
  [NetworkStoreKey] = networkStore

  @action setStoreLoaded() {
    this.storeLoaded = true;
  }
}

export const store = new RootStore();
