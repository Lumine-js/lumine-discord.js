import {
  EventEmitter
} from "node:events";
import clc from "cli-color";
import WebSocket from "ws"

import ClientOption from "../interfaces/ClientOption";

export class Client extends EventEmitter {
  private token: string;
  private intents: number;

  public constructor(option: ClientOption) {
    super()
    this.token = option?.token
    this.intents = option?.intents
  }

  login(token: string): void {
    if (this?.token == null) {
      if (!token) throw Error("Token invalid")
      this.token = token
      console.log("Wellcome to", clc.bold("lumined.js"))
      this.token = token
    }
  }
}