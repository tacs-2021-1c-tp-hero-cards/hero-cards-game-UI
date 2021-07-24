import { ServerConnector } from '../BackendConnector'
import { UserMatch } from '../components/matches/Match'
import { updateState } from '../store/hooks'
import store from '../store/Store'


export default function getUserMatches(userId?: string, onSuccess?: (matches: UserMatch[]) => void, onError?: (error: any) => void) {
    ServerConnector.getUserMatches(
        userId ?? store.getState().user.id,
        (matches) => {
            updateState({ type: 'user/updateMatches', payload: matches })
            onSuccess ? onSuccess(matches) : {}
        },
        (error) => onError ? onError(error) : {}
    )
}