import React from 'react'
import { Alert, AlertIcon, Box, Button, Center, CircularProgress, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, 
    ModalHeader, ModalOverlay, Stack, StackDivider, Text, useDisclosure } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { RedirectProps, ToastProps, withRedirect, withToast } from '../commons/BehaviorAddOns'
import { MainHeader } from '../components/MainHeader'
import { ServerConnector } from '../BackendConnector'
import { DeckData, DeckInsights } from '../components/Deck'
import { useState } from 'react'
import { ModifyDeck } from '../components/ModifyDeck'
import { WarningIcon } from '@chakra-ui/icons'
import { SubmitDataErrorToast } from '../commons/Toast'
import { DeleteIcon } from '../components/icons'

export default function DeckPage() { return( withRedirect({}) (withToast) (DeckContent) )}

type ShowDeckProps = RedirectProps & ToastProps

export function DeckContent({ redirect, toast }: ShowDeckProps) {
    let { deckId }: any = useParams()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [ deck, setDeck ] = useState<DeckData>()
    const [ isLoading, setIsLoading ] = useState(true)
    let searchingDeck = false

    if (!deck && !searchingDeck) {
        searchingDeck = true

        ServerConnector.getDeckById(
            deckId,
            (decks) => {
                searchingDeck = false
                setIsLoading(false)
                setDeck(decks[0])
            },
            (error) => {
                searchingDeck = false
                setIsLoading(false)
            }
        )
    }

    function deleteDeck() {
        ServerConnector.deleteDeck(
            deckId,
            () => redirect('/decks'),
            (_) => toast(SubmitDataErrorToast)
        )
    }

    return content()

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

                            <Box height='4rem'/>

                            { deck ? 
                                <Stack>
                                    <ModifyDeck alignSelf='center' deck={deck} buttonWidth='10.5rem'/> 

                                    <Stack>
                                        <Button colorScheme="red"
                                                leftIcon={<DeleteIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                width='10.5rem'
                                                onClick={onOpen}>
                                            Delete 
                                        </Button>

                                        <Modal isOpen={isOpen} onClose={onClose} >
                                            <ModalOverlay />
                                            <ModalContent borderRadius='0.5rem'>
                                                <ModalHeader backgroundColor='red' borderTopRadius='0.5rem'>Delete deck</ModalHeader>
                                                <ModalCloseButton size='lg'/>
                                                <ModalBody>
                                                    <Stack>
                                                        <Text fontSize='xl'><WarningIcon color='crimson'/> ¡Warning!</Text>

                                                        <Text>¿Are you sure you wan't to delete this deck?</Text>
                                                        <Text>This action can't be undone...</Text>
                                                    </Stack>
                                                </ModalBody>

                                                <ModalFooter>
                                                    <Button mr={3} onClick={onClose}>
                                                        Cancel
                                                    </Button>
                                                    <Button colorScheme="red" onClick={deleteDeck}>
                                                        Delete deck
                                                    </Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    </Stack>
                                    
                                </Stack> : 
                                <></> 
                            }

                        </Stack>

                        <Stack  bg='gray.300'
                                borderRadius='7px'
                                padding='4'
                                boxSize='full'
                                spacing='4'
                                divider={<StackDivider borderColor='gray.500' />}>

                            { isLoading ? 
                                <Stack spacing='2rem'>
                                    <Center fontSize='2xl'>Searching deck data...</Center>
                                    <Center>
                                        <CircularProgress isIndeterminate color="green.300" />  
                                    </Center>
                                </Stack> : 
                                
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