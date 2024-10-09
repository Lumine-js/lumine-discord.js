import BaseInteraction from "./BaseInteraction";
declare class AutocompleteInteraction extends BaseInteraction {
    options?: any;
    client: any;
    token: any;
    id: string;
    name: string;
    description: string;
    messageId?: string;
    authorId: string;
    channelId: string;
    guildId: string;
    locale: string;
    guildLocale?: any;
    constructor(options?: any, client?: any);
    respond(options?: never[]): Promise<void>;
    getFocused(key: string): any;
    getSubcommandGroup(key: string, required?: boolean): string | null;
    getSubcommand(): string | null;
    getString(key: string, required?: boolean): string | null;
    getNumber(key: string, required?: boolean): number | null;
    getBoolean(key: string, required?: boolean): boolean | null;
    getInteger(key: string, required?: boolean): number | null;
    getAttachment(key: string, required?: boolean): any | null;
    getChannel(key: string, required?: boolean): any | null;
    getUser(key: string, required?: boolean): any | null;
    getMentionable(key: string, required?: boolean): any | null;
    getRole(key: string, required?: boolean): any | null;
}
export default AutocompleteInteraction;