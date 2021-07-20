import React from 'react'
import { Alert, AlertIcon, Box, Center, CircularProgress, Stack, StackDivider } from '@chakra-ui/react'
import { AdminSupportProps, TokenProps, withAdminValidation, withTokenValidation} from '../commons/BehaviorAddOns'
import { MainHeader } from '../components/MainHeader'
import { ServerConnector } from '../BackendConnector'
import { useState } from 'react'
import { ScoredUser } from '../components/players/scores/UserScore'
import Scoreboard from '../components/players/scores/Scoreboard'

export default function ScoreboardPage() { return( withTokenValidation({}) (withAdminValidation) (ScoreboardContent) )}

type ScoreboardProps = TokenProps & AdminSupportProps

export function ScoreboardContent({ renderWithTokenValidation, renderWithAdminValidation }: ScoreboardProps) {
    const [ scoreboard, setScoreboard ] = useState<ScoredUser[]>()
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ error, setError ] = useState<boolean>(false)

    let searchingScores = false

    if (!scoreboard && !searchingScores) {
        searchingScores = true

        ServerConnector.getScoreboard(
            (scores) => {
                searchingScores = false
                setIsLoading(false)
                setScoreboard(scores)
                setError(false)
            },
            (error) => {
                searchingScores = false
                setIsLoading(false)
                setError(true)
            }
        )
    }

    return renderWithTokenValidation(() => renderWithAdminValidation(content))

    function content() {
        return (
            <Box>
                <Stack spacing='1px'>
                    <MainHeader />

                    <Stack  bg='gray.300'
                            borderRadius='7px'
                            padding='4'
                            boxSize='full'
                            spacing='4'
                            fontSize='xl'
                            divider={<StackDivider borderColor='gray.500' />}>

                        { isLoading ? 
                            <Stack spacing='2rem'>
                                <Center fontSize='2xl'>Searching scoreboard...</Center>
                                <Center>
                                    <CircularProgress isIndeterminate color="red.400" />  
                                </Center>
                            </Stack> : 

                            error ? 
                                <Alert status="error">
                                    <AlertIcon />
                                    There was an error processing your request.
                                </Alert> :
                                
                                scoreboard ? 
                                    <Stack direction='row'>
                                        <Scoreboard data={scoreboard} />
                                    </Stack> : 
                                    <Alert status="error">
                                        <AlertIcon />
                                        There was an error processing your request.
                                    </Alert>
                        } 
                    </Stack>
                </Stack>
            </Box>
        )
    }
}


