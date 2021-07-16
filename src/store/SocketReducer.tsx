import { Collection } from "../commons/Collections"
import store from "./Store"

const initialState = {
    client: undefined,
    notifications: [],
    confirmations: [],
    rejections: [],
    abortions: [],
    duelUpdates: []
}

export default function socketReducer(state = initialState, action: any) {
    switch(action.type) {
        case 'socket/updateClient' : {
            return {
                ...state,
                client: action.payload
            }
        }
        case 'socket/pushNotification' : {
            const previousNotifications = Collection.wrap(state.notifications)
            console.log(previousNotifications)
            return {
                ...state,
                notifications: previousNotifications.add(action.payload).collection
            }
        }
        case 'socket/removeNotification' : {
            const previousNotifications = Collection.wrap(state.notifications)
            console.log(previousNotifications)
            return {
                ...state,
                notifications: previousNotifications.remove(action.payload).collection 
            }
        }
        case 'socket/setConfirmation' : {
            return {
                ...state,
                confrimations: action.payload //TODO: consider multiple confirmations
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