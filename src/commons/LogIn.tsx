import { ServerConnector } from "../BackendConnector"
import { setToken } from "./Token"
import { User } from "../components/players/User"
import Collection from "./Collections"
import { connect } from "../websocket/client"
import { updateState } from "../store/hooks"
import getStats from "./GetStats"
import getUserMatches from './GetUserMatches'
import notifyInvites from './NotifyInvites'



export function logIn(user: User, onSuccess: (user: User) => void, onFailure: () => void) {
    
    ServerConnector.logIn(user,
                         (data) => 
                            ServerConnector.getUsersByToken(
                                data.token,
                                (users) => {
                                    const activeUser = Collection.wrap(users).head()

                                    setToken(data.token)
                                    updateState({ type: 'user/updateUser', payload: activeUser })

                                    //Web socket connection
                                    connect()

                                    getStats(activeUser.id, onFailure)
                                    getUserMatches(activeUser.id, notifyInvites, onFailure)

                                    onSuccess(activeUser)
                                },
                                (_) => onFailure()
                            ),
                         (error) => onFailure()
                        )

}

