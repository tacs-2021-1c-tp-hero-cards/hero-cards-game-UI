import { ServerConnector } from "../BackendConnector"
import { setCookie } from "./Cookies"
import { redirect } from "./Redirect"
import { User } from "./User"


export function logIn(user: User, from: any) {
    ServerConnector.logIn(user,
                         (data) => {
                             setCookie('username', user.username)
                             setCookie('token', data.token)
                             redirect('/user', from)
                            },
                         (error) => redirect('/logInError', from))
}