import {action, observable} from "mobx";
import {ignore} from "mobx-sync";

export const NetworkStoreKey = 'networkStore';

export class NetworkStore {
  @ignore
  @observable isLoading = true;

  @action
  public setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

}
