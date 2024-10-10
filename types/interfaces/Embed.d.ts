import { EmbedAuthor, EmbedField, ImageSource } from "../util/Type";
export default interface Embed {
    title: string | null;
    description: string | null;
    url: string | null;
    fields: Array<EmbedField>;
    author: EmbedAuthor | null;
    footer: any | null;
    image: ImageSource | null;
    color: Array<number> | number | string;
    thumbnail?: ImageSource | null;
    date?: VarDate;
}
