import Collection from '../commons/Collections'
import { Notification } from '../components/Notification'

export type State = {
    socket: SocketData,
    user: UserData
}

export type SocketData = {
    client: any,
    notifications: Notification[],
    confirmations: any[],
    rejections: any[],
    abortions: any[],
    duelUpdates: any[]
}

export type UserData = {
    username?: string,
    id?: number,
    admin?: boolean,
    token?: string
}