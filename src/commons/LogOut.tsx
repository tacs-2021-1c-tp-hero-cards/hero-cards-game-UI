import { ServerConnector } from "../BackendConnector"
import { redirect } from "./Redirect"
import { User } from "./User"


export function logOut(user: User, from: any) {
    ServerConnector.logOut(user.token,
                           (data) => redirect('/', from),
                           (error) => redirect('/error', from))
}