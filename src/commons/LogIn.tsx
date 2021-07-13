import { ServerConnector } from "../BackendConnector"
import { setToken } from "./Token"
import { User } from "../components/User"
import store from "../store/Store"
import { Collection } from "./Collections"
import { connect } from "../websocket/client"


export function logIn(user: User, onSuccess: () => void, onFailure: () => void) {
    ServerConnector.logIn(user,
                         (data) => 
                            ServerConnector.getUsersByToken(
                                data.token,
                                (users) => {
                                    const activeUser = Collection.wrap(users).head()

                                    console.log(activeUser)
                                    
                                    setToken(data.token)
                                    store.dispatch({ type: 'user/updateUser', payload: activeUser })

                                    //Web socket connection
                                    // connect() TODO: enable when right connection is defined

                                    onSuccess()
                                },
                                (_) => onFailure()
                            ),
                         (error) => onFailure())
}

