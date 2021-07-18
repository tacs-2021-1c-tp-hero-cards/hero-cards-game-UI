import React from 'react'
import { Button, Center, Stack, StackDivider, Text, Image } from "@chakra-ui/react"
import { MainHeader } from '../components/MainHeader'
import { RedirectProps, ToastProps, TokenProps, withRedirect, withToast, withTokenValidation } from '../commons/BehaviorAddOns'
import { AiIcon, PlayIcon, RetryIcon, UserIcon, UsersIcon } from '../components/icons'
import { useState } from 'react'
import Collection from '../commons/Collections'
import { DeckData } from '../components/Deck'
import { AlertPopUp } from '../components/AlertPopUp'
import { DecksSearchBox } from '../components/DecksSearchBox'
import { CloseIcon } from '@chakra-ui/icons'
import { sleep } from '../commons/Sleep'
import { ServerConnector } from '../BackendConnector'
import { UsersSearchBox } from '../components/UserSearchBox'
import { User } from '../components/User'
import { AI } from '../components/AI'
import coin from '../coin.webp'
import { SubmitDataErrorToast } from '../commons/Toast'
import ReturnButton from '../components/ReturnButton'
import MyHubButton from '../components/MyHubButton'


export function StartMatchPage() { return( withRedirect({}) (withTokenValidation) (withToast) (StartMatchContent) )}

type UserProps = RedirectProps & TokenProps & ToastProps

function StartMatchContent({ renderWithTokenValidation, redirect, toast }: UserProps) {
    const [ oponentType, setOponentType ] = useState<string>()
    const [ oponent, setOponent ] = useState<User | AI>()
    const [ maybeOponent, setMaybeOponent ] = useState<User | AI>()
    const [ deck, setDeck ] = useState<DeckData>()
    const [ maybeDeck, setMaybeDeck ] = useState<DeckData>()
    const [ accepted, setAccepted ] = useState<boolean>(false)
    const [ starter, setStarter ] = useState<string>()
    const [ coinTossed, setCoinTossed ] = useState<boolean>(false)
    const [ error, setError ] = useState<boolean>(false)
    const [ matchId, setMatchId ] = useState<number>()

    return( renderWithTokenValidation(content) )

    function content() {
        return (
            <Stack spacing='1px'>
                
                <MainHeader searchCardsButton />

                <Stack direction='row' spacing='1px' boxSize='full'>
                
                {
                    accepted ? tossCoinContent() :
                                deck ? showDetailsContent() :
                                        oponent ? chooseDeckContent() :
                                                    oponentType ? chooseOponentContent() : chooseMatchTypeContent()
                }

                </Stack>
            </Stack>
        )
    }

    function chooseMatchTypeContent() {
        return (
            <Stack  bg='gray.300'
                    borderRadius='7px'
                    padding='4'
                    boxSize='full'
                    spacing='4'
                    divider={<StackDivider borderColor='gray.500' />}>

                    <Center fontSize='4xl'>Play!</Center>
                    
                    <Stack direction='row' divider={<StackDivider borderColor='gray.400' />} boxSize='full' fontSize='xl'>
                        <Stack textAlign='center' alignSelf='center' boxSize='full'>
                            <Center fontSize='2xl'>Against an AI</Center>

                            <Center>
                                Battle against an AI to test a deck before trying to fight other players or just for fun.
                            </Center>

                            <Button colorScheme="teal"
                                    leftIcon={<AiIcon />}
                                    variant="solid"
                                    width='10rem'
                                    alignSelf='center'
                                    onClick={() => setOponentType('IA')} 
                                    fontSize='xl'>
                                Let's go!
                            </Button>
                        </Stack>

                        <Stack textAlign='center' alignSelf='center' boxSize='full'>
                            <Center fontSize='2xl'>Against another player</Center>

                            <Center textAlign='center'>
                                Test yourself against other players in battle, and climb to the top of the scoreboard!
                            </Center>

                            <Button colorScheme="teal"
                                    leftIcon={<UsersIcon />}
                                    variant="solid"
                                    width='10rem'
                                    alignSelf='center'
                                    onClick={() => setOponentType('HUMAN') } 
                                    fontSize='xl'>
                                Let's go!
                            </Button>
                        </Stack>
                    </Stack>
            </Stack>
        )
    }

    function chooseOponentContent() {
        return (
            <Stack  bg='gray.300'
                    borderRadius='7px'
                    padding='4'
                    boxSize='full'
                    spacing='4'
                    divider={<StackDivider borderColor='gray.500' />} 
                    fontSize='xl'>

                    <Center fontSize='4xl'>Choose your oponent</Center>
                    
                    <Stack>
                        
                        <UsersSearchBox userType={oponentType!} onUserClick={setMaybeOponent} /> 

                        <AlertPopUp isOpen={maybeOponent != undefined}
                                    onClose={() => setMaybeOponent(undefined)}
                                    header='¿Are you sure?'
                                    body={`You want to start a match against ${maybeOponent?.userName}?`}
                                    onSubmit={() => setOponent(maybeOponent)} /> 

                    </Stack>
                    
                    <ReturnButton returnLike={() => setOponentType(undefined)} />

            </Stack>
        )
    }

    function chooseDeckContent() {
        return (
            <Stack  bg='gray.300'
                    borderRadius='7px'
                    padding='4'
                    boxSize='full'
                    spacing='4'
                    divider={<StackDivider borderColor='gray.500' />}>

                    <Center fontSize='4xl'>Choose a deck</Center>

                    <Stack>
                        <AlertPopUp isOpen={maybeDeck != undefined}
                                    onClose={() => setMaybeDeck(undefined)}
                                    header='¿Are you sure?'
                                    body={`You want to play this match with ${maybeDeck?.name} deck?`}
                                    onSubmit={() => setDeck(maybeDeck)} />

                        <DecksSearchBox  onDeckClick={setMaybeDeck} fontSize='xl' hideCardsTooltip/>
                    </Stack>
                    
                    <ReturnButton returnLike={() => {
                            setMaybeOponent(undefined)
                            setOponent(undefined)
                        }} />
            </Stack>
        )
    }

    function cleanFields() {
        setMaybeDeck(undefined)
        setDeck(undefined)
        setMaybeOponent(undefined)
        setOponent(undefined)
        setOponentType(undefined)
        setError(false)
        setAccepted(false)
        setCoinTossed(false)
        setStarter(undefined)
    }

    function showDetailsContent() {
        return (
            <Stack  bg='gray.300'
                    borderRadius='7px'
                    padding='4'
                    boxSize='full'
                    spacing='4'
                    divider={<StackDivider borderColor='gray.500' />}>

                    <Center fontSize='4xl'>Check match's details</Center>

                    <Stack spacing='1rem'>
                        <Text fontSize='2xl'>Your match will be created with this setup ¿Are you ok with this?</Text>

                        <Stack bgColor='teal.300' padding='1rem' borderRadius='0.4rem'>
                            <Text fontSize='xl'>You have chosen to play against { oponentType === 'IA' ? 'an AI' : 'another player' }</Text>
                        </Stack>

                        <Stack bgColor='blue.300' padding='1rem' borderRadius='0.4rem' direction='row' fontSize='xl'>
                            <Text>You will be playing against: </Text>
                            <Text fontWeight='bold' >{ oponent?.userName }</Text>
                        </Stack>
                        
                        <Stack bgColor='cyan.300' padding='1rem' borderRadius='0.4rem' direction='row' fontSize='xl'>
                            <Text>The match's deck will be: </Text>
                            <Text fontWeight='bold' >{ deck?.name }</Text>
                        </Stack>

                        <Stack spacing='0.75rem'>
                            <Text fontSize='2xl'>¿Shall we continue?</Text>

                            <Stack direction='row' spacing='1rem'>
                                <Button colorScheme='red' 
                                        leftIcon={<CloseIcon />}
                                        variant="solid"
                                        width='12rem'
                                        fontSize='xl'
                                        onClick={cleanFields}>
                                    No, start over
                                </Button>
                    
                                <ReturnButton returnLike={() => {
                                        setMaybeDeck(undefined)
                                        setDeck(undefined)
                                    }} />
                                
                                <Button colorScheme='green' 
                                        leftIcon={<PlayIcon />}
                                        variant="solid"
                                        width='12rem'
                                        fontSize='xl'
                                        onClick={() => setAccepted(true)}>
                                    Yes! Let's go
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
            </Stack>
        )
    }

    function tossCoin() {
        setCoinTossed(true)

        ServerConnector.createMatch(
            {
                userId: +oponent?.id! ,
                userType: oponentType!, 
                deckId: deck?.id!
            },
            (match) => {
                sleep(3000).then(() => {
                    setMatchId(match.id)
                    setStarter(match.player.user.userName)
                    setCoinTossed(false)
                })
            },
            (_) => {
                toast(SubmitDataErrorToast)
                setError(true)
                setCoinTossed(false)
            }
        )
    }

    function tossCoinContent() {
        return (
            <Stack  bg='gray.300'
                    borderRadius='7px'
                    padding='4'
                    boxSize='full'
                    spacing='4'
                    minHeight='40rem'
                    divider={<StackDivider borderColor='gray.500' />}>

                    <Center fontSize='4xl'>Toss a coin</Center>

                    {
                        error ?
                            <Stack spacing='1rem' alignSelf='center' fontSize='xl'>
                                <Text textAlign='center'>There seems to be a problem creating your match</Text>
                                <Text textAlign='center'>Please, try again</Text>
                                
                                <Button colorScheme='orange' 
                                        leftIcon={<RetryIcon />}
                                        width='10rem'
                                        variant='solid'
                                        alignSelf='center'
                                        onClick={cleanFields} 
                                        fontSize='xl'>
                                    Start over
                                </Button>
                            </Stack> :

                            starter ? 
                                <Stack spacing='1rem' alignSelf='center' fontSize='xl'>
                                    <Stack direction='row' spacing='4px' alignSelf='center' fontSize='xl'>
                                        <Text fontWeight='bold'>{starter!}</Text>
                                        <Text>will be the first to play</Text>
                                    </Stack>

                                    <Center>Now relax and wait for {oponent!.userName} to accept the match</Center>
                                    <Center>Or you can go and do as you please. Don't worry, we'll let you know about {oponent!.userName}'s choice</Center>

                                    <Stack direction='row' spacing='2rem' alignSelf='center'>
                                        <MyHubButton width='13rem' />
                                        <Button colorScheme="green"
                                                leftIcon={<PlayIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                fontSize='xl'
                                                width='13rem'
                                                onClick={() => redirect(`/matches/${matchId}`)}>
                                            Await oponent
                                        </Button>
                                    </Stack>
                                </Stack> :

                                coinTossed ? 
                                    <Image  boxSize='20rem' 
                                            alignSelf='center'
                                            src={coin}/> :

                                    <Stack spacing='2rem'>
                                        <Text textAlign='center' fontSize='xl'>The first player to play will be picked randomly</Text>
                                        <Button colorScheme='yellow' 
                                                width='10rem'
                                                variant='solid'
                                                alignSelf='center'
                                                onClick={tossCoin} 
                                                fontSize='xl'>
                                            Test your luck
                                        </Button>
                                    </Stack>
                    }
            </Stack>
        )
    }
}

