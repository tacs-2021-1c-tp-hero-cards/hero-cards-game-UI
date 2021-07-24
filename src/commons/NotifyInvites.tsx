import { UserMatch } from "../components/matches/Match";
import { updateState } from "../store/hooks";


export default function notifyInvites(matches: UserMatch[]) {
    const pending = matches.filter(m => m.status == 'PENDING' && !m.owned)

    const invites = pending.map(match => 
        ({
            matchId: match.matchId,
            username: match.opponent
        })
    )

    updateState({
        type: 'socket/addInvites',
        payload: invites
    })
}