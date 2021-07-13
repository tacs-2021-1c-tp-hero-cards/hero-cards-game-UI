import { Collection } from "../commons/Collections"

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
            return {
                ...state,
                notifications: Collection.from(action.payload) //TODO: consider multiple notifications
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
        default :
            return state
    }
}