import { DeckHistoricData } from "../decks/Deck";
import { Player } from "../players/Player"
import { HistoricDuel } from "./Duel"

export type MatchCreation = {
    userId: number,
    userType: string,
    deckId: number
}

export type Match = {
    id: number,
    player: Player,
    opponent: Player,
    deck: DeckHistoricData,
    status: string,
    duelHistoryList: HistoricDuel[]
}