import { ServerConnector } from "../BackendConnector"
import { updateState } from "../store/hooks"
import store from "../store/Store"
import { disconnect } from "../websocket/client"
import { clearToken, getToken } from "./Token"


export function logOut(onSuccess: () => void, onFailure: () => void) {
    
    ServerConnector
        .logOut(
            getToken() ?? store.getState().user.token,
            () => {
                updateState({ type: 'user/clear' })
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