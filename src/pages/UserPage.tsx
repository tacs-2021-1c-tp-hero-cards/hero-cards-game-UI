import React from 'react'
import { Box, Button, Center, Stack, StackDivider, Text } from "@chakra-ui/react"
import { logOut } from '../commons/LogOut'
import { MainHeader } from '../components/MainHeader'
import { getCookie } from '../commons/Cookies'
import { RedirectProps, TokenProps, withRedirect, withTokenValidation } from '../commons/BehaviorAddOns'
import { LogOutIcon, ManageIcon, PlayIcon, SearchIcon } from '../components/icons'

export function UserPage() { return( withRedirect({}) (withTokenValidation) (UserContent) )}

type UserProps = RedirectProps & TokenProps

function UserContent({ redirect, renderWithTokenValidation }: UserProps) {

    return( renderWithTokenValidation(content) )

    function content() {
        return (
            <Stack spacing='1px'>
                
                <MainHeader />

                <Box bg='lightblue' borderRadius='7px'>
                    <Center padding='4' fontSize='xl' fontStyle='italic' fontWeight='bold'>
                        Welcome {getCookie('username')}!
                    </Center>
                </Box>

                <Stack direction='row' spacing='1px'>
                    <Stack padding='4'
                        bg='gray.200'
                        borderRadius='7px'
                        minW='200px'
                        divider={<StackDivider borderColor='gray.500' />}>

                        <Button colorScheme="orange"
                                leftIcon={<LogOutIcon />}
                                variant="solid"
                                textColor='gray.700'
                                onClick={() => logOut(() => redirect('/'), () => redirect('/error'))}>
                            Log Out
                        </Button>

                        <Button colorScheme="orange"
                                leftIcon={<ManageIcon />}
                                variant="solid"
                                textColor='gray.700'
                                onClick={() => redirect('/decks')}>
                            Manage decks
                        </Button>

                        <Button colorScheme="cyan"
                                leftIcon={<SearchIcon />}
                                variant="solid"
                                textColor='gray.700'
                                onClick={() => redirect('/cards')}>
                            Search cards
                        </Button>

                        <Button colorScheme="green"
                                disabled
                                leftIcon={<PlayIcon />}
                                variant="solid"
                                textColor='gray.700'
                                onClick={() => {}}>
                            Start a match
                        </Button>
                    </Stack>

                    <Stack  bg='gray.300'
                            borderRadius='7px'
                            padding='4'
                            boxSize='full'
                            spacing='4'
                            divider={<StackDivider borderColor='gray.500' />}>

                            <Center fontSize='4xl'>Game rules</Center>
                            
                            <Stack>
                                <Text>
                                    The rules are pretty basic. You can play a match against another player or against an AI.
                                </Text>
                                <Text>
                                    Before starting the match, a deck must be chosen, which will determine the cards that you and your 
                                    oponent will be using to play the match. After selecting a deck, a coin will tossed to select a
                                    random player that will have the first turn.
                                </Text>
                                <Text>
                                    The deck's cards will be splitted, giving half of the cards to every player. On each turn, you will 
                                    be given the first card of your available cards (and so will happen to your oponent) and the player 
                                    that holds the turn will select an attribute to fight with. The player holding the card with the winning 
                                    attribute is declared winner of that turn and keeps both cards on a deck of prizes.
                                </Text>
                                <Text>
                                    At the end of the match, the player that has more cards at the prizes' deck is declared winner of the 
                                    hole match. If both players hold the same amount of cards, then a tie is declared.
                                </Text>
                            </Stack>
                        
                    </Stack>

                </Stack>
            </Stack>
        )
    }
}