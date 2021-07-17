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
        stompClient.subscribe(`/topic/user/${token}/notifications`, handleNotification)

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


function handleNotification(notification: IMessage) {
    console.log("new notification")
    const content = JSON.parse(notification.body)
    console.log(content)

    const newNotification = {
        matchId: content.matchId,
        username: content.user.userName
    }

    updateState({
        type: 'socket/pushNotification',
        payload: newNotification
    })
}

function handleConfirmation(confirmation: IMessage) {
    console.log("match confirmed")
    const content = JSON.parse(confirmation.body)

    //TODO: parse correctly
    const newConfirmation = content

    updateState({
        type: 'socket/setConfirmations',
        payload: newConfirmation
    })
}

function handleRejection(rejection: IMessage) {
    console.log("match rejected")
    const content = JSON.parse(rejection.body)

    //TODO: parse correctly
    const newRejection = content
    
    updateState({
        type: 'socket/setRejections',
        payload: newRejection
    })
}

function handleAbortion(abortion: IMessage) {
    console.log("match aborted")
    const content = JSON.parse(abortion.body)

    //TODO: parse correctly
    const newAbortion = content
    
    updateState({
        type: 'socket/setAbortions',
        payload: newAbortion
    })
}

function handleDuelUpdate(duelUpdate: IMessage) {
    console.log("duel updated")
    const content = JSON.parse(duelUpdate.body)

    //TODO: parse correctly
    const newUpdate = content
    
    updateState({
        type: 'socket/setDuelUpdate',
        payload: newUpdate
    })
}

