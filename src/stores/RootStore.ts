import {action, observable} from "mobx";
import {ignore} from "mobx-sync";

import {AppStore, AppStoreKey} from "./AppStore";
import {AuthStore, AuthStoreKey} from "./AuthStore";
import {NetworkStore, NetworkStoreKey} from "./NetworkStore";
import {apiService} from "../services/api/ApiService";

export class RootStore {
  @ignore @observable storeLoaded = false;

  [AuthStoreKey] = new AuthStore(apiService);
  [AppStoreKey] = new AppStore();
  [NetworkStoreKey] = new NetworkStore();

  @action setStoreLoaded() {
    this.storeLoaded = true;
  }
}

export const store = new RootStore();
