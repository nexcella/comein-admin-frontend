import {action, observable} from 'mobx';
import {format, ignore} from "mobx-sync";
import {ApiService} from "../services/api/ApiService";
import {ERRORS, ROLE} from '@nexcella/comein-api';

export const AuthStoreKey = 'authStore';

export type Profile = {
  id: string,
  username: string,
  roles: ROLE[]
}
export type LoginData = {
  username: string,
  password: string
}

export class AuthStore {
  @ignore
  @observable isLoading = false;

  @ignore
  @observable error?: string;

  @observable isLoggedIn = false;

  @format(
    (hash) => hash ? atob(hash) : undefined,
    (token?: string) => token ? btoa(token) : undefined
  )
  @observable token?: string

  @format(
    (hash) => hash ? atob(hash) : undefined,
    (refreshToken?: string) => refreshToken ? btoa(refreshToken) : undefined
  )
  @observable refreshToken?: string

  @observable tokenTtl?: Date

  @observable profile?: Profile;

  @ignore
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  @action.bound
  login({username, password}: LoginData) {
    this.isLoading = true;
    this.apiService.auth.usernameLogin({username, password})
      .then((response) => {
        if("success" in response) {
          const {id, token, username, refreshToken, ttl, roles} = response.success.profile;
          this.profile = {id, username, roles};
          this.token = token;
          this.refreshToken = refreshToken;
          this.tokenTtl = new Date(ttl);
          this.isLoggedIn = true;
        } else {
          switch (response.error.code) {
            case ERRORS.AUTH.INCORRECT_USERNAME:
              this.error = 'incorrect_username';
              break;
            case ERRORS.VALIDATION.REQUEST:
              this.error = 'validation';
              break;
            default:
              this.error = 'internal'
          }
        }
        this.isLoading = false;
      });
  }

  @action.bound
  logout() {
    this.isLoggedIn = false;
    this.isLoading = false;
    this.profile = undefined;
    this.token = undefined;
  }

  @action.bound
  getProfile() {
    this.apiService.auth.profile()
      .then((response) => {
        if("success" in response) {
          const user = response.success.user;
          this.profile = {
            id: user.id,
            username: user.username,
            roles: user.roles,
          }
        }
      })
  }

}
