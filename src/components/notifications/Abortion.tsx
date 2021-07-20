import { Stack, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, 
    Button, Text } from "@chakra-ui/react"
import React from "react"
import { RedirectProps, withRedirect } from "../../commons/BehaviorAddOns"
import { updateState } from "../../store/hooks"

export type Abortion = {
    matchId: number,
    username: string
}


type AbortionPreview = Abortion & {
    index: number,
    fontSize?: string
}

export function AbortionPreview(props: AbortionPreview) { return withRedirect(props) (AbortionPreviewContent) }

type AbortionPreviewProps = AbortionPreview & RedirectProps

function AbortionPreviewContent({ matchId, username, index, redirect, fontSize }: AbortionPreviewProps) {
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
        updateState({ type: 'socket/removeAbortion', payload: index })
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
                    
            <Text fontWeight='bold' isTruncated>{username}</Text>
            <Text>has surrended</Text>

            <AlertDialog    isOpen={isOpen}
                            leastDestructiveRef={rejectRef}
                            onClose={onClose}>

                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        <Text fontSize='2xl'>Match cancelled</Text>
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        <Stack spacing='0.3rem'>
                            <Stack  direction='row' 
                                    spacing='3px'
                                    fontSize={fontSize ?? 'xl'}>
                                <Text fontWeight='bold' isTruncated>{username}</Text>
                                <Text width='16rem'>has surrended and you win</Text> 

                            </Stack>
                            <Text fontSize={fontSize ?? 'xl'}>¿What do you want to do?</Text>
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