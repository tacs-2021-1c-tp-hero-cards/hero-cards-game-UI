import React from "react"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, 
        Stack, Text } from "@chakra-ui/react"
import { RedirectProps, ToastProps, withRedirect, withToast } from "../../commons/BehaviorAddOns"
import { customToast } from "../../commons/Toast"
import { updateState } from "../../store/hooks"
import { ServerConnector } from "../../BackendConnector"

export type Invite = {
    matchId: number,
    username: string
}

type InvitePreview = Invite & {
    index: number,
    fontSize?: string
}

export function InvitePreview(props: InvitePreview) { return withRedirect(props) (withToast) (InvitePreviewContent) }

type InvitePreviewProps = InvitePreview & RedirectProps & ToastProps

function InvitePreviewContent({ matchId, username, index, redirect, toast, fontSize }: InvitePreviewProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const rejectRef = React.useRef<HTMLButtonElement>(null)

    function accept() {
        removeInvite()

        ServerConnector.acceptMatch(
            matchId, 
            () => redirect(`/matches/${matchId}`), 
            () => toast(customToast('Error', 'error', 'There seems to be a problem with the match')) 
        )
        onClose()
    }

    function reject() {
        removeInvite()
        
        ServerConnector.rejectMatch(
            matchId,
            () => toast(customToast('Rejected', 'warning', `The match with ${username} has been rejected`)),
            () => toast(customToast('Error', 'error', 'There seems to be a problem with the match'))
        )
        onClose()
    }

    function removeInvite() {
        updateState({ type: 'socket/removeInvite', payload: index })
    }

    return (
        <Stack  key={index} 
                direction='row' 
                spacing='3px' 
                bgColor='gray.300'
                padding='0.3rem'
                borderRadius='0.25rem'
                cursor='pointer'
                fontSize={fontSize ?? 'xl'}
                onClick={() => setIsOpen(true)}>
                    
            <Text fontWeight='bold' isTruncated>{username}</Text>
            <Text width='6rem'>invited you</Text>

            <AlertDialog    isOpen={isOpen}
                            leastDestructiveRef={rejectRef}
                            onClose={onClose}>

                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        <Text fontSize='2xl'>You have been invited to a match</Text>
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        <Stack spacing='0.3rem'>
                            <Stack  direction='row' 
                                    spacing='3px'
                                    fontSize={fontSize ?? 'xl'}>
                                <Text fontWeight='bold' isTruncated>{username}</Text>
                                <Text width='16rem'>defied you in a match</Text> 
                            </Stack>
                            <Text fontSize={fontSize ?? 'xl'}>¿Do you accept the challenge?</Text>
                        </Stack>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={rejectRef} onClick={reject} fontSize={fontSize ?? 'xl'} width='10rem'>
                        Reject
                    </Button>
                    <Button colorScheme="green" onClick={accept} ml={3} fontSize={fontSize ?? 'xl'} width='10rem'>
                        Accept
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Stack>
    )
}