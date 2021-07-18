import { Invite } from '../components/notifications/Invite'
import { Confirmation } from '../components/notifications/Confirmation'
import { Rejection } from '../components/notifications/Rejection'
import { Abortion } from '../components/notifications/Abortion'
import { DuelUpdate } from '../components/notifications/DuelUpdate'

/**
 * Just for the record:
 * 
 * RootState = {
 *   socket: SocketData,
 *   user: UserData
 * }
 * 
 */

export type SocketData = {
    client: any,
    invites: Invite[],
    confirmations: Confirmation[],
    rejections: Rejection[],
    abortions: Abortion[],
    duelUpdates: DuelUpdate[]
}

export type UserData = {
    username?: string,
    id?: number,
    admin?: boolean,
    token?: string
}