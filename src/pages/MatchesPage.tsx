import React from 'react'
import { Alert, AlertIcon, Button, Center, CircularProgress, Stack, StackDivider, Table, Tbody, Td, Tr, Text } from "@chakra-ui/react"
import { MainHeader } from '../components/MainHeader'
import { RedirectProps, TokenProps, withRedirect, withTokenValidation } from '../commons/BehaviorAddOns'
import { AiIcon, UsersIcon } from '../components/icons'
import { useState } from 'react'
import { Player, PlayerPreview } from '../components/Player'
import { Collection } from '../commons/Collections'
import { DeckData } from '../components/Deck'
import { SubmitableInput } from '../components/SubmitableInput'
import { isNonEmpty } from '../commons/InputValidations'
import { AlertPopUp } from '../components/AlertPopUp'

export function StartMatchPage() { return( withRedirect({}) (withTokenValidation) (StartMatchContent) )}

type UserProps = RedirectProps & TokenProps

function StartMatchContent({ renderWithTokenValidation }: UserProps) {
    const [ matchType, setMatchType ] = useState<string>()
    const [ oponent, setOponent ] = useState<Player>()
    const [ players, setPlayers ] = useState<Collection<Player>>(Collection.empty())
    const [ searchPlayersIsLoading, setSearchPlayersIsLoading ] = useState<boolean>(false)
    const [ searchPlayerError, setSearchPlayerError ] = useState<boolean>(false)
    const [ maybeOponent, setMaybeOponent ] = useState<Player>()
    const [ deck, setDeck ] = useState<DeckData>()
    const [ accepted, setAccepted ] = useState<boolean>(false)
    const [ starter, setStarter ] = useState<Player>()

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
                                            setPlayers(bots())
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

    function searchPlayers(username: string) {
        setPlayers(bots())
    }

    function showPlayerAlert(player: Player) {

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
                            <SubmitableInput    id='searchPlayer' 
                                                placeHolder='Please enter player username'
                                                buttonLabel='Search'
                                                isValid={isNonEmpty}
                                                onClick={searchPlayers}/> :
                            <></>
                        }

                        <AlertPopUp isOpen={maybeOponent != undefined}
                                    onClose={() => setMaybeOponent(undefined)}
                                    header='¿Are you sure?'
                                    body={`You want to start a match against ${maybeOponent?.username}?`}
                                    onSubmit={() => setOponent(maybeOponent)} /> : 

                        <Stack spacing='3.5'>
                            {
                                searchPlayersIsLoading ? 
                                                                
                                    <Center>
                                        <CircularProgress isIndeterminate color="green.300" />  
                                    </Center> :
                                    
                                    searchPlayerError ? 
                
                                    <Alert status="error">
                                        <AlertIcon />
                                        There was an error processing your request
                                    </Alert> :
                                        
                                        players.isEmpty() ? 
                                        
                                            <Text>No players to show</Text> : 
                                            
                                            <Table variant='striped' colorScheme='green'> 
                                                <Tbody>
                                                    { 
                                                        players.map( (player, index) => 
                                                            <Tr>
                                                                <Td borderRadius='1rem'>
                                                                    <PlayerPreview key={index} player={player} onClick={setMaybeOponent} />
                                                                </Td>
                                                            </Tr>
                                                        ).collection
                                                    } 
                                                </Tbody>
                                            </Table>
                            }
                        </Stack>
                    </Stack>
                
            </Stack>
        )
    }

    function chooseDeckContent() {
        return (
            <>choose deck</>
        )
    }

    function showDetailsContent() {
        return (
            <>show detail</>
        )
    }

    function tossCoinContent() {
        return (
            <>toss a coin</>
        )
    }
}



function bots(): Collection<Player> {
    return (
        Collection.from(
            {
                username: 'Carl'
            },
            {
                username: 'Lenny'
            },
            {
                username: 'Homer'
            }
        )
    )
}