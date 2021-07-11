import React, { useState } from "react";
import { Alert, AlertIcon, Box, Center, CircularProgress, Stack, Table, Tbody, Td, Tr, Text } from "@chakra-ui/react";
import { SubmitableInput } from "./SubmitableInput"
import { isNonEmpty } from "../commons/InputValidations"
import { Collection } from "../commons/Collections"
import { DeckData, DeckPreview } from "./Deck"
import { ServerConnector } from "../BackendConnector"


type Props = {
    onDeckClick: (_: DeckData) => void
}

export function DecksSearchBox({ onDeckClick }: Props) {

    const [ decks, setDecks ] = useState(Collection.empty<DeckData>())
    const [ isLoading, setIsLoading ] = useState(false)
    const [ searchByNameIsLoading, setSearchByNameIsLoading ] = useState(false)
    const [ searchByIdIsLoading, setSearchByIdIsLoading ] = useState(false)
    const [ searchInitiated, setSearchInitiated ] = useState(false)
    const [ deckError, setDeckError ] = useState(false)

    return (
        <Stack spacing='3.5'>
            <Text fontWeight='bold' fontSize='xl'>Search decks</Text>
            
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
                                                <Tr key={deck.id}>
                                                    <Td borderRadius='1rem'>
                                                        <DeckPreview key={deck.id} data={deck} onClick={() => onDeckClick(deck)} />
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
