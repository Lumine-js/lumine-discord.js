import BaseInteraction from "./BaseInteraction";
declare class ButtonInteraction extends BaseInteraction {
    rawdata?: any;
    client?: any;
    token: any;
    id: string;
    messageId?: string;
    userId: string;
    channelId: string;
    guildId: string;
    locale: string;
    guildLocale?: any;
    constructor(options: any, client?: any);
    reply(msgdata: any): Promise<void>;
    deferUpdate(): Promise<void>;
    showModal(modaldata: any): Promise<void>;
}
export default ButtonInteraction;
