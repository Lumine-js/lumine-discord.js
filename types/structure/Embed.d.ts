import EmbedInterface from "../interfaces/Embed";
import { EmbedAuthor, EmbedField, ImageSource } from "../util/Type";
declare class Embed implements EmbedInterface {
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
    constructor(raw?: EmbedInterface);
    addField(name: string, value: string, inline?: boolean): this;
    addFields(fields: Array<EmbedField>): this;
    setColor(color: Array<number> | number | string): this | undefined;
    setImage(image: ImageSource | string): this;
    setThumbnail(image: ImageSource | string): this;
    setDescription(description: string): this;
    setTitle(title: string): this;
    setAuthor(data: EmbedAuthor | string, iconURL?: string, url?: string): this;
    setFooter(text: string, iconURL: string): this;
    setURL(url: string): this;
    setTimestamp(date: VarDate): this;
}
export default Embed;
