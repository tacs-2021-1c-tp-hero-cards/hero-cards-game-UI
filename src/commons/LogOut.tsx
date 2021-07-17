import { ServerConnector } from "../BackendConnector"
import { updateState } from "../store/hooks"
import { disconnect } from "../websocket/client"
import { clearToken } from "./Token"


export function logOut(onSuccess: () => void, onFailure: () => void) {
    
    ServerConnector
        .logOut(
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