import { IMessage, Stomp } from "@stomp/stompjs";
import { getToken } from "../commons/Token";
import { useDispatch, useSelector } from "react-redux"

export function connect() {
    const dispatch = useDispatch()
    const token = getToken();

    let socket = new WebSocket('ws://localhost:8080/user');

    const stompClient = Stomp.over(socket);

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
        
        // Update client
        dispatch({
            type: 'socket/updateClient',
            payload: {
                client: stompClient
            }
        })
    })
}

export function disconnect() {
    const dispatch = useDispatch()
    let stompClient = useSelector((state: any) => state.socket.client)

    if (stompClient) {
        stompClient.disconnect();
        dispatch({ type: 'socket/clear' })
    }

    console.log('Disconnected')
}


function handleNotification(notification: IMessage) {
    const dispatch = useDispatch()

    console.log("new notification")
    console.log(notification.body)

    dispatch({
        type: 'socket/pushNotification',
        payload: JSON.parse(notification.body).content
    })
}

function handleConfirmation(confirmation: IMessage) {
    const dispatch = useDispatch()
    
    console.log("match confirmed")
    console.log(confirmation.body)

    dispatch({
        type: 'socket/setConfirmations',
        payload: JSON.parse(confirmation.body).content
    })
}

function handleRejection(rejection: IMessage) {
    const dispatch = useDispatch()
    
    console.log("match rejected")
    console.log(rejection.body)
    
    dispatch({
        type: 'socket/setRejections',
        payload: JSON.parse(rejection.body).content
    })
}

function handleAbortion(abortion: IMessage) {
    const dispatch = useDispatch()
    
    console.log("match aborted")
    console.log(abortion.body)
    
    dispatch({
        type: 'socket/setAbortions',
        payload: JSON.parse(abortion.body).content
    })
}

function handleDuelUpdate(duelUpdate: IMessage) {
    const dispatch = useDispatch()
    
    console.log("duel updated")
    console.log(duelUpdate.body)
    
    dispatch({
        type: 'socket/setDuelUpdate',
        payload: JSON.parse(duelUpdate.body).content
    })
}

