

export const ResolveColor: (args: string) => number = (args) => {
    if (!args) return 3447003; // Default color

    if (args.startsWith("#")) {
        const bbggrr = args.substr(4, 2) + args.substr(2, 2) + args.substr(0, 2);
        return parseInt(bbggrr, 16);
    }

    args = args.toLowerCase();

    const colorMap: { [key: string]: number } = {
        "green": 3066993,
        "blue": 3447003,
        "purple": 10181046,
        "orange": 15105570,
        "red": 15158332,
        "yellow": 16776960,
    };

    if (colorMap[args]) {
        return colorMap[args];
    }

    if (args === "random") {
        const colors = Object.values(colorMap);
        return colors[Math.floor(Math.random() * colors.length)];
    }

    return 3447003;
};


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