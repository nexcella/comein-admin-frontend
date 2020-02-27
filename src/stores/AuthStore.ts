import {action, observable} from 'mobx';

import {logger} from "../utils/logger";
import authService, {AuthService} from "../services/AuthService";

export const AuthStoreKey = 'authStore';

export type AuthData = {}
export type LoginData = {
  username: string,
  password: string
}

export class AuthStore {
  @observable isLoggedIn = false;
  @observable isLoading = false;

  @observable token?: string
  @observable authData?: AuthData;

  private readonly authService: AuthService;

  constructor() {
    this.authService = authService;
  }

  @action.bound
  login({username, password}: LoginData) {
    this.isLoading = true;
    this.authService.login(username, password)
      .then((data) => {
        this.isLoggedIn = true;
        this.isLoading = false;
        this.authData = data as AuthData;
        logger.debug('login success');
      });
  }

  @action.bound
  logout() {
    this.isLoggedIn = false;
    this.isLoading = false;
    this.authData = undefined;
    logger.debug('logout');
  }

}
