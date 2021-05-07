import { ServerConnector } from "../BackendConnector";
import { logIn } from "./LogIn";
import { redirect } from "./Redirect";
import { UserProps } from "./User";


export function signUp(user: UserProps, from: any) {
    ServerConnector.signUp(user,
        (data) => logIn(user, from),
        (error) => redirect('/error', from))
}