import {action, observable} from 'mobx';
import {format, ignore} from "mobx-sync";
import {ApiService} from "../services/api/ApiService";
import {TransportError} from "../services/network/transport/TransportError";
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
      .then(({profile}) => {
        const {id, token, username, refreshToken, ttl, roles} = profile;
        this.profile = {id, username, roles};
        this.token = token;
        this.refreshToken = refreshToken;
        this.tokenTtl = new Date(ttl);
        this.isLoggedIn = true;
        this.isLoading = false;
      })
      .catch(({data}: TransportError) => {
        this.isLoading = false;
        switch (data.code) {
          case ERRORS.AUTH.INCORRECT_USERNAME:
            this.error = 'incorrect_username';
            break;
          case ERRORS.VALIDATION.REQUEST:
            this.error = 'validation';
            break;
          default:
            this.error = 'internal'
        }
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
      .then(({user}) => {
        this.profile = {
          id: user.id,
          username: user.username,
          roles: user.roles,
        }
      })
      .catch(({data}: TransportError) => {
        switch (data.code) {
          case ERRORS.FORBIDDEN.PERMISSION_DENIED:
            this.logout();
        }
      })
  }

}
