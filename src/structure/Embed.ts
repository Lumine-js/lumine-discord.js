import { isObject } from "util"
import { ResolveColor } from "../util/Constants"
import EmbedInterface from "../interfaces/Embed"
import { EmbedAuthor, EmbedField, EmbedFooter, ImageSource } from "../util/Type"


class Embed implements EmbedInterface {
    title: string | null
    description: string | null
    url: string | null
    fields: Array<EmbedField>
    author: EmbedAuthor | null
    footer: any | null
    image: ImageSource | null
    color: Array<number> | number | string
    thumbnail?: ImageSource | null
    date?: VarDate
    constructor(raw?: EmbedInterface) {
        this.title = raw?.title || null
        this.description = raw?.description || null
        this.url = raw?.url || null
        this.fields = raw?.fields || []
        this.author = raw?.author || null
        this.footer = raw?.footer || null
        this.image = raw?.image || null
        this.color = raw?.color || ResolveColor("Random")
    }

    addField(data: EmbedField | string, value: string, inline?: boolean) {
        try {
            if (!Array.isArray(this.fields)) this.fields = []
            if (typeof data == "object") {
                this.fields.push({ name: data.name, value: data.value, inline: data.inline || false })
                return this
            } else {
                this.fields.push({ name: data, value: value, inline: inline || false })
                return this
            }
        } catch (err: any) {
            throw new Error(err)
            return this
        }
    }

    addFields(fields: Array<EmbedField>) {
        try {
            this.fields = [...this.fields, ...fields]
            return this
        } catch (err: any) {
            throw new Error("Builder Error : " + err)
            return this
        }
    }

    setColor(color: Array<number> | number | string) {
        try {
            if ((typeof color === "string")) {
                this.color = ResolveColor(color)
                return this
            } else if ((typeof color === "number")) {
                this.color = color
                return this
            } else if ((Array.isArray(color))) {
                this.color = [color[0], color[1], color[2]]
                return this
            }
        } catch (err: any) {
            throw new Error(err)
            return this
        }
    }

    setImage(image: ImageSource | string) {
        try {
            if (typeof image === "string") {
                this.image = { url: image }
                return this
            } else {
                if ((!image.url?.startsWith("http")) || (!image.url?.startsWith("https"))) {
                    throw new Error("Parameter image.url Must Be Using URL\n\nLike \"https||//google.com/image.jpg\"")
                    return this
                }
                this.image = { url: image.url }
                return this

            }
        } catch (err: any) {
            throw new Error(err)
            return this
        }
    }

    setThumbnail(image: ImageSource | string) {
        try {
            if (typeof image === "string") {
                this.image = { url: image }
                return this
            } else {
                if ((!image.url?.startsWith("http")) || (!image.url?.startsWith("https"))) {
                    throw new Error("Parameter image.url Must Be Using URL\n\nLike \"https||//google.com/image.jpg\"")
                    return this
                }
                this.image = { url: image.url }
                return this

            }
        } catch (err: any) {
            throw new Error(err)
            return this
        }
    }

    setDescription(description: string) {
        try {
            this.description = description
            return this
        } catch (err: any) {
            throw new Error(err)
            return this
        }
    }

    setTitle(title: string) {
        try {
            this.title = title
            return this
        } catch (err: any) {
            throw new Error(err)
            return this
        }
    }

    setAuthor(data: EmbedAuthor | string, iconURL?: string, url?: string) {
        try {
            if (typeof data == "object") {
                this.author = { name: data.name, iconURL: data.iconURL, url: data.url }
                return this
            } else {
                this.author = { name: data, iconURL: iconURL, url: url }
                return this
            }
        } catch (err: any) {
            throw new Error(err)
            return this
        }
    }

    setFooter(data: EmbedFooter | string, iconURL: string) {
        try {
            if (typeof data == "object") {
                this.footer = { text: data.text, iconURL: data.iconURL }
                return this
            } else {
                this.footer = { text: data, iconURL: iconURL }
                return this
            }
        } catch (err: any) {
            throw new Error(err)
            return this
        }
    }

    setURL(url: string) {
        try {
            this.url = url
            return this
        } catch (err: any) {
            throw new Error(err)
            return this
        }
    }

    setTimestamp(date: VarDate) {
        try {
            this.date = date
            return this
        } catch (err: any) {
            throw new Error(err)
            return this
        }
    }
}

export default Embed