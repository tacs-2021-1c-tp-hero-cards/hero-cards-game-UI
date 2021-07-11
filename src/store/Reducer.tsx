import { AnyAction, combineReducers, Reducer } from "redux";
import socketReducer from "./SocketReducer";
import userReducer from "./UserReducer";

const rootReducer: Reducer<any, AnyAction> = combineReducers({
    socket: socketReducer,
    user: userReducer
})

export default rootReducer