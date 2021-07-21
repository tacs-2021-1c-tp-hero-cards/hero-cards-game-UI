import React from 'react'
import { Alert, AlertIcon, Box, Button, Center, CircularProgress, Stack, StackDivider, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { ConditionalRenderSupportProps, ToastProps, TokenProps, withRenderCondition, withToast, withTokenValidation } from '../commons/BehaviorAddOns'
import { MainHeader } from '../components/MainHeader'
import { ServerConnector } from '../BackendConnector'
import { useState } from 'react'
import { Match } from '../components/matches/Match'
import { DeckPreview } from '../components/decks/Deck'
import { shallowEqual } from 'react-redux'
import { updateState, useGetState } from '../store/hooks'
import Collection from '../commons/Collections'
import { Card, CardBackwards } from '../components/cards/Card'
import { CombatIcon, HeightIcon, IntelligenceIcon, PowerIcon, SpeedIcon, StrengthIcon, SurrenderIcon, WeightIcon } from '../components/miscellaneous/icons'
import { customToast } from '../commons/Toast'
import { HistoricDuel } from '../components/matches/Duel'

export default function MatchPage() { return( withRenderCondition({}) (withTokenValidation) (withToast) (MatchContent) )}

type ShowCardProps = TokenProps & ConditionalRenderSupportProps & ToastProps

export function MatchContent({ renderOnCondition, renderWithTokenValidation, toast }: ShowCardProps) {
    let { matchId }: any = useParams()

    const [ match, setMatch ] = useState<Match>()
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ searchingMatch, setSearchingMatch] = useState<boolean>(false)
    const [ shouldShowMatch, setShouldShowMatch ] = useState<boolean>(true)
    const [ error, setError ] = useState<boolean>(false)

    const confirmations = useGetState(state => state.socket.confirmations, shallowEqual)
    const rejections = useGetState(state => state.socket.rejections, shallowEqual)
    const abortions = useGetState(state => state.socket.abortions, shallowEqual)
    const duelUpdates = useGetState(state => state.socket.duelUpdates, shallowEqual)

    const user = useGetState(state => state.user)

    let confirmation = Collection.wrap(confirmations).findIndex(c => c.matchId == matchId)
    let rejection = Collection.wrap(rejections).findIndex(r => r.matchId == matchId)
    let abortion = Collection.wrap(abortions).findIndex(a => a.matchId == matchId)
    let duelUpdate = Collection.wrap(duelUpdates).findIndex(u => u.matchId == matchId)

    const matchUpdate = Collection.from(confirmation, rejection, abortion, duelUpdate).any(n => n != undefined)

    if ((!match || matchUpdate) && !searchingMatch && !error) {
        setSearchingMatch(true)

        ServerConnector.getMatch(
            matchId,
            (matchData) => {
                setMatch(matchData)
                validateUserAccess(matchData)
                setSearchingMatch(false)
                setIsLoading(false)
                setError(false)
            },
            (error) => {
                setShouldShowMatch(false)
                setSearchingMatch(false)
                setIsLoading(false)
                setError(true)
            }
        )

        if(confirmation != undefined) {
            updateState({ type: 'socket/removeConfirmation', payload: confirmation})
        }
        if(rejection != undefined) {
            updateState({ type: 'socket/removeRejection', payload: rejection})
        }
        if(abortion != undefined) {
            updateState({ type: 'socket/removeAbortion', payload: abortion})
        }
        if(duelUpdate != undefined) {
            updateState({ type: 'socket/removeDuelUpdate', payload: duelUpdate})
        }
    }

    function validateUserAccess(matchData: Match) {
        const userId = user.id

        const userAllowed = matchData.player.user.id === userId || matchData.opponent.user.id === userId

        console.log(`user ${userAllowed ? 'allowed' : 'not allowed'}`)

        setShouldShowMatch(userAllowed)
    }

    return renderWithTokenValidation(() => renderOnCondition(shouldShowMatch, content))

    function content() {
        return (
            <Box>
                <Stack spacing='1px'>
                    <MainHeader />

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
                        There was an error processing this match. 
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

        const holdsTurn = match?.player.user.id === user.id

        return holdsTurn ? playDuel() : awaitTurn()
    }

    function chooseDuelType(attribute: string) {
        ServerConnector.nextDuel(
            matchId,
            attribute, 
            setMatch,
            (error) => toast(customToast('Error', 'error', 'There was a problem with the match'))
        )
    }

    function surrender() {
        ServerConnector.abortMatch(
            matchId,
            setMatch,
            (error) => toast(customToast('Error', 'error', 'There was a problem with the match'))
        )
    }

    function playDuel() {

        const nextCard = Collection.wrap(match!.player.availableCards).head()
        const prizeCards = Collection.wrap(match!.player.prizeCards)
        const lastPrizeCard = prizeCards.head()
        const oponent = match?.opponent.user.userName

        return (
            <Stack spacing='2rem' fontSize='xl' paddingBottom='10rem'>
                <Center fontSize='3xl' fontWeight='bold'>It's your turn!</Center>
                <Center fontSize='2xl'>This duel is between</Center>

                <Stack direction='row' spacing='10rem' paddingTop='3rem' alignSelf='center'>

                    <Stack spacing='2rem' paddingLeft='3rem' paddingRight='3rem' paddingTop='1rem' paddingBottom='1rem' 
                            border='2px' borderRadius='1rem' borderColor='gray.400' backgroundColor='gray.200'>
                        <Card attributes={nextCard}/>
                        <Center>Your card for this turn</Center>
                    </Stack>

                    <Center fontWeight='bold' fontSize='6xl'>VS</Center>

                    <Stack spacing='2rem' paddingLeft='3rem' paddingRight='3rem' paddingTop='1rem' paddingBottom='1rem' 
                            border='2px' borderRadius='1rem' borderColor='gray.400' backgroundColor='gray.200'>
                        <Center><CardBackwards /></Center>
                        <Center>{oponent}'s card for this turn</Center>
                    </Stack>
                </Stack>

                <Center fontSize='2xl'>Pick an attribute to fight with</Center>

                <Stack direction='row' spacing='12rem' padding='3rem' paddingLeft='10rem' paddingRight='10rem' alignSelf='center' border='2px' borderRadius='1rem' 
                       borderColor='gray.600' backgroundColor='blue.500'>

                    <Stack spacing='1rem'>
                        <Button size='lg' 
                                width='15rem' 
                                fontSize='xl'
                                variant='solid'
                                leftIcon={<HeightIcon />}
                                onClick={() => chooseDuelType('HEIGHT')}>
                            Height
                        </Button>
                        <Button size='lg' 
                                width='15rem' 
                                fontSize='xl'
                                variant='solid'
                                leftIcon={<WeightIcon />}
                                onClick={() => chooseDuelType('WEIGHT')}>
                            Weight
                        </Button>
                        <Button size='lg' 
                                width='15rem' 
                                fontSize='xl'
                                variant='solid'
                                leftIcon={<IntelligenceIcon />}
                                onClick={() => chooseDuelType('INTELLIGENCE')}>
                            Intelligence
                        </Button>
                        <Button size='lg' 
                                width='15rem' 
                                fontSize='xl'
                                variant='solid'
                                leftIcon={<SpeedIcon />}
                                onClick={() => chooseDuelType('SPEED')}>
                            Speed
                        </Button>
                    </Stack>

                    <Stack spacing='1rem'>
                        <Button size='lg' 
                                width='15rem' 
                                fontSize='xl'
                                variant='solid'
                                leftIcon={<PowerIcon />}
                                onClick={() => chooseDuelType('POWER')}>
                            Power
                        </Button>
                        <Button size='lg' 
                                width='15rem' 
                                fontSize='xl'
                                variant='solid'
                                leftIcon={<CombatIcon />}
                                onClick={() => chooseDuelType('COMBAT')}>
                            Combat
                        </Button>
                        <Button size='lg' 
                                width='15rem' 
                                fontSize='xl'
                                variant='solid'
                                leftIcon={<StrengthIcon />}
                                onClick={() => chooseDuelType('STRENGTH')}>
                            Strenght
                        </Button>
                        <Button size='lg' 
                                width='15rem' 
                                fontSize='xl'
                                variant='solid'
                                colorScheme='red'
                                leftIcon={<SurrenderIcon />}
                                onClick={() => surrender()}>
                            Surrender
                        </Button>
                    </Stack>
                </Stack>

                <Stack direction='row' alignSelf='center' spacing='4rem' divider={<StackDivider borderColor='gray.400' />}>
                    {
                        lastPrizeCard ?
                            <Stack paddingRight='2rem'>
                                <Center>Last won card</Center>
                                <Card attributes={lastPrizeCard}/>
                            </Stack> : 
                            <Stack paddingRight='2rem'>
                                <Center>No cards won yet</Center>
                            </Stack>
                    }

                    <Stack>
                        <Stack direction='row' spacing='4px'>
                            <Center fontWeight='bold'>Duels played:</Center>
                            <Center>{match?.duelHistoryList.length}</Center>
                        </Stack>
                        <Stack direction='row' spacing='4px'>
                            <Center fontWeight='bold'>Cards won so far:</Center>
                            <Center>{prizeCards.length}</Center>
                        </Stack>
                    </Stack>
                    
                </Stack>
            </Stack>
        )
    }

    function awaitTurn() {

        const nextCard = Collection.wrap(match!.opponent.availableCards).head()
        const prizeCards = Collection.wrap(match!.opponent.prizeCards)
        const lastPrizeCard = prizeCards.head()
        const oponent = match?.player.user.userName
        
        return (
            <Stack spacing='2rem' fontSize='xl' paddingBottom='10rem'>
                <Center fontSize='3xl' fontWeight='bold'>It's your oponent's turn!</Center>
                <Center fontSize='2xl'>This duel is between</Center>

                <Stack direction='row' spacing='10rem' paddingTop='3rem' alignSelf='center'>

                    <Stack spacing='2rem' paddingLeft='3rem' paddingRight='3rem' paddingTop='1rem' paddingBottom='1rem' 
                            border='2px' borderRadius='1rem' borderColor='gray.400' backgroundColor='gray.200'>
                        <Card attributes={nextCard}/>
                        <Center>Your card for this turn</Center>
                    </Stack>

                    <Stack alignSelf='center'>
                        <Center fontWeight='bold' fontSize='6xl'>VS</Center>

                        <Center fontSize='2xl'>Waiting for {oponent}...</Center>
                        <Center>
                            <CircularProgress isIndeterminate color="teal.400" />  
                        </Center>
                    </Stack>

                    <Stack spacing='2rem' paddingLeft='3rem' paddingRight='3rem' paddingTop='1rem' paddingBottom='1rem' 
                            border='2px' borderRadius='1rem' borderColor='gray.400' backgroundColor='gray.200'>
                        <Center><CardBackwards /></Center>
                        <Center>{oponent}'s card for this turn</Center>
                    </Stack>
                </Stack>

                <Center fontSize='2xl' padding ='1rem'>Results so far</Center>

                <Stack direction='row' alignSelf='center' spacing='4rem' divider={<StackDivider borderColor='gray.400' />}>
                    {
                        lastPrizeCard ?
                            <Stack paddingRight='2rem'>
                                <Center>Last won card</Center>
                                <Card attributes={lastPrizeCard}/>
                            </Stack> : 
                            <Stack paddingRight='2rem'>
                                <Center>No cards won yet</Center>
                            </Stack>
                    }

                    <Stack>
                        <Stack direction='row' spacing='4px'>
                            <Center fontWeight='bold'>Duels played:</Center>
                            <Center>{match!.duelHistoryList.length}</Center>
                        </Stack>
                        <Stack direction='row' spacing='4px'>
                            <Center fontWeight='bold'>Cards won so far:</Center>
                            <Center>{prizeCards.length}</Center>
                        </Stack>
                    </Stack>
                    
                </Stack>

            </Stack>
        )
    }

    function renderFinalizedMatch() {

        const player = match?.player
        const opponent = match?.opponent

        const playerWon = player!.prizeCards.length > opponent!.prizeCards.length
        const tie = player!.prizeCards.length == opponent!.prizeCards.length

        return (
            <Stack spacing='2rem' fontSize='xl' paddingBottom='10rem'>
                <Center fontSize='3xl' fontWeight='bold'>Finalized match</Center>
                <Center fontSize='2xl'>Duel results</Center>

                <Stack direction='row' spacing='10rem' paddingTop='2rem' alignSelf='center'>
                    <Stack spacing='2rem' paddingLeft='3rem' paddingRight='3rem' paddingTop='1rem' paddingBottom='1rem' 
                            border='2px' borderRadius='1rem' borderColor='gray.500' width='20rem'
                            backgroundColor={playerWon ? 'green.400' : tie ? 'yellow.400' : 'red.600'}>
                        <Center fontWeight='bold'>{player?.user.userName}</Center>

                        <Stack direction='row' spacing='4px' alignSelf='center'>
                            <Text>Cards won:</Text>
                            <Text>{player?.prizeCards.length}</Text>
                        </Stack>

                        <Center fontSize='2xl' fontWeight='bold'>{playerWon ? 'WIN' : tie ? 'TIE' : 'LOST'}</Center>
                    </Stack>

                    <Center fontWeight='bold' fontSize='6xl'>VS</Center>

                    <Stack spacing='2rem' paddingLeft='3rem' paddingRight='3rem' paddingTop='1rem' paddingBottom='1rem' 
                            border='2px' borderRadius='1rem' borderColor='gray.500' width='20rem'
                            backgroundColor={playerWon ? 'red.600' : tie ? 'yellow.400' : 'green.400'}>
                        <Center fontWeight='bold'>{opponent?.user.userName}</Center>

                        <Stack direction='row' spacing='4px' alignSelf='center'>
                            <Text>Cards won:</Text>
                            <Text>{opponent?.prizeCards.length}</Text>
                        </Stack>

                        <Center fontSize='2xl' fontWeight='bold'>{playerWon ? 'LOST' : tie ? 'TIE' : 'WIN'}</Center>
                    </Stack>
                </Stack>

                <Center fontSize='4xl'>Duel recap</Center>

                <Table variant='simple'> 
                    <Tbody>
                        {
                            Collection.wrap(match!.duelHistoryList)
                                .map( (duel, index) => 
                                    <Tr key={index}>
                                        <Td borderRadius='1rem'>
                                            <HistoricDuel key={index} duel={duel} players={Collection.from({ username: player!.user.userName, playerId: player!.id }, { username: opponent!.user.userName, playerId: opponent!.id })}/>
                                        </Td>
                                    </Tr>
                                ).collection
                        }
                    </Tbody>
                </Table>
            </Stack>
        )
    }

    function renderCancelledMatch() {

        const player = match?.player
        const opponent = match?.opponent

        const playerWon = player!.prizeCards.length > opponent!.prizeCards.length
        const tie = player!.prizeCards.length == opponent!.prizeCards.length

        const duelHistory = Collection.wrap(match!.duelHistoryList)
        return (
            <Stack spacing='2rem' fontSize='xl' paddingBottom='10rem'>
                <Center fontSize='3xl' fontWeight='bold'>Match cancelled by {player?.user.userName}</Center>
                <Center fontSize='2xl'>Duel results</Center>

                <Stack direction='row' spacing='10rem' paddingTop='2rem' alignSelf='center'>
                    <Stack spacing='2rem' paddingLeft='3rem' paddingRight='3rem' paddingTop='1rem' paddingBottom='1rem' 
                            border='2px' borderRadius='1rem' borderColor='gray.500' width='20rem'
                            backgroundColor='red.600'>
                        <Center fontWeight='bold'>{player?.user.userName}</Center>

                        <Stack direction='row' spacing='4px' alignSelf='center'>
                            <Text>Cards won:</Text>
                            <Text>{player?.prizeCards.length}</Text>
                        </Stack>

                        <Center fontSize='2xl' fontWeight='bold'>SURRENDED</Center>
                    </Stack>

                    <Center fontWeight='bold' fontSize='6xl'>VS</Center>

                    <Stack spacing='2rem' paddingLeft='3rem' paddingRight='3rem' paddingTop='1rem' paddingBottom='1rem' 
                            border='2px' borderRadius='1rem' borderColor='gray.500' width='20rem'
                            backgroundColor='green.400'>
                        <Center fontWeight='bold'>{opponent?.user.userName}</Center>

                        <Stack direction='row' spacing='4px' alignSelf='center'>
                            <Text>Cards won:</Text>
                            <Text>{opponent?.prizeCards.length}</Text>
                        </Stack>

                        <Center fontSize='2xl' fontWeight='bold'>WIN</Center>
                    </Stack>
                </Stack>

                <Center fontSize='4xl'>Duel recap</Center>

                {
                    duelHistory.nonEmpty() ?
                        <Table variant='simple'> 
                            <Tbody>
                                {
                                    duelHistory
                                        .map( (duel, index) => 
                                            <Tr key={index}>
                                                <Td borderRadius='1rem'>
                                                    <HistoricDuel key={index} duel={duel} players={Collection.from({ username: player!.user.userName, playerId: player!.id }, { username: opponent!.user.userName, playerId: opponent!.id })}/>
                                                </Td>
                                            </Tr>
                                        ).collection
                                }
                            </Tbody>
                        </Table> :
                        <Center>No duels played. Match rejected or cancelled before playing</Center>
                }
            </Stack>
        )
    }
}