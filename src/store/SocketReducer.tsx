import Collection from "../commons/Collections"
import { SocketData } from "./State"

const initialState: SocketData = {
    client: undefined,
    notifications: Collection.empty(),
    confirmations: Collection.empty(),
    rejections: Collection.empty(),
    abortions: Collection.empty(),
    duelUpdates: Collection.empty()
}

export default function socketReducer(state = initialState, action: any): SocketData {
    switch(action.type) {
        case 'socket/updateClient' : {
            return {
                ...state,
                client: action.payload
            }
        }
        case 'socket/pushNotification' : {
            const previousNotifications = state.notifications
            console.log(previousNotifications)
            return {
                ...state,
                notifications: previousNotifications.add(action.payload)
            }
        }
        case 'socket/removeNotification' : {
            const previousNotifications = state.notifications
            console.log(previousNotifications)
            return {
                ...state,
                notifications: previousNotifications.remove(action.payload)
            }
        }
        case 'socket/setConfirmation' : {
            return {
                ...state,
                confirmations: action.payload //TODO: consider multiple confirmations
            }
        }
        case 'socket/setRejection' : {
            return {
                ...state,
                rejections: action.payload //TODO: consider multiple rejections
            }
        }
        case 'socket/setAbortion' : {
            return {
                ...state,
                abortions: action.payload //TODO: consider multiple abortions
            }
        }
        case 'socket/setDuelUpdate' : {
            return {
                ...state,
                duelUpdates: action.payload //TODO: consider multiple duel updates
            }
        }
        case 'socket/clear' : {
            return initialState
        }
        default :
            return state
    }
}