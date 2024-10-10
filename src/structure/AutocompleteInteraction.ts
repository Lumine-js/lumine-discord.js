import BaseInteraction from "./BaseInteraction";
import * as Constants from "../util/Constants"
import * as Enum from "../util/Enum"

//========== CLASS
class AutocompleteInteraction extends BaseInteraction {
    options?: any
    client: any

    token: any
    id: string
    name: string
    description: string
    messageId?: string
    authorId: string
    channelId: string
    guildId: string
    locale: string
    guildLocale?: any
  constructor(options?: any, client?: any) {
    super()

    this.client = client || null;

    var daneta = JSON.parse(JSON.stringify(options))
    //this.rawdata = options
    this.name = daneta?.data?.name || null
    this.description = daneta?.data?.description || null
    this.locale = daneta?.locale || null
    this.guildLocale = daneta?.guild_locale || null
    this.guildId = daneta?.guild_id || null
    this.channelId = daneta?.channel_id || null
    this.authorId = daneta?.member?.user?.id || null
    this.options = daneta?.data?.options || []
    this.token = daneta?.token || null
    this.id = daneta?.id || null
  }

  async respond(options = []) {
    await this.client.requestAPI("POST", Constants.ENDPOINTS.RESPOND_INTERACTION(this.id, this.token), {
      type: 8,
      data: {
        choices: options || []
      }
    })
  }

  getFocused(key: string) {
    return this?.options?.find((x: any) => x.focused === true && x.name === key).value || this?.options[0]?.options?.find((x: any) => x.focused === true && x.name === key).value || this?.options[0]?.options[0]?.options?.find((x: any) => x.focused === true && x.name === key)?.value || null;
  }

  getSubcommandGroup(key: string, required = false): string | null {
    return this?.options?.find((x: any) => x.type === Enum.CommandOptionType.SUB_COMMAND_GROUP)?.name || null
  }

  getSubcommand(): string | null {
    return this?.options?.find((x: any) => x.type === Enum.CommandOptionType.SUB_COMMAND) || this?.options[0]?.options?.find((x: any) => x.type === Enum.CommandOptionType.SUB_COMMAND)?.name || null
  }

  getString(key: string, required = false): string | null {
    return this?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.STRING))?.value || this?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.STRING))?.value || this?.options[0]?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.STRING))?.value || null
  }

  getNumber(key: string, required = false): number | null {
    return this?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.NUMBER))?.value || this?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.NUMBER))?.value || this?.options[0]?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.NUMBER))?.value || null
  }

  getBoolean(key: string, required = false): boolean | null {
    return this?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.BOOLEAN))?.value || this?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.BOOLEAN))?.value || this?.options[0]?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.BOOLEAN))?.value || null
  }

  getInteger(key: string, required = false): number | null {
    return this?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.INTEGER))?.value || this?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.INTEGER))?.value || this?.options[0]?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.INTEGER))?.value || null
  }

  getAttachment(key: string, required = false): any | null {
    return this?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.ATTACHMENT))?.value || this?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.ATTACHMENT))?.value || this?.options[0]?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.ATTACHMENT))?.value || null
  }

  getChannel(key: string, required = false): any | null {
    return this?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.CHANNEL))?.value || this?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.CHANNEL))?.value || this?.options[0]?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.CHANNEL))?.value || null
  }

  getUser(key: string, required = false): any | null {
    return this?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.USER))?.value || this?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.USER))?.value || this?.options[0]?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.USER))?.value || null
  }

  getMentionable(key: string, required = false): any | null {
    return this?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.MENTIONABLE))?.value || this?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.MENTIONABLE))?.value || this?.options[0]?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.MENTIONABLE))?.value || null
  }

  getRole(key: string, required = false): any | null {
    return this?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.ROLE))?.value || this?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.ROLE))?.value || this?.options[0]?.options[0]?.options?.find((x: any) => (x.name === key && x.type === Enum.CommandOptionType.ROLE))?.value || null
  }
}

export default AutocompleteInteraction