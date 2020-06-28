import {ErrorData} from "@nexcella/comein-api";

export interface TransportInterface {
  setToken(token?: string): void

  request<R, D = undefined>(method: string, path: string, data?: D, options?: object): Promise<{ success: R } | { error: ErrorData }>;
}
