import {action, observable} from 'mobx';

import {logger} from "../utils/logger";
import authService, {AuthService} from "../services/AuthService";
import {format, ignore} from "mobx-sync";

export const AuthStoreKey = 'authStore';

export type AuthData = {
  token: string
}
export type LoginData = {
  username: string,
  password: string
}

export class AuthStore {
  @ignore
  @observable isLoading = false;

  @observable isLoggedIn = false;

  @format(
    (hash) => atob(hash),
    (token: string) => btoa(token)
  )
  @observable token?: string

  @observable authData?: AuthData;

  private readonly authService: AuthService;

  constructor() {
    this.authService = authService;
  }

  @action.bound
  login({username, password}: LoginData) {
    this.isLoading = true;
    this.authService.login<AuthData>(username, password)
      .then((data) => {
        this.isLoggedIn = true;
        this.isLoading = false;
        this.authData = data;
        this.token = data.token;
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
