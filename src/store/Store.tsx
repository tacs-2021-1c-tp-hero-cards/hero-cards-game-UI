import { createStore, Store } from "redux"
import rootReducer from "./Reducer"
import storage from "redux-persist/lib/storage"
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1"
import { persistReducer } from 'redux-persist'


export const config = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel1
}

const persisted = persistReducer(config, rootReducer)

const store: Store = createStore(persisted)

export default store