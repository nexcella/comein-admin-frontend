import {action, observable} from 'mobx';

import {logger} from "../utils/logger";
import authService, {AuthService} from "../services/AuthService";

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

  private readonly authService: AuthService;

  constructor() {
    this.authService = authService;
  }

  @action login({username, password}: LoginData) {
    this.isLoading = true;
    this.isLoggedIn = true;
    logger.debug('login success');
    this.authService.login(username, password)
      .then((data) => {
        this.isLoading = false;
        this.authData = data;
      });
  }

  @action logout() {
    this.isLoggedIn = false;
    this.isLoading = false;
    logger.debug('logout');
  }

}
