import React from 'react'
import { Alert, AlertIcon, Button, Center, CircularProgress, Stack, StackDivider, Table, Tbody, Td, Tr, Text, Image } from "@chakra-ui/react"
import { MainHeader } from '../components/MainHeader'
import { RedirectProps, ToastProps, TokenProps, withRedirect, withToast, withTokenValidation } from '../commons/BehaviorAddOns'
import { AiIcon, PlayIcon, UsersIcon } from '../components/icons'
import { useState } from 'react'
import { Collection } from '../commons/Collections'
import { DeckData } from '../components/Deck'
import { SubmitableInput } from '../components/SubmitableInput'
import { isNonEmpty } from '../commons/InputValidations'
import { AlertPopUp } from '../components/AlertPopUp'
import { DecksSearchBox } from '../components/DecksSearchBox'
import { CloseIcon } from '@chakra-ui/icons'
import { sleep } from '../commons/Sleep'
import { getCookie } from '../commons/Cookies'
import { ServerConnector } from '../BackendConnector'
import { UsersSearchBox } from '../components/UserSearchBox'
import { User, UserPreview } from '../components/User'
import coin from '../coin.webp'
import { getToken } from '../commons/Token'
import { SubmitDataErrorToast } from '../commons/Toast'


export function StartMatchPage() { return( withRedirect({}) (withTokenValidation) (withToast) (StartMatchContent) )}

type UserProps = RedirectProps & TokenProps & ToastProps

function StartMatchContent({ renderWithTokenValidation, validateToken, toast }: UserProps) {
    const [ matchType, setMatchType ] = useState<string>()
    const [ oponent, setOponent ] = useState<User>()
    const [ botPlayers, setBotPlayers ] = useState<Collection<User>>(Collection.empty())
    const [ maybeOponent, setMaybeOponent ] = useState<User>()
    const [ deck, setDeck ] = useState<DeckData>()
    const [ maybeDeck, setMaybeDeck ] = useState<DeckData>()
    const [ accepted, setAccepted ] = useState<boolean>(false)
    const [ starter, setStarter ] = useState<User>()
    const [ coinTossed, setCoinTossed ] = useState<boolean>(false)

    return( renderWithTokenValidation(content) )

    function content() {
        return (
            <Stack spacing='1px'>
                
                <MainHeader logOutButton userPageButton searchCardsButton />

                <Stack direction='row' spacing='1px'>
                
                {
                    accepted ? tossCoinContent() :
                                deck ? showDetailsContent() :
                                        oponent ? chooseDeckContent() :
                                                    matchType ? chooseOponentContent() : chooseMatchTypeContent()
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
                    
                    <Stack direction='row' divider={<StackDivider borderColor='gray.400' />}>
                        <Stack textAlign='center'>
                            <Center fontSize='2xl'>Against an AI</Center>

                            <Center>
                                Battle against an AI to test a deck before trying to fight other players or just for fun.
                            </Center>

                            <Button colorScheme="teal"
                                    leftIcon={<AiIcon />}
                                    variant="solid"
                                    width='8rem'
                                    alignSelf='center'
                                    onClick={() => {
                                            setBotPlayers(bots())
                                            setMatchType('AI')
                                        } }>
                                Let's go!
                            </Button>
                        </Stack>

                        <Stack textAlign='center'>
                            <Center fontSize='2xl'>Against another player</Center>

                            <Center textAlign='center'>
                                Test yourself against other players in battle, and climb to the top of the scoreboard!
                            </Center>

                            <Button colorScheme="teal"
                                    leftIcon={<UsersIcon />}
                                    variant="solid"
                                    width='8rem'
                                    alignSelf='center'
                                    onClick={() => setMatchType('normal') }>
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
                    divider={<StackDivider borderColor='gray.500' />}>

                    <Center fontSize='4xl'>Choose your oponent</Center>
                    
                    <Stack >
                        
                        { matchType === 'normal' ? 
                            <UsersSearchBox onUserClick={setMaybeOponent} /> :
                            <Table variant='striped' colorScheme='blue'> 
                                <Tbody>
                                    { 
                                        botPlayers.map( bot => 
                                            <Tr>
                                                <Td borderRadius='1rem'>
                                                    <UserPreview key={bot.token} user={bot} onClick={() => setMaybeOponent(bot)} />
                                                </Td>
                                            </Tr>
                                        ).collection
                                    } 
                                </Tbody>
                            </Table>
                        }

                        <AlertPopUp isOpen={maybeOponent != undefined}
                                    onClose={() => setMaybeOponent(undefined)}
                                    header='¿Are you sure?'
                                    body={`You want to start a match against ${maybeOponent?.userName}?`}
                                    onSubmit={() => setOponent(maybeOponent)} /> 

                    </Stack>
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

                        <DecksSearchBox onDeckClick={setMaybeDeck} />
                    </Stack>
            </Stack>
        )
    }

    function cleanFields() {
        setMaybeDeck(undefined)
        setDeck(undefined)

        setMaybeOponent(undefined)
        setOponent(undefined)

        setMatchType(undefined)
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
                        <Text>Your match will be created with this setup ¿Are you ok with this?</Text>

                        <Stack bgColor='teal.300' padding='1rem' borderRadius='0.4rem'>
                            <Text>Yo have chosen to play against { matchType === 'AI' ? 'an AI' : 'another player' }</Text>
                        </Stack>

                        <Stack bgColor='blue.300' padding='1rem' borderRadius='0.4rem' direction='row'>
                            <Text>You will be playing against: </Text>
                            <Text fontWeight='bold' >{ oponent?.userName }</Text>
                        </Stack>
                        
                        <Stack bgColor='cyan.300' padding='1rem' borderRadius='0.4rem' direction='row'>
                            <Text>The match's deck will be: </Text>
                            <Text fontWeight='bold' >{ deck?.name }</Text>
                        </Stack>

                        <Stack spacing='0.5rem'>
                            <Text>¿Shall we continue?</Text>

                            <Stack direction='row' spacing='1rem'>
                                <Button colorScheme='red' 
                                        leftIcon={<CloseIcon />}
                                        variant="solid"
                                        width='10rem'
                                        onClick={cleanFields}>
                                    No, start over
                                </Button>
                                
                                <Button colorScheme='green' 
                                        leftIcon={<PlayIcon />}
                                        variant="solid"
                                        width='10rem'
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
        const token = getToken()

        token ?
            ServerConnector.getUsersByToken(
                token,
                (users) => {
                    ServerConnector.createMatch(
                        {
                            users: Collection.wrap(users).add(oponent!),
                            deck: deck!
                        },
                        (match) => {
                            console.log(match)
                            sleep(3000).then(() => {
                                setStarter(Collection.wrap(match.players).map(p => p.user.userName).head())
                                setCoinTossed(false)
                            })
                        },
                        (error) => {
                            toast(SubmitDataErrorToast)
                        }
                    )
                },
                (error) => {
                    validateToken()
                }
            ) :
            validateToken()
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
                        starter ? 
                            <Stack direction='row' spacing='4px' alignSelf='center'>
                                <Text fontWeight='bold'>{starter!}</Text>
                                <Text>will be the first to play</Text>
                            </Stack> :

                            coinTossed ? 
                                <Image  boxSize='20rem' 
                                        alignSelf='center'
                                        src={coin}/> :

                                <Button colorScheme='yellow' 
                                        width='8rem'
                                        variant='solid'
                                        alignSelf='center'
                                        onClick={tossCoin}>
                                    Test your luck
                                </Button>

                    }
                
            </Stack>
        )
    }
}



function bots(): Collection<User> {
    return (
        Collection.from(
            {
                username: 'Carl'
            },
            {
                username: 'Lenny'
            },
            {
                username: 'Bart'
            },
            {
                username: 'Lisa'
            },
            {
                username: 'Homer'
            }
        )
    )
}