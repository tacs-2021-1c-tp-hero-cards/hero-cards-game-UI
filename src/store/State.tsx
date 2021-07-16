import Collection from '../commons/Collections'
import { Notification } from '../components/Notification'

export type State = {
    socket: SocketData,
    user: UserData
}

export type SocketData = {
    client: any,
    notifications: Collection<Notification>,
    confirmations: Collection<any>,
    rejections: Collection<any>,
    abortions: Collection<any>,
    duelUpdates: Collection<any>
}

export type UserData = {
    username?: string,
    id?: number,
    admin?: boolean,
    token?: string
}