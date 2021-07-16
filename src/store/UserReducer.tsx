const initialState = {
    username: undefined,
    id: undefined,
    admin: undefined,
    token: undefined
}

export default function userReducer(state = initialState, action: any) {
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
        case 'user/clear' : {
            return initialState
        }
        default :
            return state
    }
}