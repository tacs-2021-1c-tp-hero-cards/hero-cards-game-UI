import { CardAttributes } from "../cards/Card";
import { User } from "./User";

export type Player = {
    id: number,
    user: User,
    availableCards: CardAttributes[],
    prizeCards: CardAttributes[]
}

export type HistoricPlayer = {
    id: number,
    //version: number,
    cardPlayed: CardAttributes,
    availableCards: CardAttributes[],
    prizeCards: CardAttributes[]
}