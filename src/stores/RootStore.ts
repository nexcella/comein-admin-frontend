import {action, observable} from "mobx";
import {ignore} from "mobx-sync";
import {ERRORS, ErrorData} from "@nexcella/comein-api";

import {AppStore} from "./AppStore";
import {AuthStore} from "./AuthStore";
import {NetworkStore} from "./NetworkStore";
import {apiService} from "../services/api/ApiService";

const appStore = new AppStore();
const authStore = new AuthStore(apiService);
const networkStore = new NetworkStore();

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

export class RootStore {
  @ignore @observable storeLoaded = false;

  public readonly auth = authStore;
  public readonly appStore = appStore;
  public readonly networkStore = networkStore

  @action setStoreLoaded() {
    this.storeLoaded = true;
  }
}

export const store = new RootStore();
