import { ServerConnector } from "../BackendConnector"
import { redirect } from "./Redirect"
import { UserProps } from "./User"


export function logOut(user: UserProps, from: any) {
    ServerConnector.logOut(user.token,
                           (data) => redirect('/', from),
                           (error) => redirect('/error', from))
}