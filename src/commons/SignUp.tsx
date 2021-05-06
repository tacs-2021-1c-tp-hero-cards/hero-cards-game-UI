import { ServerConnector } from "../BackendConnector";
import { logIn } from "./LogIn";
import { redirect } from "./Redirect";
import { User } from "./User";


export function signUp(user: User, from: any) {
    ServerConnector.signUp(user,
        (data) => logIn(user, from),
        (error) => redirect('/error', from))
}