import Embed from "./Embed";

export default interface Message {
    content? : string,
    embeds?: Array<Embed>,
    components?: Array<any>
}