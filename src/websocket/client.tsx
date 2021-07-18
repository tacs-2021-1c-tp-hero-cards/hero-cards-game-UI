import { CompatClient, IMessage, Stomp } from "@stomp/stompjs";
import { getToken } from "../commons/Token";
import { updateState } from "../store/hooks";

let stompClient: CompatClient

export function connect() {
    const token = getToken();

    let socket = new WebSocket('ws://localhost:8080/user');

    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame: any) {

        console.log(`Connected: ${frame}`)

        // Notifications
        stompClient.subscribe(`/topic/user/${token}/notifications`, handleInvite)

        // Confirmations
        stompClient.subscribe(`/topic/user/${token}/confirmations`, handleConfirmation)
            
        // Rejections
        stompClient.subscribe(`/topic/user/${token}/rejections`, handleRejection)
            
        // Abortions
        stompClient.subscribe(`/topic/user/${token}/abortions`, handleAbortion)
            
        // Duel updates
        stompClient.subscribe(`/topic/user/${token}/nextDuel`, handleDuelUpdate) 
    })
}

export function disconnect() {
    if (stompClient) {
        stompClient.disconnect();
        updateState({ type: 'socket/clear' })
    }

    console.log('Disconnected')
}


function handleInvite(invite: IMessage) {
    console.log("new invite")
    const content = JSON.parse(invite.body)
    console.log(content)

    const newInvite = {
        matchId: content.matchId,
        username: content.user.userName
    }

    updateState({
        type: 'socket/pushInvite',
        payload: newInvite
    })
}

function handleConfirmation(confirmation: IMessage) {
    console.log("match confirmed")
    const content = JSON.parse(confirmation.body)
    console.log(content)

    const newConfirmation = {
        matchId: content.matchId,
        username: content.user.userName
    }

    updateState({
        type: 'socket/pushConfirmation',
        payload: newConfirmation
    })
}

function handleRejection(rejection: IMessage) {
    console.log("match rejected")
    const content = JSON.parse(rejection.body)
    console.log(content)

    const newRejection = {
        matchId: content.matchId,
        username: content.user.userName
    }
    
    updateState({
        type: 'socket/pushRejection',
        payload: newRejection
    })
}

function handleAbortion(abortion: IMessage) {
    console.log("match aborted")
    const content = JSON.parse(abortion.body)
    console.log(content)

    const newAbortion = {
        matchId: content.matchId,
        username: content.user.userName
    }
    
    updateState({
        type: 'socket/pushAbortion',
        payload: newAbortion
    })
}

function handleDuelUpdate(duelUpdate: IMessage) {
    console.log("duel updated")
    const content = JSON.parse(duelUpdate.body)
    console.log(content)

    //TODO: parse correctly
    const newUpdate = content
    
    updateState({
        type: 'socket/pushDuelUpdate',
        payload: newUpdate
    })
}

