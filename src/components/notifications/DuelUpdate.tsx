import { Stack, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, 
        Button, Text } from "@chakra-ui/react"
import React from "react"
import { withRedirect, RedirectProps } from "../../commons/BehaviorAddOns"
import { updateState } from "../../store/hooks"
import { HistoricPlayer } from "../players/Player"

export type DuelUpdate = {
    matchId: number,
    player: HistoricPlayer,
    opponent: HistoricPlayer,
    duelType: string,
    duelResult: string
}


type DuelUpdatePreview = {
    matchId: number,
    index: number,
    fontSize?: string
}

export function DuelUpdatePreview(props: DuelUpdatePreview) { return withRedirect(props) (DuelUpdatePreviewContent) }

type DuelUpdatePreviewProps = DuelUpdatePreview & RedirectProps

function DuelUpdatePreviewContent({ matchId, index, redirect, fontSize }: DuelUpdatePreviewProps) {
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
        updateState({ type: 'socket/removeDuelUpdate', payload: index })
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

            <Stack direction='row' spacing='4px'>
                <Text>Match</Text>
                <Text fontWeight='bold' isTruncated>{matchId}</Text>
            </Stack>
            <Text>has updated</Text>

            <AlertDialog    isOpen={isOpen}
                            leastDestructiveRef={rejectRef}
                            onClose={onClose}>

                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        <Text fontSize='2xl'>Match update</Text>
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        <Stack spacing='0.3rem'>
                            <Stack  direction='row' 
                                    spacing='3px'
                                    fontSize={fontSize ?? 'xl'}>
                                <Text width='16rem'>Your opponent has played a turn on match</Text> 
                                <Text fontWeight='bold' isTruncated>{matchId}</Text>
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