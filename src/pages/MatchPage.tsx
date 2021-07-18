import React from 'react'
import { Alert, AlertIcon, Box, Center, CircularProgress, Stack, StackDivider, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { ConditionalRenderSupportProps, ToastProps, TokenProps, withRenderCondition, withToast, withTokenValidation } from '../commons/BehaviorAddOns'
import { MainHeader } from '../components/MainHeader'
import { ServerConnector } from '../BackendConnector'
import { useState } from 'react'
import { Match } from '../components/Match'
import { DeckPreview } from '../components/Deck'
import store from '../store/Store'

export default function MatchPage() { return( withRenderCondition({}) (withTokenValidation) (withToast) (MatchContent) )}

type ShowCardProps = TokenProps & ConditionalRenderSupportProps & ToastProps

export function MatchContent({ renderOnCondition, renderWithTokenValidation, toast }: ShowCardProps) {
    let { matchId }: any = useParams()

    const [ match, setMatch ] = useState<Match>()
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ searchingMatch, setSearchingMatch] = useState<boolean>(false)
    const [ shouldShowMatch, setShouldShowMatch ] = useState<boolean>(true)

    if (!match && !searchingMatch) {
        setSearchingMatch(true)

        ServerConnector.getMatch(
            matchId,
            (matchData) => {
                setMatch(matchData)
                validateUserAccess(matchData)
                setSearchingMatch(false)
                setIsLoading(false)
            },
            (error) => {
                setShouldShowMatch(false)
                setSearchingMatch(false)
                setIsLoading(false)
            }
        )
    }

    function validateUserAccess(matchData: Match) {
        const userId = store.getState().user.id

        const userAllowed = matchData.player.user.id === userId || matchData.opponent.user.id === userId

        console.log(`user ${userAllowed ? 'allowed' : 'not allowed'}`)

        setShouldShowMatch(userAllowed)
    }

    return renderWithTokenValidation(() => renderOnCondition(shouldShowMatch, content))

    function content() {
        return (
            <Box>
                <Stack spacing='1px'>
                    <MainHeader startAMatchButton />

                    <Stack direction='row' spacing='1px'>
                        <Stack  bg='gray.300'
                                borderRadius='7px'
                                padding='4'
                                boxSize='full'
                                spacing='4'
                                divider={<StackDivider borderColor='gray.500' />}>

                            { isLoading ? 
                                    <Stack spacing='2rem'>
                                        <Center fontSize='2xl'>Searching match data...</Center>
                                        <Center>
                                            <CircularProgress isIndeterminate color="green.300" />  
                                        </Center>
                                    </Stack> : 
                                
                                    renderMatch()
                            } 
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        )
    }

    function renderMatch() {

        switch (match?.status) {
            case 'PENDING':
                return renderPendingMatch()
            case 'IN_PROGRESS':
                return renderInProgressMatch()
            case 'FINALIZED':
                return renderFinalizedMatch()
            case 'CANCELLED':
                return renderCancelledMatch()
            default:
                return (
                    <Alert status="error">
                        <AlertIcon />
                        There was an error processing your request. Maybe the match you are looking for doesn't exists.
                    </Alert>
                )
        }
    }

    function renderPendingMatch() {
        return (
            <Stack spacing='2rem'>
                <Center fontSize='2xl'>Waiting for your oponent to accept the match...</Center>
                <Center>
                    <CircularProgress isIndeterminate color="blue.300" size='9rem' />  
                </Center>
                <Center fontSize='xl'>See match's details below</Center>

                <Stack spacing='1rem'>
                    <Center fontSize='xl'>Players</Center>
                    <Stack direction='row' spacing='4px' fontSize='2xl' alignSelf='center'>
                        <Text fontWeight='bold'>{match?.player.user.userName}</Text>
                        <Text> vs </Text>
                        <Text fontWeight='bold'>{match?.opponent.user.userName}</Text>
                    </Stack>

                    <Center fontSize='xl'>Battling with</Center>

                    <DeckPreview data={match?.deck!} width='70%' alignSelf='center' />
                </Stack>
            </Stack>
        )
    }

    function renderInProgressMatch() {
        return (
            <Stack>

            </Stack>
        )
    }

    function renderFinalizedMatch() {
        return (
            <Stack>

            </Stack>
        )
    }

    function renderCancelledMatch() {
        return (
            <Stack>

            </Stack>
        )
    }
}