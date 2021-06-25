import React from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { MainHeader } from "../components/MainHeader";
import { CreateDeck } from "../components/CreateDeck";
import { StackDivider } from "@chakra-ui/react";
import { RedirectProps, TokenProps, withRedirect, withTokenValidation } from "../commons/BehaviorAddOns";
import { DeckData } from "../components/Deck";
import { DecksSearchBox } from "../components/DecksSearchBox"


export function DecksPage() { return( withTokenValidation({}) (withRedirect) (DecksContent) )}

type DecksProps = TokenProps & RedirectProps

export function DecksContent({ renderWithTokenValidation, redirect }: DecksProps) {

    // TODO: Agregar chequeo de autorización del usuario

    return( renderWithTokenValidation(content) )

    function content() {
        return(
            <Box>
                <Stack spacing='1px'>
                    <MainHeader userPageButton />

                    <Stack direction='row' spacing='1px'>

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

                            <DecksSearchBox onDeckClick={ (deck: DeckData) => redirect(`/decks/${deck.id}`) }/>
                        
                        </Stack>
                    </Stack>
                </Stack>

            </Box>
        )
    }

}