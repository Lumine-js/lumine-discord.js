import BaseInteraction from "./BaseInteraction";
import * as Constants from "./../util/Constants"

//========== CLASS
class ButtonInteraction extends BaseInteraction {
    rawdata?: any
    client?: any

    token: any
    id: string
    messageId?: string
    userId: string
    channelId: string
    guildId: string
    locale: string
    guildLocale?: any

  constructor(options: any, client?: any) {
    super()

    this.client = client || null;

    var daneta = JSON.parse(JSON.stringify(options))
    this.rawdata = options
    this.token = daneta?.token || null
    this.id = daneta?.id || null
    this.messageId = daneta?.message.id || null
    this.userId = daneta?.member.id || null
    this.channelId = daneta?.channel_id || null
    this.guildId = daneta?.guild_id || null
    this.locale = daneta?.locale || null
    this.guildLocale = daneta?.guild_locale || null
  }

  async reply(msgdata: any) {
    await this.client.requestAPI("POST", Constants.ENDPOINTS.RESPOND_INTERACTION(this.id, this.token), {
      type: 4,
      data: msgdata
    })
  }

  async deferUpdate() {
    await this.client.requestAPI("POST", Constants.ENDPOINTS.RESPOND_INTERACTION(this.id, this.token), {
      type: 6
    })
  }

  async showModal(modaldata: any) {
    await this.client.requestAPI("POST", Constants.ENDPOINTS.RESPOND_INTERACTION(this.id, this.token), {
      type:9,
      data:modaldata
    })
  }
}

export default ButtonInteraction