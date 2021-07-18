import { DeckHistoricData } from "./Deck";
import { Player } from "./Player"
import { HistoricDuel } from "./Duel"

export type MatchCreation = {
    userId: number,
    userType: string,
    deckId: number
}

export type Match = {
    id: number,
    player: Player,
    oponent: Player,
    deck: DeckHistoricData,
    status: string,
    duelHistoryList: HistoricDuel[]
}