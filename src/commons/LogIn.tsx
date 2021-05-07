import { ServerConnector } from "../BackendConnector"
import { redirect } from "./Redirect"
import { UserProps } from "./User"


export function logIn(user: UserProps, from: any) {
    ServerConnector.logIn(user,
                         (data) => redirect('/user', from),
                         (error) => redirect('/error', from))
}