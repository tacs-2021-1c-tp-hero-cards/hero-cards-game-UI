import React from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { MainHeader } from "../components/MainHeader";
import { Alert, AlertIcon, Center, CircularProgress, SimpleGrid, StackDivider } from "@chakra-ui/react";
import { RedirectProps, withRedirect } from "../commons/BehaviorAddOns";
import { DeckData } from "../components/Deck";
import { ServerConnector } from "../BackendConnector";
import Collection from "../commons/Collections";
import { useState } from "react";
import { SubmitableInput } from "../components/SubmitableInput";
import { isNonEmpty } from "../commons/InputValidations";
import { CardPreview } from "../components/Card";


export default function CardsPage() { return( withRedirect({}) (CardsContent) )}

type CardsProps = RedirectProps

export function CardsContent({ redirect }: CardsProps) {

    const [ cards, setCards ] = useState(Collection.empty<DeckData>())
    const [ isLoading, setIsLoading ] = useState(false)
    const [ searchByNameIsLoading, setSearchByNameIsLoading ] = useState(false)
    const [ searchByIdIsLoading, setSearchByIdIsLoading ] = useState(false)
    const [ searchInitiated, setSearchInitiated ] = useState(false)
    const [ cardError, setCardError ] = useState(false)

    return content()

    function content() {
        return(
            <Box>
                <Stack spacing='1px'>
                    <MainHeader hideCardsButton />

                    <Stack direction='row' spacing='1px'>
                        <Stack  bg='gray.300'
                                borderRadius='7px'
                                padding='4'
                                boxSize='full'
                                spacing='4'
                                divider={<StackDivider borderColor='gray.500' />}>

                            <Stack spacing='3.5'>
                                <Text fontWeight='bold' fontSize='xl'>Search cards</Text>
                                
                                <Box paddingLeft='3'>
                                    <SubmitableInput    id='searchCardsByName' 
                                                        placeHolder='Please enter card name' 
                                                        buttonLabel='Search'
                                                        label='Search by name' 
                                                        isValid={isNonEmpty}
                                                        onSubmit={searchCardsByName}
                                                        isLoading={searchByNameIsLoading} />
                                </Box>

                                <Box paddingLeft='3'>
                                    <SubmitableInput    id='searchCardById' 
                                                        placeHolder='Please enter card id' 
                                                        buttonLabel='Search'
                                                        label='Search by id' 
                                                        isValid={isNonEmpty}
                                                        onSubmit={searchCardById}
                                                        isLoading={searchByIdIsLoading} />
                                </Box>

                                {searchInitiated ?  renderCards() : <></>}
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        )
    }

    function searchCardsByName(cardName: string) {
        setSearchByNameIsLoading(true)
        setIsLoading(true)
        setSearchInitiated(true)

        ServerConnector.getCardByName(
            cardName,
            (cards) => {
                setSearchByNameIsLoading(false)
                setIsLoading(false)
                setCardError(false)
                setCards(Collection.wrap(cards))
            },
            (error) => {
                setSearchByNameIsLoading(false)
                setIsLoading(false)
                setCardError(true)
                setCards(Collection.empty())
            }
        )
    }
    
    function searchCardById(cardId: string) {
        setSearchByIdIsLoading(true)
        setIsLoading(true)
        setSearchInitiated(true)

        ServerConnector.getCardById(
            cardId,
            (cards) => {
                setSearchByIdIsLoading(false)
                setIsLoading(false)
                setCardError(false)
                setCards(Collection.from(cards))
            },
            (error) => {
                setSearchByIdIsLoading(false)
                setIsLoading(false)
                setCardError(true)
                setCards(Collection.empty())
            }
        )
    }

    function renderCards() {

        return (
                                                    
            <Stack paddingLeft='3'>

                {
                    isLoading ? 
                                                    
                        <Center>
                            <CircularProgress isIndeterminate color="green.300" />  
                        </Center> :
                        
                        cardError ? 

                        <Alert status="error">
                            <AlertIcon />
                            There was an error processing your request.
                        </Alert> :
                            
                            cards.isEmpty() ? 
                            
                                <Text>No cards to show</Text> : 
                                
                                    <SimpleGrid spacing='10px' minChildWidth='12rem' >
                                        { 
                                            cards.map( card => 
                                                        <CardPreview    key={card.id} 
                                                                        card={card} 
                                                                        height='20rem' 
                                                                        width='12rem' 
                                                                        onClick={() => redirect(`/characters/${card.id}`)} />
                                            ).collection
                                        } 
                                    </SimpleGrid>
                }
            </Stack>
        )
    }
}