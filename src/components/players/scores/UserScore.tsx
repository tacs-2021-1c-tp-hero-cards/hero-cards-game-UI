import { Box, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, Stack, StackDivider, 
        Text, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { AiIcon, UserIcon } from "../../miscellaneous/icons"


export type UserScore = {
    winCount: number,
    tieCount: number,
    loseCount: number,
    inProgressCount: number,
    totalPoint: number
}

export type ScoredUser = UserScore & {
    userName: string,
    userType: string
}

type PreviewProps = {
    score: ScoredUser
}
export function UserScorePreview({ score }: PreviewProps) {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const isAI = score.userType == 'IA'

    return (
        <Box>
            <Stack  padding='0.5rem' 
                    backgroundColor='gray.500' 
                    border='2px' 
                    borderColor='gray.600' 
                    borderRadius='0.5rem' 
                    fontSize='xl'
                    onClick={onOpen}>
                
                <Stack  padding='1.3rem' 
                        backgroundColor={isAI ? 'yellow.400' : 'orange.400'} 
                        border='2px' 
                        borderColor='gray.600' 
                        borderRadius='0.5rem' 
                        direction='row'
                        divider={<StackDivider />}>

                    <Text fontWeight='bold' width='3rem'>{score.totalPoint}</Text>
                    <Stack direction='row' spacing='1rem'>
                        {
                            isAI ? <AiIcon /> : <UserIcon />
                        }
                        <Text fontWeight='bold'>{score.userName}</Text>
                    </Stack>
                </Stack>
            </Stack>

            <Popover    isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose} >

                <PopoverContent padding='1rem' backgroundColor='lightblue' borderColor='gray.500'>
                    <PopoverArrow />
                    <PopoverCloseButton size='md' />
                    <PopoverHeader fontSize='2xl' fontWeight='bold'>
                        {score.userName}
                    </PopoverHeader>

                    <PopoverBody fontSize='xl'>
                        <Stack>
                            <Stack direction='row' spacing='4px'>
                                <Text>Total points earned:</Text>
                                <Text fontWeight='bold'>{score.totalPoint}</Text>
                            </Stack>
                            <Stack direction='row' spacing='4px'>
                                <Text>Matches won:</Text>
                                <Text fontWeight='bold'>{score.winCount}</Text>
                            </Stack>
                            <Stack direction='row' spacing='4px'>
                                <Text>Matches tied:</Text>
                                <Text fontWeight='bold'>{score.tieCount}</Text>
                            </Stack>
                            <Stack direction='row' spacing='4px'>
                                <Text>Matches lost:</Text>
                                <Text fontWeight='bold'>{score.loseCount}</Text>
                            </Stack>
                        </Stack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
    )
}