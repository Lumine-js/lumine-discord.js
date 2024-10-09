import Activities from "./Activities";

export default interface ClientOption {
    token: string,
    intents: number,
    activities: Array<Activities>
}