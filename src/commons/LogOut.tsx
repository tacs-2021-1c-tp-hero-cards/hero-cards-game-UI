import { ServerConnector } from "../BackendConnector"
import store from "../store/Store"
import { disconnect } from "../websocket/client"
import { clearToken } from "./Token"


export function logOut(onSuccess: () => void, onFailure: () => void) {
    ServerConnector
        .logOut(
            () => {
                store.dispatch({ type: 'user/clear' })
                clearToken()

                // Web socket disconnection
                disconnect()

                onSuccess()
                },
            (_) => {
                clearToken()

                // Web socket disconnection
                disconnect()

                onFailure()
                }
            )
}