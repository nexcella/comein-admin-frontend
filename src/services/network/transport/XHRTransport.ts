import axios, {AxiosInstance, Method} from "axios";
import {nanoid} from "nanoid";

import {TransportInterface} from "./TransportInterface";
import {config} from "../../../config/app";
import {logger} from "../../../utils/logger";


export class XHRTransport implements TransportInterface {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: config.API.basePath
    })
  }

  public setToken(token: string) {
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  }

  public request<T, R>(method: Method, url: string, data?: T, options?: object): Promise<R> {
    const requestId = `${nanoid(16)}-1`
    this.axios.defaults.headers.common['x-requestid'] = requestId;
    logger.debug(`[transport] -> ${requestId} - ${url}`);

    return this.axios.request<R>({method, url, data}).then((response) => {
      logger.debug(`[transport] <- ${requestId} - ${response.status}`)
      return response.data
    }).catch((error) => {
      logger.debug(`[transport] <- x ${requestId} - ${error.response.code ?? error.response.status}`);
      return error.response.data;
    });
  }


}
