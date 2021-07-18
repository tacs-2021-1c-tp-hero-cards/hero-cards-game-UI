import { HistoricPlayer } from "../players/Player"

export type Duel = {

}

export type HistoricDuel = {
    id: number,
    player: HistoricPlayer,
    opponent: HistoricPlayer,
    duelType: string,
    duelResult: string
}