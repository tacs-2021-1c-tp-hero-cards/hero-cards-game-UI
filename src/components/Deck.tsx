import { CardAttributes } from "./Card"


export type NewDeck = {
    deckName: string,
    cardIds: number[]
}

export type Deck = {
    id: number,
    name: string,
    cards: CardAttributes[],
    usable: boolean
}