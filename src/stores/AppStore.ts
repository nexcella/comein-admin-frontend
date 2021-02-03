import {makeAutoObservable} from "mobx";
import {config} from "../config/app";

export class AppStore {
  locale: string = config.defaultLocale;
  isStorageLoaded: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLocale(locale: string) {
    this.locale = locale;
  }

  storageIsLoaded(isLoaded: boolean) {
    this.isStorageLoaded = isLoaded;
  }
}
