import User from "../interfaces/User";
export default class UserClient {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    banner: string;
    bot: boolean;
    accent_color: string;
    constructor(options: {
        user: User;
    }, client?: any);
}
