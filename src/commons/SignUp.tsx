import { ServerConnector } from "../BackendConnector";
import { logIn } from "./LogIn";
import { User } from "../components/User";


export function signUp(user: User, onSuccess: () => void, onFailure: () => void) {
    ServerConnector.signUp(user,
        (data) => logIn(user, onSuccess, onFailure),
        (error) => onFailure())
}