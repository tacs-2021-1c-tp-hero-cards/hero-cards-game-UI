import { ServerConnector } from "../BackendConnector"
import store from "../store/Store"
import { clearToken, getToken } from "./Token"


export function logOut(onSuccess: () => void, onFailure: () => void) {
    ServerConnector
        .logOut(
            () => {
                store.dispatch({ type: 'user/deleteUser' })
                clearToken()
                onSuccess()
                },
            (_) => {
                clearToken()
                onFailure()
                }
            )
}