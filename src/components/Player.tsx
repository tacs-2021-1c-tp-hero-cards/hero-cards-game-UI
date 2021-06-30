import React from "react"
import { Stack, StackDivider, Text } from "@chakra-ui/react"
import { Collection } from "../commons/Collections"

export type Player = {
    username: string
}

type Props = {
    player: Player,
    onClick: (_: Player) => void
}

export function PlayerPreview({ player, onClick }: Props) {
    return (
        <Stack  bgColor='blue.300' 
                padding='1rem' 
                borderRadius='0.4rem'
                cursor='pointer'
                onClick={() => onClick(player)}>
            <Text>{titles.random()}</Text>
            <Text fontWeight='bold' paddingLeft='2rem' >{player.username}</Text>
        </Stack>
    )
}

const titles = Collection.from(
    'The mighty',
    'The great',
    'The beast',
    'The unforgiven',
    'The relentless',
    'The restless'
)