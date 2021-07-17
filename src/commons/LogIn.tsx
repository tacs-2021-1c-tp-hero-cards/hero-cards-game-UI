import { ServerConnector } from "../BackendConnector"
import { setToken } from "./Token"
import { User } from "../components/User"
import Collection from "./Collections"
import { connect } from "../websocket/client"
import { updateState } from "../store/hooks"



export function logIn(user: User, onSuccess: (user: User) => void, onFailure: () => void) {
    
    ServerConnector.logIn(user,
                         (data) => 
                            ServerConnector.getUsersByToken(
                                data.token,
                                (users) => {
                                    const activeUser = Collection.wrap(users).head()

                                    setToken(data.token)
                                    console.log(data.token + activeUser)
                                    updateState({ type: 'user/updateUser', payload: activeUser })

                                    console.log("dispatched")

                                    //Web socket connection
                                    connect()

                                    onSuccess(activeUser)
                                },
                                (_) => onFailure()
                            ),
                         (error) => onFailure()
                        )

}

