import { ServerConnector } from '../BackendConnector'
import { updateState } from '../store/hooks'
import store from '../store/Store'

export default function getStats(userId?: string, onError?: (error: any) => void) {
    ServerConnector.getHumanScore(
        userId ?? store.getState().user.id,
        (score) => updateState({ type: 'user/updateStats', payload: score }),
        (error) => onError ? onError(error) : {}
    )
}