const initialState = {}

export default function socketReducer(state = initialState, action: any) {
    switch(action.type) {
        case 'socket/updateSocket' : {
            return {
                ...state,
                socket: action.payload
            }
        }
        default :
            return state
    }
}