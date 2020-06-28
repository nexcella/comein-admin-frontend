import {action, observable} from "mobx";
import {ignore} from "mobx-sync";

export const NetworkStoreKey = 'networkStore';

export class NetworkStore {
  @ignore
  @observable isLoading = false;

  @action
  public setIsLoading(requestId: string, isLoading: boolean) {
    console.debug('setIsLoading', isLoading)
    this.isLoading = isLoading;
  }

}
