import React from 'react'
import { Alert, AlertIcon, Box, Button, Center, CircularProgress, Stack, StackDivider, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { ConditionalRenderSupportProps, ToastProps, TokenProps, withRenderCondition, withToast, withTokenValidation } from '../commons/BehaviorAddOns'
import { MainHeader } from '../components/MainHeader'
import { ServerConnector } from '../BackendConnector'
import { useState } from 'react'
import { Match } from '../components/matches/Match'
import { DeckPreview } from '../components/decks/Deck'
import { shallowEqual } from 'react-redux'
import { useGetState } from '../store/hooks'
import Collection from '../commons/Collections'
import { Card, CardBackwards } from '../components/cards/Card'
import { CombatIcon, HeightIcon, IntelligenceIcon, PowerIcon, SpeedIcon, StrengthIcon, WeightIcon } from '../components/miscellaneous/icons'
import { customToast } from '../commons/Toast'

export default function MatchPage() { return( withRenderCondition({}) (withTokenValidation) (withToast) (MatchContent) )}

type ShowCardProps = TokenProps & ConditionalRenderSupportProps & ToastProps

export function MatchContent({ renderOnCondition, renderWithTokenValidation, toast }: ShowCardProps) {
    let { matchId }: any = useParams()

    const [ match, setMatch ] = useState<Match>()
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ searchingMatch, setSearchingMatch] = useState<boolean>(false)
    const [ shouldShowMatch, setShouldShowMatch ] = useState<boolean>(true)

    const confirmations = useGetState(state => state.socket.confirmations, shallowEqual)
    const rejections = useGetState(state => state.socket.rejections, shallowEqual)
    const abortions = useGetState(state => state.socket.abortions, shallowEqual)

    const user = useGetState(state => state.user)

    if (!match && !searchingMatch) {
        setSearchingMatch(true)

        ServerConnector.getMatch(
            matchId,
            (matchData) => {
                console.log(matchData)
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
                        <CardBackwards />
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
                        {nextCard ? <Card attributes={nextCard}/> : <></>}
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
                        <CardBackwards />
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
        return (
            <Stack>
                <Text>Finalized</Text>
            </Stack>
        )
    }

    function renderCancelledMatch() {
        return (
            <Stack>
                <Text>Cancelled</Text>
            </Stack>
        )
    }
}