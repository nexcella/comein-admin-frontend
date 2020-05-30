import {action, observable} from "mobx";
import {config} from "../config/app";

export const AppStoreKey = 'appStore';

export class AppStore {
  @observable locale: string = config.defaultLocale;

  @action setLocale(locale: string) {
    this.locale = locale;
  }
}
