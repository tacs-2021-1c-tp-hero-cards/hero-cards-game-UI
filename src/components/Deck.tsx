import React from "react"
import { Box, Center, Stack, StackDivider, Text, Image, SimpleGrid } from "@chakra-ui/react"
import { CardAttributes, CardPreview } from "./Card"
import { Collection } from "../commons/Collections"
import { capitalizeEveryWord } from "../commons/StringUtils"
import { RedirectProps, withRedirect } from "../commons/BehaviorAddOns"


export type NewDeck = {
    deckName: string,
    cardIds: number[]
}

export type UpdatedDeck = {
    id: number,
    deckName: string,
    deckCards: number[]
}

export type DeckData = {
    id: number,
    name: string,
    cards: CardAttributes[],
    usable: boolean
}

type Props = {
    data: DeckData,
    onClick?: () => void
}

export function DeckPreview( { data, onClick }: Props ) {
    const cards = Collection.wrap<CardAttributes>(data.cards)

    return (
        <Stack  bg='orange.500'
                padding='4px'
                borderRadius='0.5rem' 
                border='2px' 
                borderColor='gray.600'
                spacing='3px'
                cursor='pointer'
                onClick={onClick}
                divider={<StackDivider border='1px' backgroundColor='gray.500' />} >

            <Stack direction='row' height='1.5rem' >
                <Box border='1px' borderColor='gray.500' borderRadius='full' bg='burlywood' width='2rem' >
                    <Center>{data.id}</Center>
                </Box>
                <Center boxSize='full' fontWeight='bold' fontSize='xl' isTruncated >{ capitalizeEveryWord(data.name) }</Center>
            </Stack>

            <Box padding='5px'>
                <SimpleGrid columns={[3, 6, 12]} gap='2'>
                    { 
                        cards.take(24).map( card => 
                            <CardPreview card={card} height='100px' />
                        ).collection
                    }
                </SimpleGrid>
            </Box>

            <Stack bg='orange.100' borderRadius='0.3rem' spacing='3px' border='2px' borderColor='orange.300'>

                <Stack spacing='1px' paddingRight='5px' paddingLeft='5px' fontSize='xs' >
                    <Stack direction='row'>
                        <Center boxSize='full' >Cards {cards.length}</Center>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}


type InsightsProps = {
    deck: DeckData
}

type InsightsFullProps = RedirectProps & InsightsProps

export function DeckInsights(props: InsightsProps) { return withRedirect(props) (DeckInsightsContent)}

function DeckInsightsContent( { deck, redirect }: InsightsFullProps ) {
    const cards = Collection.wrap(deck.cards)

    const paddingLeft = '0.5rem'

    return (
        <Stack  padding='4px'
                spacing='3px'
                divider={<StackDivider borderColor='gray.500' />} >

            <Text fontSize='4xl'>Deck name: {capitalizeEveryWord(deck.name)}</Text>

            <Text fontSize='2xl' paddingLeft={paddingLeft} >
                Id: {deck.id}
            </Text>

            <Box paddingLeft={paddingLeft}>
                <Text fontSize='2xl' >
                    Overall stats:
                </Text>

                <Box paddingLeft={paddingLeft} fontSize='xl' >
                    <Text>
                        Total intelligence: {cards.foldLeft((s, c) => s + c.powerstats.intelligence, 0)}
                    </Text>
                    <Text>
                        Total speed: {cards.foldLeft((s, c) => s + c.powerstats.speed, 0)}
                    </Text>
                    <Text>
                        Total power: {cards.foldLeft((s, c) => s + c.powerstats.power, 0)}
                    </Text>
                    <Text>
                        Total combat: {cards.foldLeft((s, c) => s + c.powerstats.combat, 0)}
                    </Text>
                    <Text>
                        Total strength: {cards.foldLeft((s, c) => s + c.powerstats.strength, 0)}
                    </Text>
                    <Text>
                        Max height: {cards.foldLeft((s, c) => s > c.powerstats.height ? s : c.powerstats.height, 0)}
                    </Text>
                    <Text>
                        Total weight: {cards.foldLeft((s, c) => s + c.powerstats.weight , 0)}
                    </Text>
                </Box>
            </Box>

            <Box paddingLeft={paddingLeft} >
                <Text fontSize='2xl' >
                    Cards:
                </Text>

                <SimpleGrid columns={[3, 6, 10]} gap='2'>
                    { 
                        cards.map( card => 
                            <CardPreview card={card} onClick={() => redirect(`/cards/${card.id}`)} />
                        ).collection
                    }
                </SimpleGrid>
            </Box>
        </Stack>
    )
}
