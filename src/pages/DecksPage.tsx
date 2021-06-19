import React from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { MainHeader } from "../components/MainHeader";
import { CreateDeck } from "../components/CreateDeck";
import { Alert, AlertIcon, Button, Center, CircularProgress, SimpleGrid, StackDivider, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import { RedirectProps, ToastProps, TokenProps, withRedirect, withToast, withTokenValidation } from "../commons/BehaviorAddOns";
import { DeckData, DeckPreview } from "../components/Deck";
import { ServerConnector } from "../BackendConnector";
import { Collection } from "../commons/Collections";
import { useState } from "react";
import { SubmitableInput } from "../components/SubmitableInput";
import { isNonEmpty } from "../commons/InputValidations";


export function DecksPage() { return( withToast({}) (withTokenValidation) (withRedirect) (DecksContent) )}

type DecksProps = ToastProps & TokenProps & RedirectProps

export function DecksContent({ toast, renderWithTokenValidation, redirect }: DecksProps) {

    const [ decks, setDecks ] = useState(Collection.empty<DeckData>())
    const [ isLoading, setIsLoading ] = useState(false)
    const [ searchByNameIsLoading, setSearchByNameIsLoading ] = useState(false)
    const [ searchByIdIsLoading, setSearchByIdIsLoading ] = useState(false)
    const [ searchInitiated, setSearchInitiated ] = useState(false)
    const [ deckError, setDeckError ] = useState(false)

    // TODO: Agregar chequeo de autorización del usuario

    return( renderWithTokenValidation(content) )

    function content() {
        return(
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
                        </Stack>

                        { mainContent() }
                    </Stack>
                </Stack>

            </Box>
        )
    }

    function mainContent() {
        return (
            <Stack  bg='gray.300'
                    borderRadius='7px'
                    padding='4'
                    boxSize='full'
                    spacing='4'
                    divider={<StackDivider borderColor='gray.500' />}>

                <Stack spacing='3.5'>
                    <Text fontWeight='bold' fontSize='xl'>Create deck</Text>

                    <Text fontSize='md' paddingLeft='3'>
                        If you want to create a new deck, by selecting the cards it will contain,
                        then click the button below
                    </Text>
                    
                    <Box paddingLeft='3'>
                        <CreateDeck  alignSelf='left' />
                    </Box>
                </Stack>

                {searchDeckContent()}
            
            </Stack>
        )
    }

    function searchDeckContent() {
        return (
            <Stack spacing='3.5'>
                <Text fontWeight='bold' fontSize='xl'>Search existent decks</Text>
                
                <Box paddingLeft='3'>
                    <SubmitableInput    id='searchDecksByName' 
                                        placeHolder='Please enter deck name' 
                                        buttonLabel='Search'
                                        label='Search deck by name' 
                                        isValid={isNonEmpty}
                                        onClick={searchDecksByName}
                                        isLoading={searchByNameIsLoading} />
                </Box>

                <Box paddingLeft='3'>
                    <SubmitableInput    id='searchDeckById' 
                                        placeHolder='Please enter deck id' 
                                        buttonLabel='Search'
                                        label='Search deck by id' 
                                        isValid={isNonEmpty}
                                        onClick={searchDeckById}
                                        isLoading={searchByIdIsLoading} />
                </Box>

                {searchInitiated ?  renderDecks() : <></>}
            </Stack>
        )
    }

    function searchDecksByName(deckName: string) {
        setSearchByNameIsLoading(true)
        setIsLoading(true)
        setSearchInitiated(true)

        ServerConnector.getDeckByName(
            deckName,
            (decks) => {
                setSearchByNameIsLoading(false)
                setIsLoading(false)
                setDeckError(false)
                setDecks(Collection.wrap(decks))
            },
            (error) => {
                setSearchByNameIsLoading(false)
                setIsLoading(false)
                setDeckError(true)
                setDecks(Collection.empty())
            }
        )
    }
    
    function searchDeckById(deckId: string) {
        setSearchByIdIsLoading(true)
        setIsLoading(true)
        setSearchInitiated(true)

        ServerConnector.getDeckById(
            deckId,
            (decks) => {
                setSearchByIdIsLoading(false)
                setIsLoading(false)
                setDeckError(false)
                setDecks(Collection.wrap(decks))
            },
            (error) => {
                setSearchByIdIsLoading(false)
                setIsLoading(false)
                setDeckError(true)
                setDecks(Collection.empty())
            }
        )
    }

    function renderDecks() {

        return (
                                                    
            <Stack paddingLeft='3'>

                {
                    isLoading ? 
                                                    
                        <Center>
                            <CircularProgress isIndeterminate color="green.300" />  
                        </Center> :
                        
                        deckError ? 

                        <Alert status="error">
                            <AlertIcon />
                            There was an error processing your request
                        </Alert> :
                            
                            decks.isEmpty() ? 
                            
                                <Text>No decks to show</Text> : 
                                
                                <Table variant='striped' colorScheme='blue'> 
                                    <Tbody>
                                        { 
                                            decks.map( deck => 
                                                <Tr>
                                                    <Td borderRadius='1rem'>
                                                        <DeckPreview key={deck.id} data={deck} onClick={() => redirect(`/decks/${deck.id}`)} />
                                                    </Td>
                                                </Tr>
                                            ).collection
                                        } 
                                    </Tbody>
                                </Table>
                }
            </Stack>
        )
    }
}