import React from 'react'
import { Alert, AlertIcon, Box, Center, CircularProgress, Stack, StackDivider } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { MainHeader } from '../components/MainHeader'
import { ServerConnector } from '../BackendConnector'
import { useState } from 'react'
import { CardAttributes, CharacterDetails, CharacterInsights } from '../components/cards/Card'
import { ConditionalRenderSupportProps, withRenderCondition } from '../commons/BehaviorAddOns'

export default function CardPage() { return withRenderCondition({}) (CardContent) }

type ShowCardProps = ConditionalRenderSupportProps

export function CardContent({ renderOnCondition }: ShowCardProps) {
    let { characterId }: any = useParams()

    const [ character, setCharacter ] = useState<CharacterDetails>()
    const [ card, setCard ] = useState<CardAttributes>()
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ searchingCharacter, setSearchingCharacter] = useState<boolean>(false)
    const [ error, setError ] = useState<boolean>(false)

    if (!error && !character && !searchingCharacter) {
        setSearchingCharacter(true)

        ServerConnector.getCharacterDetails(
            characterId,
            (characterData) => {
                setCharacter(characterData)
                setSearchingCharacter(false)
                setIsLoading(false)

                ServerConnector.getCardById(
                    characterId,
                    setCard,
                    (error) => setCard(
                        {
                            id: characterId,
                            name: characterData.name,
                            powerstats: {
                                height: -1,
                                weight: -1,
                                intelligence: -1, 
                                speed: -1, 
                                power: -1, 
                                combat: -1, 
                                strength: -1
                            },
                            imageUrl: ''
                        }
                    )
                )

                setError(false)
            },
            (error) => {
                setSearchingCharacter(false)
                setIsLoading(false)
                setError(true)
            }
        )
    }

    let shouldRender = !error && (isLoading || character)

    return renderOnCondition(!!shouldRender, content)

    function content() {
        return (
            <Box>
                <Stack spacing='1px'>
                    <MainHeader showBanner />

                    <Stack direction='row' spacing='1px'>
                        <Stack  bg='gray.300'
                                borderRadius='7px'
                                padding='4'
                                boxSize='full'
                                spacing='4'
                                divider={<StackDivider borderColor='gray.500' />}>

                            { isLoading ? 
                                <Stack spacing='2rem'>
                                    <Center fontSize='2xl'>Searching character data...</Center>
                                    <Center>
                                        <CircularProgress isIndeterminate color="green.300" />  
                                    </Center>
                                </Stack> : 
                                
                                character ? 
                                    <CharacterInsights character={character} card={card} /> : 
                                    <Alert status="error">
                                        <AlertIcon />
                                        There was an error processing your request. Maybe the card you are looking for doesn't exists.
                                    </Alert>
                            } 
                        </Stack>
                    </Stack>
                </Stack>

            </Box>
        )
    }
}