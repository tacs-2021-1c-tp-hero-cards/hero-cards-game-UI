import React from 'react'
import { Alert, AlertIcon, Box, Center, CircularProgress, Stack, StackDivider } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { RedirectProps, ToastProps, TokenProps, withRedirect, withToast, withTokenValidation } from '../commons/BehaviorAddOns'
import { MainHeader } from '../components/MainHeader'
import { ServerConnector } from '../BackendConnector'
import { useState } from 'react'
import { CardAttributes, CharacterDetails, CharacterInsights } from '../components/Card'

export function CardPage() { return( withRedirect({}) (withTokenValidation) (withToast) (CardContent) )}

type ShowCardProps = TokenProps & RedirectProps & ToastProps

export function CardContent({ renderWithTokenValidation, redirect, toast }: ShowCardProps) {
    let { characterId }: any = useParams()

    const [ character, setCharacter ] = useState<CharacterDetails>()
    const [ card, setCard ] = useState<CardAttributes>()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ searchingCharacter, setSearchingCharacter] = useState(false)

    if (!character && !searchingCharacter) {
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

            },
            (error) => {
                setSearchingCharacter(false)
                setIsLoading(false)
            }
        )
    }

    return renderWithTokenValidation(content)

    function content() {
        return (
            <Box>
                <Stack spacing='1px'>
                    <MainHeader searchCardsButton />

                    <Stack direction='row' spacing='1px'>
                        <Stack  bg='gray.300'
                                borderRadius='7px'
                                padding='4'
                                boxSize='full'
                                spacing='4'
                                divider={<StackDivider borderColor='gray.500' />}>

                            { isLoading ? 
                                <Center>
                                    <CircularProgress isIndeterminate color="green.300" />  
                                </Center> : 
                                
                                character ? 
                                    // FIXME: Mostrar detalles del personaje en vez de solo la carta
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