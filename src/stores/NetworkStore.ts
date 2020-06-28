import {action, observable} from "mobx";
import {ignore} from "mobx-sync";

export const NetworkStoreKey = 'networkStore';

export class NetworkStore {
  @ignore
  @observable isLoading = false;

  @ignore
  @observable hasError = false;

  @action
  public setIsLoading(requestId: string, isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @action
  public handleSuccess() {
    this.hasError = false;
  }

  @action
  public handleError() {
    this.hasError = true;
  }

}
