import { Url } from "url"

export type EmbedField = {
    name: string,
    value: string,
    inline?: boolean
}

export type ImageSource = {
    url: string,
    proxy_url?: string,
    height?: number,
    width?: number
}

export type EmbedAuthor = {
    name: string,
    iconURL?: string,
    url?: string
}

export type EmbedFooter = {
    text: string,
    iconURL: string
}