import React from 'react'
import { Box, Center, Stack, StackDivider, Text } from "@chakra-ui/react"
import { MainHeader } from '../components/MainHeader'
import { TokenProps, withTokenValidation } from '../commons/BehaviorAddOns'
import { useSelector } from 'react-redux'
import { RootState } from '../store/Store'

export default function UserPage() { return( withTokenValidation({}) (UserContent) )}

type UserProps = TokenProps

function UserContent({ renderWithTokenValidation }: UserProps) {
    
    function getUser(state: RootState) {
        return state.user
    }

    const user = useSelector(getUser)

    return( renderWithTokenValidation(content) )

    function content() {
        return (
            <Stack spacing='1px' fontSize='xl'>
                
                <MainHeader hideHubButton /> 

                <Box bg='lightblue' borderRadius='7px'>
                    <Center padding='4' fontSize='2xl' fontStyle='italic' fontWeight='bold'>
                        Welcome {user.username}!
                    </Center>
                </Box>

                <Stack  bg='gray.300'
                        borderRadius='7px'
                        padding='4'
                        boxSize='full'
                        spacing='3rem'
                        paddingBottom='4.6rem'
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

                        <Stack spacing='3rem'>
                            <Center fontSize='4xl'>Your statistics</Center>

                            {
                                user.stats ? 
                                    <Stack backgroundColor='gray.400' padding='1rem' borderRadius='1rem' border='2px' borderColor='teal.500'>
                                        <Stack direction='row' spacing='4px'>
                                            <Text>You have a total of</Text>
                                            <Text fontWeight='bold'>{user.stats.totalPoint}</Text>
                                            <Text>points</Text>
                                        </Stack>
                                        
                                        <Stack direction='row' spacing='4px'>
                                            <Text>You've won</Text>
                                            <Text fontWeight='bold'>{user.stats.winCount}</Text>
                                            <Text>matches</Text>
                                        </Stack>

                                        <Stack direction='row' spacing='4px'>
                                            <Text>You've lost</Text>
                                            <Text fontWeight='bold'>{user.stats.loseCount}</Text>
                                            <Text>matches</Text>
                                        </Stack>

                                        <Stack direction='row' spacing='4px'>
                                            <Text>You've tied</Text>
                                            <Text fontWeight='bold'>{user.stats.tieCount}</Text>
                                            <Text>matches</Text>
                                        </Stack>

                                        <Stack direction='row' spacing='4px'>
                                            <Text>You have</Text>
                                            <Text fontWeight='bold'>{user.stats.inProgressCount}</Text>
                                            <Text>matches in progress</Text>
                                        </Stack>
                                    </Stack> :
                                    <Text>No stats could be retrieved...</Text>
                            }
                        </Stack>
                </Stack>
            </Stack>
        )
    }
}