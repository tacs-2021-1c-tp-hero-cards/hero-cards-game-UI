import React from 'react'
import { Alert, AlertIcon, Box, Center, CircularProgress, Stack, StackDivider } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { RedirectProps, ToastProps, TokenProps, withRedirect, withToast, withTokenValidation } from '../commons/BehaviorAddOns'
import { MainHeader } from '../components/MainHeader'
import { ServerConnector } from '../BackendConnector'
import { useState } from 'react'
import { Card, CardAttributes } from '../components/Card'

export function ShowCardPage() { return( withRedirect({}) (withTokenValidation) (withToast) (ShowCardContent) )}

type ShowCardProps = TokenProps & RedirectProps & ToastProps

export function ShowCardContent({ renderWithTokenValidation, redirect, toast }: ShowCardProps) {
    let { cardId }: any = useParams()

    const [ card, setCard ] = useState<CardAttributes>()
    const [ isLoading, setIsLoading ] = useState(true)
    let searchingCard = false

    if (!card && !searchingCard) {
        searchingCard = true

        ServerConnector.getCardById(
            cardId,
            (card) => {
                searchingCard = false
                setIsLoading(false)
                setCard(card)
            },
            (error) => {
                searchingCard = false
                setIsLoading(false)
            }
        )
    }

    return renderWithTokenValidation(content)

    function content() {
        return (
            <Box>
                <Stack spacing='1px'>
                    <MainHeader userPageButton searchCardsButton />

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
                                
                                card ? 
                                    // FIXME: Mostrar detalles del personaje en vez de solo la carta
                                    <Card attributes={card} /> : 
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