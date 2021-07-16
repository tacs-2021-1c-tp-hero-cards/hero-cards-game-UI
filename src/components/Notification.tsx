import React from "react"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, 
        Stack, Text } from "@chakra-ui/react"
import store from "../store/Store"
import { RedirectProps, ToastProps, withRedirect, withToast } from "../commons/BehaviorAddOns"
import { customToast } from "../commons/Toast"

export type Notification = {
    matchId: number,
    username: string,
    index: number,
}

export function NotificationPreview(props: Notification) { return withRedirect(props) (withToast) (NotificationPreviewContent) }

type NotificationPreviewProps = Notification & RedirectProps & ToastProps

function NotificationPreviewContent({ matchId, username, index, redirect, toast }: NotificationPreviewProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const rejectRef = React.useRef<HTMLButtonElement>(null)

    function accept() {
        store.dispatch({ type: 'socket/removeNotification', payload: index })
        // confirm match on server and redirect to match
        /*ServerConnector.confirmMatch(
            matchId, 
            () => redirect(`/matches/${matchId}`), 
            () => toast(customToast('Error', 'error', 'There seems to be a problem with the match')) 
        )*/
        toast(customToast('Accepted', 'success', 'The match has been accepted'))
        onClose()
    }

    function reject() {
        store.dispatch({ type: 'socket/removeNotification', payload: index })
        //reject match on server
        toast(customToast('Rejected', 'warning', 'The match has been rejected'))
        onClose()
    }

    return (
        <Stack  key={index} 
                direction='row' 
                spacing='3px' 
                bgColor='gray.300'
                padding='0.3rem'
                borderRadius='0.25rem'
                cursor='pointer'
                onClick={() => setIsOpen(true)}>
                    
            <Text fontWeight='bold' isTruncated>{username}</Text>
            <Text width='6rem'>invited you</Text>

            <AlertDialog    isOpen={isOpen}
                            leastDestructiveRef={rejectRef}
                            onClose={onClose}>
                            <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                    You have been invited to a match
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    <Stack spacing='0.3rem'>
                                        <Stack  direction='row' 
                                                spacing='3px'>
                                            <Text fontWeight='bold' isTruncated>{username}</Text>
                                            <Text width='16rem'>defied you in a match</Text> 
                                        </Stack>
                                        <Text>¿Do you accept the challenge?</Text>
                                    </Stack>
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                <Button ref={rejectRef} onClick={reject}>
                                    Reject
                                </Button>
                                <Button colorScheme="green" onClick={accept} ml={3}>
                                    Accept
                                </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
        </Stack>
    )
}