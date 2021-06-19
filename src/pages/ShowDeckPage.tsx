import React from 'react'
import { Alert, AlertIcon, Box, Button, Center, CircularProgress, Stack, StackDivider, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { RedirectProps, TokenProps, withRedirect, withTokenValidation } from '../commons/BehaviorAddOns'
import { MainHeader } from '../components/MainHeader'
import { ServerConnector } from '../BackendConnector'
import { DeckPreview, DeckData, DeckInsights } from '../components/Deck'
import { useState } from 'react'

export function ShowDeckPage() { return( withRedirect({}) (withTokenValidation) (ShowDeckContent) )}

type ShowDeckProps = TokenProps & RedirectProps

export function ShowDeckContent({ renderWithTokenValidation, redirect }: ShowDeckProps) {
    let { deckId }: any = useParams()

    const [ deck, setDeck ] = useState<DeckData>()
    const [ isLoading, setIsLoading ] = useState(true)

    if (!deck) {
            ServerConnector.getDeckById(
            deckId,
            (decks) => {
                setIsLoading(false)
                setDeck(decks[0])
            },
            (error) => setIsLoading(false)
        )
    }

    return renderWithTokenValidation(content)

    function content() {
        return (
            <Box>
                <Stack spacing='1px'>
                    <MainHeader />

                    <Stack direction='row' spacing='1px'>
                        <Stack  padding='4'
                                bg='gray.200'
                                borderRadius='7px'
                                minW='200px'
                                divider={<StackDivider borderColor='gray.500' />}>

                            <Button colorScheme="orange"
                                    variant="solid"
                                    textColor='gray.700'
                                    onClick={() => redirect('/user')}>
                                User page
                            </Button>

                            <Button colorScheme="orange"
                                    variant="solid"
                                    textColor='gray.700'
                                    onClick={() => redirect('/decks')}>
                                Manage decks
                            </Button>
                        </Stack>

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
                                
                                deck ? 
                                    <DeckInsights deck={deck} /> : 
                                    <Alert status="error">
                                        <AlertIcon />
                                        There was an error processing your request. Maybe the deck you were looking for doesn't exists.
                                    </Alert>
                            } 
                        </Stack>
                    </Stack>
                </Stack>

            </Box>
        )
    }
}