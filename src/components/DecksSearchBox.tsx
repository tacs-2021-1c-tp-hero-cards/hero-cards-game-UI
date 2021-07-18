import React, { useState } from "react";
import { Alert, AlertIcon, Box, Center, CircularProgress, Stack, Table, Tbody, Td, Tr, Text } from "@chakra-ui/react";
import { SubmitableInput } from "./SubmitableInput"
import { isNonEmpty } from "../commons/InputValidations"
import Collection from "../commons/Collections"
import { DeckData, DeckPreview } from "./Deck"
import { ServerConnector } from "../BackendConnector"


type Props = {
    fontSize?: string,
    onDeckClick: (_: DeckData) => void,
    hideCardsTooltip?: boolean
}

export function DecksSearchBox({ fontSize, onDeckClick, hideCardsTooltip }: Props) {

    const [ decks, setDecks ] = useState(Collection.empty<DeckData>())
    const [ isLoading, setIsLoading ] = useState(false)
    const [ searchByNameIsLoading, setSearchByNameIsLoading ] = useState(false)
    const [ searchByIdIsLoading, setSearchByIdIsLoading ] = useState(false)
    const [ searchInitiated, setSearchInitiated ] = useState(false)
    const [ deckError, setDeckError ] = useState(false)

    return (
        <Stack spacing='3.5'>
            <Text fontWeight='bold' fontSize='2xl'>Search decks</Text>
            
            <Box paddingLeft='3'>
                <SubmitableInput    id='searchDecksByName' 
                                    placeHolder='Please enter deck name' 
                                    buttonLabel='Search'
                                    label='Search by name'
                                    fontSize={fontSize} 
                                    isValid={isNonEmpty}
                                    onSubmit={searchDecksByName}
                                    isLoading={searchByNameIsLoading} />
            </Box>

            <Box paddingLeft='3'>
                <SubmitableInput    id='searchDeckById' 
                                    placeHolder='Please enter deck id' 
                                    buttonLabel='Search'
                                    label='Search by id' 
                                    fontSize={fontSize} 
                                    isValid={isNonEmpty}
                                    onSubmit={searchDeckById}
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
                            <Text fontSize={fontSize ?? 'xl'}>There was an error processing your request</Text>
                        </Alert> :
                            
                            decks.isEmpty() ? 
                            
                                <Text fontSize={fontSize ?? 'xl'}>No decks to show</Text> : 
                                
                                <Table variant='striped' colorScheme='blue'> 
                                    <Tbody>
                                        { 
                                            decks.map( deck => 
                                                <Tr key={deck.id}>
                                                    <Td borderRadius='1rem'>
                                                        <DeckPreview key={deck.id} data={deck} onClick={() => onDeckClick(deck)} hideCardsTooltip={hideCardsTooltip}/>
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
