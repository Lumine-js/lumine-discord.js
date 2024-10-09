/// <reference types="node" />
import { EventEmitter } from "node:events";
import ClientOption from "../interfaces/ClientOption";
import User from "../interfaces/User";
export declare class Client extends EventEmitter {
    private token;
    private intents;
    private YourActivity;
    ws?: any;
    private wsUrl?;
    user?: User | null;
    constructor(option: ClientOption);
    /**
   * Masuk dan terhubung dengan klien discord
   *
   * @param {string} token - Angka pertama.
   * @returns {void} - Akan mengeluarkan hasil user.
   */
    login(token: string): void;
    requestAPI(method: string, params: string, data: any, headers: any): Promise<any>;
    private startWebsocket;
    sendWebsocket(op: number, d: any): Promise<void>;
}
