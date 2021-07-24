import { Stack, StackDivider, Text, toast } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { ServerConnector } from "../../BackendConnector";
import { RedirectProps, ToastProps, withRedirect, withToast } from "../../commons/BehaviorAddOns";
import Collection from "../../commons/Collections";
import { customToast } from "../../commons/Toast";
import { updateState } from "../../store/hooks";
import { RootState } from "../../store/Store";
import { DeckHistoricData } from "../decks/Deck";
import { Player } from "../players/Player"
import { HistoricDuel } from "./Duel"

export type MatchCreation = {
    userId: number,
    userType: string,
    deckId: number
}

export type Match = {
    id: number,
    player: Player,
    opponent: Player,
    deck: DeckHistoricData,
    status: string,
    duelHistoryList: HistoricDuel[]
}

export type UserMatch = {
    matchId: number,
    status: string,
    opponent: string,
    owned: boolean
}

type Props = {
    match: UserMatch
}

export function MatchPreview(props: Props) {return withRedirect(props) (withToast) (MatchPreviewContent)}

type InnerProps = RedirectProps & ToastProps & Props

function MatchPreviewContent({ match, redirect, toast }: InnerProps) {

    const invites = useSelector((state: RootState) => state.socket.invites)

    function handleClick() {

        if(match.status == 'PENDING' && !match.owned) {
            const invite = Collection.wrap(invites).findIndex( i => i.matchId == match.matchId)

            updateState({ 
                type: 'socket/removeInvite', 
                payload: invite 
            })

            ServerConnector.acceptMatch(
                match.matchId, 
                () => redirect(`/matches/${match.matchId}`), 
                () => toast(customToast('Error', 'error', 'There seems to be a problem with the match')) 
            )
        } else {
            redirect(`/matches/${match.matchId}`)
        }
    }

    return (
        <Stack  backgroundColor='gray.300' 
                fontSize='xl'
                padding='0.5rem'
                border='2px'
                borderColor='gray.600'
                borderRadius='0.5rem'
                cursor='pointer'
                onClick={handleClick}>

            <Stack  backgroundColor={getColor(match.status)} 
                    padding='1rem' 
                    border='2px'
                    borderColor='gray.500'
                    borderRadius='0.3rem'>

                <Stack direction='row-reverse' spacing='1rem' divider={<StackDivider borderColor='gray.800'/>}>
                    <Text fontStyle='italic' fontWeight='bold' width='12rem'>{humanizeStatus(match.status)}</Text>
                    <Stack direction='row' spacing='1rem' divider={<StackDivider borderColor='gray.800'/>} boxSize='full'>
                        <Text fontWeight='bold'>{match.matchId}</Text>
                        <Stack direction='row' spacing='4px' maxWidth='20rem'>
                            <Text>Against</Text>
                            <Text isTruncated>{match.opponent}</Text>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

function getColor(status: string) {
    switch (status) {
        case 'PENDING':
            return 'blue.400'
    
        case 'IN_PROGRESS':
            return 'yellow.400'
    
        case 'CANCELLED':
            return 'red.500'
    
        case 'FINALIZED':
            return 'silver'
    
        default:
            return 'gray.400'
    }
}

function humanizeStatus(status: string) {
    switch (status) {
        case 'PENDING':
            return 'Pending'
    
        case 'IN_PROGRESS':
            return 'In progress'
    
        case 'CANCELLED':
            return 'Cancelled'
    
        case 'FINALIZED':
            return 'Finalized'
    
        default:
            return 'Missing status'
    }
}