const initialState = {
    username: undefined,
    userId: undefined
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
        case 'user/deleteUser' : {
            return {}
        }
        default :
            return state
    }
}