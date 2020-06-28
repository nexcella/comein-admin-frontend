import {action, observable} from "mobx";
import {ignore} from "mobx-sync";

import {AppStore, AppStoreKey} from "./AppStore";
import {AuthStore, AuthStoreKey} from "./AuthStore";
import {NetworkStore, NetworkStoreKey} from "./NetworkStore";
import {apiService} from "../services/api/ApiService";
import {TransportError} from "../services/network/transport/TransportError";

const appStore = new AppStore();
const authStore = new AuthStore(apiService);
const networkStore = new NetworkStore();

apiService.setOnRequestCallback((requestId) => {
  networkStore.setIsLoading(requestId, true)
})

apiService.setOnRequestSuccessCallback((requestId) => {
  networkStore.setIsLoading(requestId, false)
})

apiService.setOnRequestFailCallback((requestId, error: TransportError) => {
  networkStore.setIsLoading(requestId, false);
  console.debug({error});
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
