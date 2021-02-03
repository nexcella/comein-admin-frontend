import {action, makeAutoObservable} from "mobx";
import {ignore} from "mobx-sync";

export class NetworkStore {
  @ignore
  isLoading = false;

  @ignore
  hasError = false;

  constructor() {
    makeAutoObservable(this);
  }

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
