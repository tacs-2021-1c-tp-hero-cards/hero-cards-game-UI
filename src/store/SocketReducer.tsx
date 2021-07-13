import { Collection } from "../commons/Collections"
import store from "./Store"

const initialState = {
    client: undefined,
    notifications: Collection.empty(),
    confirmations: Collection.empty(),
    rejections: Collection.empty(),
    abortions: Collection.empty(),
    duelUpdates: Collection.empty()
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
            const previousNotifications: Collection<any> = Collection.consume(state.notifications)
            console.log(previousNotifications)
            return {
                ...state,
                notifications: previousNotifications.add(action.payload) 
            }
        }
        case 'socket/removeNotification' : {
            const previousNotifications: Collection<any> = Collection.consume(state.notifications)
            console.log(previousNotifications)
            return {
                ...state,
                notifications: previousNotifications.remove(action.payload) 
            }
        }
        case 'socket/setConfirmation' : {
            return {
                ...state,
                confrimations: Collection.from(action.payload) //TODO: consider multiple confirmations
            }
        }
        case 'socket/setRejection' : {
            return {
                ...state,
                rejections: Collection.from(action.payload) //TODO: consider multiple rejections
            }
        }
        case 'socket/setAbortion' : {
            return {
                ...state,
                abortions: Collection.from(action.payload) //TODO: consider multiple abortions
            }
        }
        case 'socket/setDuelUpdate' : {
            return {
                ...state,
                duelUpdates: Collection.from(action.payload) //TODO: consider multiple duel updates
            }
        }
        case 'socket/clear' : {
            return initialState
        }
        default :
            return state
    }
}