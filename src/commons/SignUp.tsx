import { ServerConnector } from "../BackendConnector";
import { logIn } from "./LogIn";
import { User } from "../components/players/User";


export function signUp(user: User, onSuccess: () => void, onFailure: () => void) {
    ServerConnector.signUp(user,
        (_) => logIn(user, onSuccess, onFailure),
        (_) => onFailure())
}