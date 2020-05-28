import {action, observable} from 'mobx';

import {logger} from "../utils/logger";
import {format, ignore} from "mobx-sync";
import {ApiService} from "../services/api/ApiService";

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

   @ignore
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  @action.bound
  login({username, password}: LoginData) {
    this.isLoading = true;
    this.apiService.auth.usernameLogin({username, password})
      .then((data) => {
        this.authData = data;
        this.token = data.token;
        this.isLoggedIn = true;
        this.isLoading = false;
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
