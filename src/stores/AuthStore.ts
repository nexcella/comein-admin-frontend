import {action, observable} from 'mobx';

export type AuthData = {}

export class AuthStore {
  @observable isLoggedIn = false;
  @observable isLoading = false;

  @observable token: string
  @observable authData: AuthData;

  @action login() {
    this.isLoading = true;
  }

  @action logout() {
    this.isLoggedIn = false;
  }

}
