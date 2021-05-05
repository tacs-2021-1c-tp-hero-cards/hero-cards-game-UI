import { ServerConnector } from "../BackendConnector"
import { redirect } from "./Redirect"
import { User } from "./User"


export function logIn(user: User, from: any) {
    ServerConnector.logIn(user,
                         (data) => redirect('/user', from),
                         (error) => redirect('/error', from))
}