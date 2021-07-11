import { createStore, Store } from "redux";
import rootReducer from "./Reducer"

const store: Store = createStore(rootReducer)

export default store