import { Collection } from "../commons/Collections";
import { DeckData, DeckHistoricData } from "./Deck";
import { User } from "./User"
import { Player } from "./Player"
import { HistoricDuel } from "./Duel"

export type Match = {
    users: Collection<User>
    deck: DeckData
}

export type MatchData = {
    id: number,
    players: Player[],
    deck: DeckHistoricData,
    status: string,
    duelHistoryList: HistoricDuel[]
}