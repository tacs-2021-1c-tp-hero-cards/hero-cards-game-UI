import React from 'react'
import { Alert, AlertIcon, Box, Button, ButtonGroup, Center, CircularProgress, IconButton, Modal, ModalBody, ModalCloseButton, 
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, 
    PopoverFooter, PopoverHeader, PopoverTrigger, Stack, StackDivider, Text, useDisclosure } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { ConditionalRenderSupportProps, RedirectProps, ToastProps, withRedirect, withRenderCondition, 
        withToast } from '../commons/BehaviorAddOns'
import { MainHeader } from '../components/MainHeader'
import { ServerConnector } from '../BackendConnector'
import { DeckData, DeckInsights } from '../components/Deck'
import { useState } from 'react'
import { ModifyDeck } from '../components/ModifyDeck'
import { WarningIcon } from '@chakra-ui/icons'
import { SubmitDataErrorToast } from '../commons/Toast'
import { DeleteIcon, ManageIcon } from '../components/icons'
import { User } from '../components/User'
import { useGetState } from '../store/hooks'

export default function DeckPage() { return( withRedirect({}) (withToast) (withRenderCondition) (DeckContent) )}

type ShowDeckProps = RedirectProps & ToastProps & ConditionalRenderSupportProps

export function DeckContent({ redirect, toast, renderOnCondition }: ShowDeckProps) {
    let { deckId }: any = useParams()

    const [ deck, setDeck ] = useState<DeckData>()
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ error, setError ] = useState<boolean>(false)

    let searchingDeck = false

    if (!deck && !searchingDeck) {
        searchingDeck = true

        ServerConnector.getDeckById(
            deckId,
            (decks) => {
                searchingDeck = false
                setIsLoading(false)
                setDeck(decks[0])
                setError(false)
            },
            (error) => {
                searchingDeck = false
                setIsLoading(false)
                setError(true)
            }
        )
    }

    const user: User = useGetState(state => state.user)
    const isAdmin = user.admin

    let shouldRender = !error && (isLoading || deck)

    return renderOnCondition(!!shouldRender, content)

    function content() {
        return (
            <Box>
                <Stack spacing='1px'>
                    <MainHeader showBanner />

                    <Stack direction='row-reverse' spacing='1px'>
                        
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
                                    <Stack direction='row'>
                                        <DeckInsights deck={deck} />
                                        { isAdmin ? <AdminActions /> : <></> }
                                    </Stack> : 
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

    function AdminActions() {
        const { onOpen, onClose, isOpen } = useDisclosure()

        return (
            <Box>
                <Popover    isOpen={isOpen}
                            onOpen={onOpen}
                            onClose={onClose}
                            placement="left-start" >
                    <PopoverTrigger>
                        <IconButton aria-label='Admin actions' size='lg' icon={<ManageIcon />} variant='ghost'/>
                    </PopoverTrigger>
                    <PopoverContent padding='1rem'>
                        <PopoverArrow />
                        <PopoverCloseButton size='md' />
                        <PopoverHeader fontSize='2xl' fontWeight='bold'>
                            Manage deck
                        </PopoverHeader>

                        <PopoverBody fontSize='xl'>
                            Edit decks cards or change it's name. Or you can also delete it from the game.
                        </PopoverBody>
                        <PopoverFooter  border="0"
                                        d="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        pb='1rem'>

                            <ButtonGroup size="sm">
                                <ModifyDeck alignSelf='center' deck={deck!} buttonSize='md' fontSize='xl'/>
                                <DeleteDeck />
                            </ButtonGroup>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>
            </Box>
        )
    }

    function deleteDeck() {
        ServerConnector.deleteDeck(
            deckId,
            () => redirect('/decks'),
            (_) => toast(SubmitDataErrorToast)
        )
    }

    function DeleteDeck() {
        const { onOpen, onClose, isOpen } = useDisclosure()

        return (
            <Stack>
                <Button colorScheme="red"
                        leftIcon={<DeleteIcon />}
                        variant="solid"
                        textColor='gray.700'
                        onClick={onOpen}
                        size='md'
                        fontSize='xl'>
                    Delete 
                </Button>

                <Modal isOpen={isOpen} onClose={onClose} >
                    <ModalOverlay />
                    <ModalContent borderRadius='0.5rem'>
                        <ModalHeader backgroundColor='red' borderTopRadius='0.5rem' fontSize='2xl'>Delete deck</ModalHeader>
                        <ModalCloseButton size='lg'/>
                        <ModalBody>
                            <Stack fontSize='xl'>
                                <Text fontSize='2xl'><WarningIcon color='crimson'/> ¡Warning!</Text>

                                <Text>¿Are you sure you wan't to delete this deck?</Text>
                                <Text>This action can't be undone...</Text>
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} onClick={onClose} fontSize='xl' size='md'>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={deleteDeck} fontSize='xl' size='md'>
                                Delete deck
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Stack>
        )
    }
}


