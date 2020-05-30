import {ErrorData} from "@nexcella/comein-api";

export class TransportError extends Error {
  constructor (public data: ErrorData) {
    super();
  }
}
