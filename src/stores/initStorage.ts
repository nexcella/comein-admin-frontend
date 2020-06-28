import {AsyncStorage, AsyncTrunk} from "mobx-sync";
import localForage from "localforage";

import {store} from "./RootStore";
import {logger} from "../utils/logger";

const STORAGE_KEY = '__persist_stores_';

export async function initStorage() {
  try {
    await localForage.ready();
    logger.debug(`use storage driver: ${localForage.driver()}`);
    const trunk = new AsyncTrunk(store, {storage: localForage as AsyncStorage, storageKey: STORAGE_KEY});
    await trunk.init()
  } catch (error) {
    // @TODO show global error? check store available (store.catchGlobalError?)
    logger.error('incorrect store initialization', error.message);
  } finally {
    store.setStoreLoaded();
  }
}
