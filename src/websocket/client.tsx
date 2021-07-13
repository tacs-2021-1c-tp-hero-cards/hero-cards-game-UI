import { IMessage, Stomp } from "@stomp/stompjs";
import { getToken } from "../commons/Token";
import store from "../store/Store";


export function connect() {
    const token = getToken();

    let socket = new WebSocket(`/user/${token}`);
    const stompClient = Stomp.over(socket);
    
    stompClient.connect({}, function () {
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
        
        // Update client
        store.dispatch({
            type: 'socket/updateClient',
            payload: {
                client: stompClient
            }
        })
    })
}

export function disconnect() {
    let stompClient = store.getState().socket.client

    if (stompClient) {
        stompClient.disconnect();
        store.dispatch({ type: 'socket/clear' })
    }
}


function handleNotification(notification: IMessage) {
    store.dispatch({
        type: 'socket/pushNotification',
        payload: JSON.parse(notification.body).content
    })
}

function handleConfirmation(confirmation: IMessage) {
    store.dispatch({
        type: 'socket/setConfirmations',
        payload: JSON.parse(confirmation.body).content
    })
}

function handleRejection(rejection: IMessage) {
    store.dispatch({
        type: 'socket/setRejections',
        payload: JSON.parse(rejection.body).content
    })
}

function handleAbortion(abortion: IMessage) {
    store.dispatch({
        type: 'socket/setAbortions',
        payload: JSON.parse(abortion.body).content
    })
}

function handleDuelUpdate(duelUpdate: IMessage) {
    store.dispatch({
        type: 'socket/setDuelUpdate',
        payload: JSON.parse(duelUpdate.body).content
    })
}

