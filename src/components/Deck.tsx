import React from "react"
import { Box, Center, Stack, StackDivider, Text, Image } from "@chakra-ui/react"
import { CardAttributes } from "./Card"
import { Collection } from "../commons/Collections"


export type NewDeck = {
    deckName: string,
    cardIds: number[]
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

export function Deck( { data, onClick }: Props ) {
    const cards = Collection.wrap(data.cards)

    return (
        <Stack  bg='orange.600'
                padding='4px'
                borderRadius='5px' 
                border='2px' 
                borderColor='gray.600'
                width='210px'
                spacing='3px'
                onClick={onClick}
                divider={<StackDivider />} >

            <Stack direction='row' >
                <Box border='1px' borderColor='gray.500' borderRadius='full' bg='beige' width='2.2rem' >
                    <Center>{data.id}</Center>
                </Box>
                <Center boxSize='full' fontWeight='bold' fontSize='sm' isTruncated >{data.name}</Center>
            </Stack>

            <Box padding='5px'>
                <Center>
                    <Image src={cards.head().imageUrl} border='2px' borderColor='gray.400' objectFit='cover' height='250px' />
                </Center>
            </Box>

            <Stack bg='orange.100' borderRadius='2px' spacing='3px' border='2px' borderColor='orange.300'>

                <Stack spacing='1px' paddingRight='5px' paddingLeft='5px' fontSize='xs' >
                    <Stack direction='row-reverse' >
                        <Text>{cards.length}</Text>
                        <Center boxSize='full' >Cards</Center>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}