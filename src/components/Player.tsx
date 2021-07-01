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
            <Text fontWeight='bold' paddingLeft='1rem' >{player.username}</Text>
        </Stack>
    )
}
