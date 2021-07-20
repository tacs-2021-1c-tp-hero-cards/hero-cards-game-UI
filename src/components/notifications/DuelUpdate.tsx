import { HistoricPlayer } from "../players/Player"

export type DuelUpdate = {
    matchId: number,
    player: HistoricPlayer,
    opponent: HistoricPlayer,
    duelType: string,
    duelResult: string
}
