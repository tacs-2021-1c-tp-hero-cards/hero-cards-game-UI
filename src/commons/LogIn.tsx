import { ServerConnector } from "../BackendConnector"
import { setCookie } from "./Cookies"
import { setToken } from "./Token"
import { User } from "../components/User"


export function logIn(user: User, onSuccess: () => void, onFailure: () => void) {
    ServerConnector.logIn(user,
                         (data) => {
                             setCookie('username', user.username)
                             setToken(data.token)
                             onSuccess()
                            },
                         (error) => onFailure())
}