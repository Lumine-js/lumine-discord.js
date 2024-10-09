import User from "../interfaces/User"

export default class UserClient {
    id: string
    username: string
    discriminator: string
    avatar: string
    banner: string
    bot: boolean
    accent_color: string
    constructor(options: { user: User }, client? : any) {
        this.id = options?.user?.id
        this.username = options?.user?.username
        this.discriminator = options?.user?.discriminator
        this.avatar = options?.user?.avatar
        this.banner = options?.user?.banner
        this.bot = options?.user?.bot
        this.accent_color = options?.user?.accent_color
    }
}