import { UserData } from "./State"

const initialState: UserData = {
    username: undefined,
    id: undefined,
    admin: false,
    token: undefined,
    stats: undefined,
    matches: []
}

export default function userReducer(state = initialState, action: any): UserData {
    switch(action.type) {
        case 'user/updateUser' : {
            let user = action.payload
            
            return {
                ...state,
                username: user.userName,
                id: user.id,
                admin: user.admin,
                token: user.token
            }
        }
        case 'user/updateStats' : {
            let stats = action.payload
            
            return {
                ...state,
                stats: stats
            }
        }
        case 'user/updateMatches' : {
            let matches = action.payload
            
            return {
                ...state,
                matches: matches
            }
        }
        case 'user/clear' : {
            return initialState
        }
        default :
            return state
    }
}