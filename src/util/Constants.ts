

module.exports.ResolveColor = (args: string) => {
    if (!args) return;
    if (args.startsWith("#")) {
        var bbggrr = args.substr(4, 2) + args.substr(2, 2) + args.substr(0, 2);
        return parseInt(bbggrr, 16);
    }
    args = args.toLowerCase()
    if (!args.startsWith('#')) {
        args = args.toLowerCase()
        switch (args) {
            case "green":
                return 3066993
                break;
            case "blue":
                return 3447003
                break;
            case "purple":
                return 10181046
                break;
            case "orange":
                return 15105570
                break;
            case "red":
                return 15158332
                break;
            case "yellow":
                return 16776960
                break;
            case "random":
                var datawarna = [3066993, 10181046, 3447003, 15105570, 15158332, 16776960]
                return datawarna[Math.floor(Math.random() * datawarna.length)];
                break;
        }

    }
}

export const ENDPOINTS = {
    RESPOND_INTERACTION: (interaction_id: string, interaction_token: string) => `/interactions/${interaction_id}/${interaction_token}/callback`,
    EDIT_INTERACTION: (application_id: string, interaction_token: string) => `/webhooks/${application_id}/${interaction_token}/messages/@original`,
    FOLLOWUP_INTERACTION: (application_id: string, interaction_token: string) => `/webhooks/${application_id}/${interaction_token}`,
    GLOBAL_COMMANDS: (application_id: string) => `/applications/${application_id}/commands`,
    GUILD_COMMANDS: (application_id: string, guild_id: string) => `/applications/${application_id}/guilds/${guild_id}/commands`,
    USER: (user_id: string) => `/users/${user_id}`,
    CHANNEL: (channel_id: string) => `/channels/${channel_id}`,
    CREATE_MESSAGE: (channel_id: string) => `/channels/${channel_id}/messages`
}