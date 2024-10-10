export declare const ResolveColor: (args: string) => number;
export declare const ENDPOINTS: {
    RESPOND_INTERACTION: (interaction_id: string, interaction_token: string) => string;
    EDIT_INTERACTION: (application_id: string, interaction_token: string) => string;
    FOLLOWUP_INTERACTION: (application_id: string, interaction_token: string) => string;
    GLOBAL_COMMANDS: (application_id: string) => string;
    GUILD_COMMANDS: (application_id: string, guild_id: string) => string;
    USER: (user_id: string) => string;
    CHANNEL: (channel_id: string) => string;
    CREATE_MESSAGE: (channel_id: string) => string;
};
