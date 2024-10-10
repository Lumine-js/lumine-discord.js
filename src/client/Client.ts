import {
  EventEmitter
} from "node:events";
import clc from "cli-color";
import WebSocket from "ws"
import axios, { Axios, AxiosRequestConfig } from "axios"

import ClientOption from "../interfaces/ClientOption";
import Activities from "../interfaces/Activities";
import User from "../interfaces/User";
import { OPCodes } from "../util/Enum";

import UserClient from "../structure/UserClient";
import ChatInputInteraction from "../structure/ChatInputInteraction";
import AutocompleteInteraction from "../structure/AutocompleteInteraction";
import ButtonInteraction from "../structure/ButtonInteractio";

export class Client extends EventEmitter {
  private token: string | null;
  private intents: number | null;
  private YourActivity: {
    activities: Activities[],
    status: string
  };
  ws?: any
  private wsUrl?: string | null
  user?: User | null


  public constructor(option: ClientOption) {
    super()
    this.token = option?.token || null
    this.intents = option?.intents || null
    this.YourActivity = {
      activities: [],
      status: "Online"
    }
  }

  /**
 * Masuk dan terhubung dengan klien discord
 *
 * @param {string} token - Angka pertama.
 * @returns {void} - Akan mengeluarkan hasil user.
 */

  login(token: string) {
    if (this?.token == null) {
      if (!token) throw Error("Token invalid")
      this.token = token
      console.log("Wellcome to", clc.bold("lumined.js"))
    }
    if (this.ws) {
      throw new Error('Client Already Run')
    }
    if (this.intents === null) throw new Error("Intents Harus Terisi")
    return this.startWebsocket()
  }

  async requestAPI(method: string, params: string, data: any, headers: any) {
    let object: AxiosRequestConfig = {
      method: method,
      url: "https://discord.com/api/v10" + params,
      headers: {
        Authorization: `Bot ${this.token}`
      }
    }

    if (headers) {
      object.headers = {
        ...headers, ...{
          Authorization: `Bot ${this.token}`
        }
      }
    }

    if (data) object.data = data


    return axios(object).then(x => {
      return x.data
    }).catch(err => {
      if (err.response.status === 400) {
        var DiscordERROR = err.response.data
        throw new Error('DiscordApiError : ' + `{
                    "code": ${DiscordERROR.code},
                    "message": ${DiscordERROR.message},
                    "error": ${JSON.stringify(DiscordERROR.errors)},
                    "url": ${object.url}
                  }`)
      }

    })
  }

  private async startWebsocket() {
    let wssurl = `wss://gateway.discord.gg/?v=10&encoding=json`

    let BotObjectLogin: {
      presence: any,
      token: string | null,
      properties: any,
      intents: number | null
    } = {
      // you should put your token here _without_ the "Bot" prefix
      token: this.token,
      properties: {
        $os: "Lumine.js",
        $browser: 'Lumine.js',
        $device: "linux",
      },
      intents: this.intents,
      presence: {}
    }
    if (this.YourActivity) BotObjectLogin.presence = this.YourActivity

    if (!this.wsUrl) {
      this.ws = new WebSocket(wssurl)
      this.wsUrl = wssurl
    }

    let sequence = 0;

    if (this?.wsUrl !== wssurl) {
      this.ws.onclose = this.ws.onerror = (e: any) => {
        this.ws = null
        this.emit("moduleLogging", 'Try To Reconnect')
        this.startWebsocket()
      }
    } else {
      this.ws.onopen = () => {
        this.emit("moduleLogging", 'Lumine.js Connected To Websocket')
      }
    }

    this.ws.onmessage = async ({ data }: MessageEvent) => {
      let packet = JSON.parse(data)

      //Eksekusi Dasar Pemindahan
      if ((packet?.d?.resume_gateway_url) && (this.wsUrl === wssurl)) {
        await this.ws.close()
        this.ws = new WebSocket(packet.d.resume_gateway_url)
        this.wsUrl = packet.d.resume_gateway_url
        this.emit("moduleLogging", 'Lumine.js Change To Regional Websocket')
        return this.startWebsocket()
      } else {
        switch (packet.op) {
          case OPCodes.HELLO:
            // set heartbeat interval
            if (packet.s) sequence = packet.s;
            setInterval(() => this.sendWebsocket(OPCodes.HEARTBEAT, sequence), packet.d.heartbeat_interval - 3000);
            // https://discordapi.com/topics/gateway#gateway-identify
            this.sendWebsocket(OPCodes.IDENTIFY, BotObjectLogin);
        }

        // handle gateway packet types
        if (!packet?.t) return;
        this.emit('rawEvent', { t: packet.t, d: packet.d })
        switch (packet.t) {
          // we should get this after we send identify
          case 'READY':
            this.user = new UserClient(packet.d)
            this.emit("ready", new UserClient(packet.d, this))
            const packg = require("./../../package.json")
            console.log(`Bot ${clc.bold.blue(new UserClient(packet.d, this).username)} telah aktif, \nTerimakasih menggunakan ${clc.yellow.bold(packg.name)} versi ${packg.version}.\nDokumentasi bisa diperiksa pada \n${clc.blue(`https://github.com/Lumine-js/${packg.name}`)}\n\n\n\n`)
            break;
          case 'INTERACTION_CREATE':
            if (packet.d.type === 2 && packet.d.data.type === 1) {
              this.emit('interactionCreate', new ChatInputInteraction(packet.d, this))
              this.emit('ChatInputInteraction', new ChatInputInteraction(packet.d, this))
            }

            if (packet.d.type === 3 && packet.d.data.type === 2) {
              this.emit('interactionCreate', new ButtonInteraction(packet.d, this))
              this.emit('ButtonInteraction', new ButtonInteraction(packet.d, this))
            }

            if (packet.d.type === 4) {
              this.emit('interactionCreate', new AutocompleteInteraction(packet.d, this))
              this.emit('Autocomplete', new AutocompleteInteraction(packet.d, this))
            }
            break;
        }
      };
    }
  }

  async sendWebsocket(op: number, d: any) {
    this.ws.send(JSON.stringify({ op: op, d: d }));
  }
}