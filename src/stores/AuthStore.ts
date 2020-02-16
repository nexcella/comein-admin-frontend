import {action, observable} from 'mobx';
import {logger} from "../utils/logger";

export type AuthData = {}
export type LoginData = {
  username: string,
  password: string
}

export class AuthStore {
  @observable isLoggedIn = false;
  @observable isLoading = false;

  @observable token: string
  @observable authData: AuthData;

  @action login({username, password}: LoginData) {
    this.isLoading = true;
    this.isLoggedIn = true
    logger.debug('login success');
  }

  @action logout() {
    this.isLoggedIn = false;
    this.isLoading = false;
    logger.debug('logout');
  }

}
