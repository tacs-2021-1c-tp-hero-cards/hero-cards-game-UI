import { Stack, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, 
        Button, Text } from "@chakra-ui/react"
import React from "react"
import { withRedirect, RedirectProps } from "../../commons/BehaviorAddOns"
import { updateState } from "../../store/hooks"

export type Rejection = {
    matchId: number,
    username: string
}


type RejectionPreview = Rejection & {
    index: number,
    fontSize?: string
}

export function RejectionPreview(props: RejectionPreview) { return withRedirect(props) (RejectionPreviewContent) }

type RejectionPreviewProps = RejectionPreview & RedirectProps

function RejectionPreviewContent({ matchId, username, index, redirect, fontSize }: RejectionPreviewProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const rejectRef = React.useRef<HTMLButtonElement>(null)

    function goToMatch() {
        removeNotification()
        redirect(`/matches/${matchId}`)
        onClose()
    }

    function ignore() {
        removeNotification()
        onClose()
    }

    function removeNotification() {
        updateState({ type: 'socket/removeRejection', payload: index })
    }

    return (
        <Stack  key={index} 
                spacing='4px' 
                bgColor='gray.300'
                padding='0.3rem'
                borderRadius='0.25rem'
                cursor='pointer'
                fontSize={fontSize ?? 'xl'}
                onClick={() => setIsOpen(true)}>
                    
            <Stack padding='0.2rem' paddingLeft='0.5rem' backgroundColor='red.500' spacing='0.2rem' borderRadius='0.3rem' border='1px' borderColor='red.600'>
                <Text fontWeight='bold' isTruncated>{username}</Text>
                <Text>has rejected you</Text>
            </Stack>

            <AlertDialog    isOpen={isOpen}
                            leastDestructiveRef={rejectRef}
                            onClose={onClose}>

                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        <Text fontSize='2xl'>Match rejection</Text>
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        <Stack spacing='0.3rem'>
                            <Stack  direction='row' 
                                    spacing='3px'
                                    fontSize={fontSize ?? 'xl'}>
                                <Text fontWeight='bold' isTruncated>{username}</Text>
                                <Text width='16rem'>has rejected your invite</Text> 

                            </Stack>
                            <Text fontSize={fontSize ?? 'xl'}>??What do you want to do?</Text>
                        </Stack>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={rejectRef} onClick={ignore} fontSize={fontSize ?? 'xl'} width='10rem'>
                        Ignore
                    </Button>
                    <Button colorScheme="green" onClick={goToMatch} ml={3} fontSize={fontSize ?? 'xl'} width='10rem'>
                        Go to match
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Stack>
    )
}