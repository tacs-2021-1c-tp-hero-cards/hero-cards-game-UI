import { ServerConnector } from "../BackendConnector"
import { getCookie, setCookie } from "./Cookies"
import { clearToken } from "./Token"


export function logOut(onSuccess: () => void, onFailure: () => void) {
    const token = getCookie('token')
    clearToken()
    ServerConnector.logOut(token!,
                           (data) => onSuccess(),
                           (error) => onFailure())
}