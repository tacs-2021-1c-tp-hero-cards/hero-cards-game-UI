import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AnyAction } from "redux";
import store, { RootState } from "./Store"

export const updateState = (action: AnyAction) => store.dispatch(action);
export const useGetState: TypedUseSelectorHook<RootState> = useSelector;