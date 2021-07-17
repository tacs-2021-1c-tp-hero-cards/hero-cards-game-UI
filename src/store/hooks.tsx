import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import store, { AppDispatch, RootState } from "./Store"

export const updateState = (action: AnyAction) => store.dispatch(action);
export const useGetState: TypedUseSelectorHook<RootState> = useSelector;