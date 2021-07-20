import React from "react"
import { Stack, Text } from "@chakra-ui/react"
import { denormalizeDifficulty } from "../../../BackendConnector"
import { AiIcon } from "../../miscellaneous/icons"

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
        <Stack  bgColor='gray.400' 
                border='2px'
                borderColor='gray.500'
                padding='1rem' 
                borderRadius='0.4rem'
                cursor='pointer'
                width='30rem'
                fontSize='xl'
                onClick={() => onClick(AI)}>

            <Stack  bgColor={getColor(AI.difficulty)} 
                    border='2px'
                    borderColor={getBorderColor(AI.difficulty)}
                    padding='1rem' 
                    borderRadius='0.4rem'>

                <Stack direction='row-reverse' spacing='1rem'>
                    <AiIcon />
                    <Stack boxSize='full' maxWidth='23rem'>
                        <Text fontWeight='bold' paddingLeft='1rem' fontSize='2xl' isTruncated>{AI.userName}</Text>
                        <Text paddingLeft='1rem' >Difficulty: {denormalizeDifficulty(AI.difficulty)}</Text>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

function getColor(difficulty: string) {
    switch (denormalizeDifficulty(difficulty)) {
        case 'easy':
            return 'green.400'
        case 'medium':
            return 'yellow.400'
        case 'hard':
            return 'red.500'
        case 'crazy':
            return 'purple.500'
        default:
            return 'gray.200'
    }
}

function getBorderColor(difficulty: string) {
    switch (denormalizeDifficulty(difficulty)) {
        case 'easy':
            return 'green.600'
        case 'medium':
            return 'yellow.600'
        case 'hard':
            return 'red.800'
        case 'crazy':
            return 'purple.800'
        default:
            return 'gray.500'
    }
}