import { ServerConnector } from "../BackendConnector"
import store from "../store/Store"
import { clearToken, getToken } from "./Token"


export function logOut(onSuccess: () => void, onFailure: () => void) {
    const token = getToken() ?? store.getState().user.token
    clearToken()
    ServerConnector.logOut(token,
                           (data) => {
                               store.dispatch({ type: 'user/deleteUser' })
                               onSuccess()
                            },
                           (error) => onFailure())
}