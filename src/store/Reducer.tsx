import { AnyAction, combineReducers, Reducer } from "redux";
import socketReducer from "./SocketReducer";
import { State } from "./State";
import userReducer from "./UserReducer";

const rootReducer: Reducer<State, AnyAction> = combineReducers({
    socket: socketReducer,
    user: userReducer
})

export default rootReducer