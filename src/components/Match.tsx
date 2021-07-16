import { Collection } from "../commons/Collections";
import { DeckData, DeckHistoricData } from "./Deck";
import { User } from "./User"
import { Player } from "./Player"
import { HistoricDuel } from "./Duel"

export type MatchCreation = {
    userId: number,
    userType: string,
    deckId: number
}

export type Match = {
    id: number,
    players: Player[],
    deck: DeckHistoricData,
    status: string,
    duelHistoryList: HistoricDuel[]
}