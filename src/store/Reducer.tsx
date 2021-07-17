import { AnyAction, combineReducers, Reducer } from "redux";
import socketReducer from "./SocketReducer";
import { RootState } from "./Store";
import userReducer from "./UserReducer";

const rootReducer: Reducer<RootState, AnyAction> = combineReducers({
    socket: socketReducer,
    user: userReducer
})

export default rootReducer