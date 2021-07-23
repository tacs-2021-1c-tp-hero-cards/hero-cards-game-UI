import { Box, Center, SimpleGrid, Stack } from "@chakra-ui/react"
import React from "react"
import Collection from "../../commons/Collections"
import { Card, CardPreview } from "../cards/Card"
import { HistoricPlayer } from "../players/Player"
import { CardsGrid } from '../cards/CardsGrid'

export type Duel = {

}

export type HistoricDuel = {
    id: number,
    player: HistoricPlayer,
    opponent: HistoricPlayer,
    duelType: string,
    duelResult: string
}

type Props = {
    duel: HistoricDuel,
    players: Collection<NamedPlayer>,
    hideAvailableCards?: boolean
}

type NamedPlayer = {
    username: string,
    playerId: number
}

export function HistoricDuel({ duel, players, hideAvailableCards }: Props) {

    const player = players.find(p => p.playerId == duel.player.id)
    const opponent = players.find(p => p.playerId == duel.opponent.id)
    
    return (
        <Stack spacing='2rem' fontSize='xl' paddingBottom='10rem'>
                <Center fontSize='3xl' fontWeight='bold'>{player?.username}'s turn</Center>

                <Stack direction='row' spacing='10rem' paddingTop='3rem' alignSelf='center'>

                    <Stack padding='1rem' spacing='2rem' fontSize='xl'>
                        { hideAvailableCards ? <></> : <Center>Available cards</Center> }
                            
                        {
                            hideAvailableCards ? <></> :
                                <SimpleGrid columns={4} gap='1'>
                                    { 
                                        duel.player.availableCards.map( card => 
                                            <CardPreview key={card.id} card={card} height='8rem' />
                                        )
                                    }
                                </SimpleGrid>
                        }

                        <Center minWidth='10rem'>Prize cards</Center>
                        <SimpleGrid columns={4} gap='1'>
                            { 
                                duel.player.prizeCards.map( card => 
                                    <CardPreview key={card.id} card={card} height='8rem' />
                                )
                            }
                        </SimpleGrid>
                    </Stack>

                    <Stack spacing='2rem' paddingLeft='3rem' paddingRight='3rem' paddingTop='1rem' paddingBottom='1rem' 
                            border='2px' borderRadius='1rem' borderColor='gray.400' 
                            backgroundColor={duel.duelResult == 'WIN' ? 'green.400' : duel.duelResult == 'TIE' ? 'yellow.400' : 'red.600'}>
                        <Card attributes={duel.player.cardPlayed}/>
                        <Center>{player?.username}'s card for this turn</Center>
                    </Stack>

                    <Stack alignSelf='center' spacing='2rem'>
                        <Center fontWeight='bold' fontSize='6xl'>VS</Center>

                        <Center fontSize='2xl'>Using</Center>
                        <Center fontSize='2xl'>{duel.duelType}</Center>
                    </Stack>

                    <Stack spacing='2rem' paddingLeft='3rem' paddingRight='3rem' paddingTop='1rem' paddingBottom='1rem' 
                            border='2px' borderRadius='1rem' borderColor='gray.400'
                            backgroundColor={duel.duelResult == 'LOSE' ? 'green.400' : duel.duelResult == 'TIE' ? 'yellow.400' : 'red.600'}>
                        <Card attributes={duel.opponent.cardPlayed}/>
                        <Center>{opponent?.username}'s card for this turn</Center>
                    </Stack>

                    <Stack padding='1rem' spacing='2rem' fontSize='xl'>
                        { hideAvailableCards ? <></> : <Center>Available cards</Center> }
                                
                        {
                            hideAvailableCards ? <></> : 
                                <SimpleGrid columns={4} gap='1'>
                                    { 
                                        duel.opponent.availableCards.map( card => 
                                            <CardPreview key={card.id} card={card} height='8rem' />
                                        )
                                    }
                                </SimpleGrid>
                        }

                        <Center minWidth='10rem'>Prize cards</Center>
                        <SimpleGrid columns={4} gap='1'>
                            { 
                                duel.opponent.prizeCards.map( card => 
                                    <CardPreview key={card.id} card={card} height='8rem' />
                                )
                            }
                        </SimpleGrid>
                    </Stack>
                </Stack>
            </Stack>
    )
}
