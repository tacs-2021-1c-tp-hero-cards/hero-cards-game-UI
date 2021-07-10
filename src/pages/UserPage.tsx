import React from 'react'
import { Box, Center, Stack, StackDivider, Text } from "@chakra-ui/react"
import { MainHeader } from '../components/MainHeader'
import { getCookie } from '../commons/Cookies'
import { RedirectProps, TokenProps, withRedirect, withTokenValidation } from '../commons/BehaviorAddOns'
import { useState } from 'react'
import { ServerConnector } from '../BackendConnector'
import { getToken } from '../commons/Token'
import { Collection } from '../commons/Collections'
import { User } from '../components/User'

export function UserPage() { return( withRedirect({}) (withTokenValidation) (UserContent) )}

type UserProps = RedirectProps & TokenProps

function UserContent({ redirect, renderWithTokenValidation }: UserProps) {
    const [ user, setUser ] = useState<User>()
    const [ searchingUser, setSearchingUser ] = useState(false)

    if (!user && !searchingUser) {
        setSearchingUser(true)

        ServerConnector.getUsersByToken(
            getToken()!,
            (users) => {
                setUser(Collection.wrap(users).head())
                setSearchingUser(false)
            },
            (_) => setSearchingUser(false)
        )
    }

    return( renderWithTokenValidation(content) )

    function content() {
        return (
            <Stack spacing='1px'>
                
                {
                    user && user.admin ?
                        <MainHeader logOutButton manageDecksButton searchCardsButton startAMatchButton /> :
                        <MainHeader logOutButton searchCardsButton startAMatchButton /> 
                        
                }

                <Box bg='lightblue' borderRadius='7px'>
                    <Center padding='4' fontSize='xl' fontStyle='italic' fontWeight='bold'>
                        Welcome {getCookie('username')}!
                    </Center>
                </Box>

                <Stack direction='row' spacing='1px'>

                    <Stack  bg='gray.300'
                            borderRadius='7px'
                            padding='4'
                            boxSize='full'
                            spacing='4'
                            divider={<StackDivider borderColor='gray.500' />}>
                                
                            <Center fontSize='4xl' >Game rules</Center>
                            
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