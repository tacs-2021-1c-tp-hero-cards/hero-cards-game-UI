import React from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { MainHeader } from "../components/MainHeader";
import { CreateDeck } from "../components/CreateDeck";
import { Button, Center, StackDivider } from "@chakra-ui/react";
import { ToastProps, TokenProps, withToast, withTokenValidation } from "../commons/BehaviorAddOns";


export function DecksPage() { return( withToast({}) (withTokenValidation) (DecksContent) )}

type DecksProps = ToastProps & TokenProps

export function DecksContent({ toast, renderWithTokenValidation }: DecksProps) {

    // TODO: Agregar chequeo de autorización del usuario

    return( renderWithTokenValidation(content) )

    function content() {
        return(
            <Box>
                <Stack spacing='1px'>
                    <MainHeader />

                    <Stack direction='row' spacing='1px'>
                        <Stack  bg='gray.200'
                                borderRadius='7px'
                                padding='4'
                                divider={<StackDivider borderColor='gray.500' />}>

                            <Text fontWeight='bold'>side bar</Text>
                        </Stack>

                        <Stack  bg='gray.300'
                                borderRadius='7px'
                                padding='4'
                                boxSize='full'
                                divider={<StackDivider borderColor='gray.500' />}>

                            <Stack>
                                <Center fontWeight='bold' fontSize='xl'>Create deck</Center>

                                <Center fontSize='md' textAlign='center'>
                                    If you want to create a new deck, by selecting the cards it will contain,
                                    then click the button below
                                </Center>
                                
                                <CreateDeck  alignSelf='center' />
                            </Stack>

                            <Stack>
                                <Center fontWeight='bold' fontSize='xl'>Modify deck</Center>
                                
                                <Center fontSize='md' textAlign='center'>
                                    If you want to modify an existing deck, by changing it's name or cards,
                                    then click the button below
                                </Center>

                                <Button alignSelf='center' colorScheme='orange' onClick={() => toast({
                                                                                                title: `Modify Deck`,
                                                                                                status: 'warning',
                                                                                                isClosable: true,
                                                                                                description: 'Still in progress'
                                                                                            })}>
                                    Modify
                                </Button>
                            </Stack>

                            <Stack>
                                <Center fontWeight='bold' fontSize='xl'>Remove deck</Center>

                                <Center fontSize='md' textAlign='center'>
                                    <Text>If what you want is to remove a deck from the game, then click the button below.
                                        <Text fontWeight='bold'>
                                            Beware, this action cannot be undone and won't remove the cards 
                                            from the game.
                                        </Text> 
                                    </Text>
                                </Center>

                                <Button alignSelf='center' colorScheme='red' onClick={() => toast({
                                                                                                title: `Remove Deck`,
                                                                                                status: 'warning',
                                                                                                isClosable: true,
                                                                                                description: 'Still in progress'
                                                                                            })}>
                                    Remove
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>

            </Box>
        )
    }
}