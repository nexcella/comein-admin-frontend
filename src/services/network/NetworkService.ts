import {TransportInterface} from "./transport/TransportInterface";

export class NetworkService {
  protected transport: TransportInterface;

  constructor(transport: TransportInterface) {
    this.transport = transport;
  }
}
