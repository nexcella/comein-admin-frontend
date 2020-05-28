import {AuthService} from "./AuthService";
import {XHRTransport} from "../network/transport/XHRTransport";
import {logger} from "../../utils/logger";

export class ApiService {
  public auth: AuthService;

  private transport = new XHRTransport();

  constructor() {
    this.auth = new AuthService(this.transport);
  }

  public setToken(token: string) {
    logger.debug('[auth] set token: *****');
    this.transport.setToken(token)
  }
}

export const apiService = new ApiService();
