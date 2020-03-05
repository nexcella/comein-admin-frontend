import {AuthStore, AuthStoreKey} from "./AuthStore";
import {ignore} from "mobx-sync";
import {action, observable} from "mobx";
import {AppStore, AppStoreKey} from "./AppStore";

export class RootStore {
  @ignore @observable storeLoaded = false;
  [AuthStoreKey] = new AuthStore();
  [AppStoreKey] = new AppStore();

  @action setStoreLoaded() {
    this.storeLoaded = true;
  }
}

export const store = new RootStore();
