import {ErrorData} from "@nexcella/comein-api";

import {AuthService} from "./AuthService";
import {XHRTransport} from "../network/transport/XHRTransport";
import {logger} from "../../utils/logger";
import {ProjectsService} from "./ProjectsService";

export class ApiService {
  public auth: AuthService;
  public projects
  private transport = new XHRTransport();

  constructor() {
    this.auth = new AuthService(this.transport);
    this.projects = new ProjectsService(this.transport);
  }

  public setOnRequestCallback(callback: (requestId: string,) => void) {
    this.transport.setOnRequestCallback(callback);
  }

  public setOnRequestSuccessCallback(callback: (requestId: string,) => void) {
    this.transport.setOnRequestSuccessCallback(callback);
  }

  public setOnRequestFailCallback(callback: (requestId: string,error: ErrorData) => void) {
    this.transport.setOnRequestFailCallback(callback);
  }

  public setToken(token?: string) {
    if(token) {
      logger.debug('[auth] set token: *****');
    } else {
      logger.debug('[auth] empty token');
    }
    this.transport.setToken(token)
  }
}
