import {AuthStore, AuthStoreKey} from "./AuthStore";
import {ignore} from "mobx-sync";
import {action, observable} from "mobx";
import {observer} from "mobx-react";

export class RootStore {
  /**
   * @desc ignore node, this node will not be persisted, and its changes
   * will not trigger persist event.
   * @type {boolean}
   */
  @ignore @observable storeLoaded = false;
  [AuthStoreKey] = new AuthStore();

  @action setStoreLoaded() {
    this.storeLoaded = true;
  }
}

export const store = new RootStore();
