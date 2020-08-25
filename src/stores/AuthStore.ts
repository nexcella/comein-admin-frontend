import {action, observable} from 'mobx';
import {format, ignore} from "mobx-sync";
import {ApiService} from "../services/api/ApiService";
import {ERRORS, Profile as ProfileResponse, ROLE} from '@nexcella/comein-api';
import {UsernameRegisterDto} from "@nexcella/comein-api/dist";

export const AuthStoreKey = 'authStore';

export type Profile = {
  id: string,
  username: string,
  name: string,
  phone: string,
  roles: ROLE[]
  isAdmin: boolean
}
export type LoginData = {
  username: string,
  password: string
}

export type RegisterData = {
  name: string,
  username: string,
  phone: string,
  password: string,
}

export type ForgotData = {
  username: string,
}

export class AuthStore {
  @ignore
  @observable isLoading = false;

  @ignore
  @observable error?: string;

  @observable isLoggedIn = false;

  @observable successForgotEmail = false

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
    this.error = undefined;
    this.apiService.auth.usernameLogin({username, password})
      .then((response) => {
        if ("success" in response) {
          this.setProfile(response.success.profile);
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
  usernameRegister(data: UsernameRegisterDto) {
    this.isLoading = true;
    this.error = undefined;
    this.apiService.auth.usernameRegister({...data, autologin: true})
      .then((response) => {
        if ("success" in response) {
          this.setProfile(response.success.profile);
        } else {
          switch (response.error.code) {
            case ERRORS.AUTH.USER_ALREADY_EXIST:
              this.error = 'user_exist';
              break;
            case ERRORS.VALIDATION.REQUEST:
              this.error = 'validation';
              break;
            default:
              this.error = 'internal'
          }
        }
      })
      .finally(() => {
        this.isLoading = false
      })
  }

  @action.bound
  usernameForgot(data: ForgotData) {
    this.isLoading = true;
    this.error = undefined;
    this.apiService.auth.usernameForgot(data)
      .then((res) => console.debug({res}))
      .finally(() => {
        this.isLoading = false
        this.successForgotEmail = true;
      })
  }

  @action.bound
  clear() {
    this.successForgotEmail = false;
    this.error = undefined
  }

  @action.bound
  logout() {
    this.isLoggedIn = false;
    this.isLoading = false;
    this.profile = undefined;
    this.token = undefined;
    // @TODO request logout from service
  }

  @action.bound
  getProfile() {
    this.apiService.auth.profile()
      .then((response) => {
        if ("success" in response) {
          this.profile = {
            ...response.success.profile,
            isAdmin: response.success.profile.roles.includes('admin')
          };

        }
      })
  }

  private setProfile(profile: ProfileResponse) {
    const {id, token, username, name, phone, refreshToken, ttl, roles = []} = profile;
    this.profile = {id, username, roles, name, phone, isAdmin: roles.includes('admin')};
    if (token && ttl) {
      this.token = token;
      this.refreshToken = refreshToken;
      this.tokenTtl = new Date(ttl);
      this.isLoggedIn = true;
    }
  }

}
