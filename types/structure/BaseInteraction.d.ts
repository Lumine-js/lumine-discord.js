declare class BaseInteraction {
    token?: string;
    rawdata?: any;
    constructor(options?: {});
    isCommand(): true | undefined;
    isChatInputCommand(): boolean;
    isUserCommand(): boolean;
    isMessageCommand(): boolean;
    isButton(): boolean;
    isSelectMenu(): boolean;
}
export default BaseInteraction;
