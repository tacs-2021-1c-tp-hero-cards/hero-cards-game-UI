import { ServerConnector } from "../BackendConnector"
import { redirect } from "./Redirect"
import { User } from "./User"


export function logOut(props: User, from: any) {
    ServerConnector.logOut(props.token,
                           (data) => redirect('/', from),
                           (error) => redirect('/error', from))
}