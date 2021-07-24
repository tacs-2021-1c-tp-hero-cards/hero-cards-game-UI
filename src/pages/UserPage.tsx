import React from 'react'
import { Box, Center, Stack, StackDivider, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react"
import { MainHeader } from '../components/MainHeader'
import { TokenProps, withTokenValidation } from '../commons/BehaviorAddOns'
import { useSelector } from 'react-redux'
import { RootState } from '../store/Store'
import Collection from '../commons/Collections'
import { MatchPreview } from '../components/matches/Match'
import { UserMatch } from '../components/matches/Match'

export default function UserPage() { return( withTokenValidation({}) (UserContent) )}

type UserProps = TokenProps

function UserContent({ renderWithTokenValidation }: UserProps) {
    
    function getUser(state: RootState) {
        return state.user
    }

    const user = useSelector(getUser)

    const matches: Collection<UserMatch> = user.matches ? Collection.wrap(user.matches) : Collection.empty()

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

                        <Stack direction='row' spacing='2rem' boxSize='full'>
                            <Stack spacing='3rem' boxSize='full'>
                                <Center fontSize='4xl'>Your matches</Center>

                                {
                                    matches.nonEmpty() ? 
                                        <Stack backgroundColor='gray.400' padding='1rem' borderRadius='1rem' border='2px' borderColor='cyan.500'>
                                            <Table variant='striped' colorScheme='blackAlpha'>
                                                <Tbody>
                                                    { 
                                                        matches.filter((match: UserMatch) => match.status == 'PENDING')
                                                            .map((match: UserMatch) => 
                                                                <Tr key={match.matchId} width='40rem'>
                                                                    <Td borderRadius='0.5rem' key={match.matchId}>
                                                                        <MatchPreview match={match} />
                                                                    </Td>
                                                                </Tr>
                                                            ).collection
                                                    }
                                                    {
                                                        matches.filter((match: UserMatch) => match.status == 'IN_PROGRESS')
                                                            .map((match: UserMatch) => 
                                                                <Tr key={match.matchId} width='40rem'>
                                                                    <Td borderRadius='0.5rem' key={match.matchId}>
                                                                        <MatchPreview match={match} />
                                                                    </Td>
                                                                </Tr>
                                                            ).collection
                                                    } 
                                                    {
                                                        matches.filter((match: UserMatch) => match.status != 'IN_PROGRESS' && match.status != 'PENDING')
                                                            .map((match: UserMatch) => 
                                                                <Tr key={match.matchId} width='40rem'>
                                                                    <Td borderRadius='0.5rem' key={match.matchId}>
                                                                        <MatchPreview match={match} />
                                                                    </Td>
                                                                </Tr>
                                                            ).collection
                                                    } 
                                                </Tbody>
                                            </Table>
                                        </Stack> :
                                        <Text>No macthes found...</Text>
                                }
                            </Stack>

                            <Stack spacing='3rem' width='40rem'>
                                <Center fontSize='4xl'>Your statistics</Center>

                                {
                                    user.stats ? 
                                        <Stack backgroundColor='blue.100' padding='1rem' borderRadius='1rem' border='2px' borderColor='teal.500'>
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

                                            <Stack direction='row' spacing='4px'>
                                                <Text>You have created</Text>
                                                <Text fontWeight='bold'>{Collection.wrap(user.matches).count(m => m.owned)}</Text>
                                                <Text>matches</Text>
                                            </Stack>
                                        </Stack> :
                                        <Text>No stats could be retrieved...</Text>
                                }
                            </Stack>
                        </Stack>
                </Stack>
            </Stack>
        )
    }
}