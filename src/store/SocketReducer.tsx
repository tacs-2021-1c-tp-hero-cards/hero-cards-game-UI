import Collection from "../commons/Collections"
import { SocketData } from "./State"

const initialState: SocketData = {
    client: undefined,
    invites: [],
    confirmations: [],
    rejections: [],
    abortions: [],
    duelUpdates: []
}

export default function socketReducer(state = initialState, action: any): SocketData {
    switch(action.type) {

        // SOCKET CLIENT
        case 'socket/updateClient' : {
            return {
                ...state,
                client: action.payload
            }
        }


        // INVITES
        case 'socket/pushInvite' : {
            const previousInvites = Collection.wrap(state.invites)
            return {
                ...state,
                invites: previousInvites.add(action.payload).collection
            }
        }
        case 'socket/addInvites' : {
            const previousInvites = Collection.wrap(state.invites)
            return {
                ...state,
                invites: previousInvites.concatWith(action.payload).collection
            }
        }
        case 'socket/removeInvite' : {
            const previousInvites = Collection.wrap(state.invites)
            console.log(previousInvites)
            return {
                ...state,
                invites: previousInvites.remove(action.payload).collection
            }
        }


        //CONFIRMATIONS
        case 'socket/pushConfirmation' : {
            const previousConfirmations = Collection.wrap(state.confirmations)
            console.log(previousConfirmations)
            return {
                ...state,
                confirmations: previousConfirmations.add(action.payload).collection
            }
        }
        case 'socket/removeConfirmation' : {
            const previousConfirmations = Collection.wrap(state.confirmations)
            console.log(previousConfirmations)
            return {
                ...state,
                confirmations: previousConfirmations.remove(action.payload).collection
            }
        }


        //REJECTIONS
        case 'socket/pushRejection' : {
            const previousRejections = Collection.wrap(state.rejections)
            console.log(previousRejections)
            return {
                ...state,
                rejections: previousRejections.add(action.payload).collection
            }
        }
        case 'socket/removeRejection' : {
            const previousRejection = Collection.wrap(state.rejections)
            console.log(previousRejection)
            return {
                ...state,
                rejections: previousRejection.remove(action.payload).collection
            }
        }


        // ABORTIONS
        case 'socket/pushAbortion' : {
            const previousAbortions = Collection.wrap(state.abortions)
            console.log(previousAbortions)
            return {
                ...state,
                abortions: previousAbortions.add(action.payload).collection
            }
        }
        case 'socket/removeAbortion' : {
            const previousAbortions = Collection.wrap(state.abortions)
            console.log(previousAbortions)
            return {
                ...state,
                abortions: previousAbortions.remove(action.payload).collection
            }
        }


        // DUEL UPDATES
        case 'socket/pushDuelUpdate' : {
            const previousDuelUpdates = Collection.wrap(state.duelUpdates)
            console.log(previousDuelUpdates)
            return {
                ...state,
                duelUpdates: previousDuelUpdates.add(action.payload).collection
            }
        }
        case 'socket/removeDuelUpdate' : {
            const previousDuelUpdates = Collection.wrap(state.duelUpdates)
            console.log(previousDuelUpdates)
            return {
                ...state,
                duelUpdates: previousDuelUpdates.remove(action.payload).collection
            }
        }


        // OTHERS
        case 'socket/clear' : {
            return initialState
        }
        default :
            return state
    }
}