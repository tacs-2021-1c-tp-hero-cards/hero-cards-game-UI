import React from "react"
import { Stack, Text } from "@chakra-ui/react"
import { denormalizeDifficulty } from "../BackendConnector"

export type AI = {
    id: string,
    userName: string,
    stats: string,
    difficulty: string,
    userType: string
}

export type AiData = {
    name: string,
    difficulty: string
}

type Props = {
    AI: AI,
    onClick: (_: AI) => void
}

export function AiPreview({ AI, onClick }: Props) {
    return (
        <Stack  bgColor='blue.300' 
                padding='1rem' 
                borderRadius='0.4rem'
                cursor='pointer'
                onClick={() => onClick(AI)}>
            <Text fontWeight='bold' paddingLeft='1rem' >{AI.userName}</Text>
            <Text fontWeight='bold' paddingLeft='1rem' >Difficulty: {denormalizeDifficulty(AI.difficulty)}</Text>
        </Stack>
    )
}