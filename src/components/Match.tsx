import { Collection } from "../commons/Collections";
import { DeckData } from "./Deck";
import { User } from "./User"

export type Match = {
    users: Collection<User>
    deck: DeckData
}