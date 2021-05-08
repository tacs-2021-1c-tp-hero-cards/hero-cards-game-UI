import { ServerConnector } from "../BackendConnector"
import { getCookie, setCookie } from "./Cookies"
import { redirect } from "./Redirect"


export function logOut(from: any) {
    const token = getCookie('token')
    setCookie('token', '')
    ServerConnector.logOut(token!,
                           (data) => redirect('/', from),
                           (error) => redirect('/error', from))
}