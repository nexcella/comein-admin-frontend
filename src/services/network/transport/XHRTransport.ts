import axios, {AxiosInstance, Method} from "axios";
import {nanoid} from "nanoid";
import {ErrorData, ERRORS, SuccessResponse} from "@nexcella/comein-api"
import {TransportInterface} from "./TransportInterface";
import {config} from "../../../config/app";
import {logger} from "../../../utils/logger";
import {getVersion} from "../../../utils/version";


export class XHRTransport implements TransportInterface {
  private axios: AxiosInstance;
  private onRequestCallback?: (requestId: string) => void;
  private onRequestSuccessCallback?: (requestId: string) => void;
  private onRequestFailCallback?: (requestId: string, error: ErrorData) => void;

  constructor() {
    this.axios = axios.create({
      baseURL: config.API.basePath,
      headers: {
        client: `${config.appName} / ${getVersion()}`
      }
    })
  }

  public setToken(token?: string) {
    if (token) {
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      this.axios.defaults.headers.common['Authorization'] = undefined;
    }
  }

  public setOnRequestCallback(callback: (requestId: string,) => void) {
    this.onRequestCallback = callback;
  }

  public setOnRequestSuccessCallback(callback: (requestId: string,) => void) {
    this.onRequestSuccessCallback = callback;
  }

  public setOnRequestFailCallback(callback: (requestId: string, error: ErrorData) => void) {
    this.onRequestFailCallback = callback;
  }

  public request<T, R>(method: Method, url: string, data?: T, options?: object): Promise<{ success: R } | { error: ErrorData }> {
    const requestId = `${nanoid(16)}-1`
    this.axios.defaults.headers.common['x-requestid'] = requestId;
    logger.debug(`[transport] -> ${requestId} - ${url}`);

    if (this.onRequestCallback) {
      this.onRequestCallback(requestId);
    }
    return this.axios.request<SuccessResponse<R>>({method, url, data})
      .then((response) => {
        logger.debug(`[transport] <- ${requestId} - ${response.status}`)
        if (this.onRequestSuccessCallback) {
          this.onRequestSuccessCallback(requestId);
        }
        return {
          success: response.data.data
        }
      })
      .catch((error) => {
        logger.debug(`[transport] <- x ${requestId} - ${error.response?.data?.data?.code ?? 'n/a'} - ${error.response?.status} - ${error.message}`);
        const errorData = error.response?.data?.data ?? {code: ERRORS.COMMON.INTERNAL, message: error.message}
        if (this.onRequestFailCallback) {
          this.onRequestFailCallback(requestId, errorData);
        }
        return {
          error: errorData
        }
      });
  }


}
