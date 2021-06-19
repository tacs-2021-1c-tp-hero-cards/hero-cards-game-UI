import { Collection } from "../commons/Collections"
import { capitalize, split } from "lodash"

export function capitalizeEveryWord(string: string): string {
    return Collection
        .wrap(split(string, ' '))
        .map( word => capitalize(word).concat(' ') )
        .foldLeft((s, w) => s.concat(w), '')
}