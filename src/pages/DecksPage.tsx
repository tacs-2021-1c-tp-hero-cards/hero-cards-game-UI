import React from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { MainHeader } from "../components/MainHeader";
import { CreateDeck } from "../components/decks/CreateDeck";
import { Button, ButtonGroup, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, StackDivider, useDisclosure } from "@chakra-ui/react";
import { AdminSupportProps, RedirectProps, TokenProps, withAdminValidation, withRedirect, withTokenValidation } from "../commons/BehaviorAddOns";
import { DeckData } from "../components/decks/Deck";
import { DecksSearchBox } from "../components/decks/DecksSearchBox"
import { RootState } from "../store/Store";
import { useGetState } from "../store/hooks";
import { User } from "../components/players/User";
import { ModifyDeck } from "../components/decks/ModifyDeck";
import { ManageIcon } from "../components/miscellaneous/icons";
import { AddIcon } from "@chakra-ui/icons";


export default function DecksPage() { return( withRedirect({}) (withTokenValidation) (withAdminValidation) (DecksContent) )}

type DecksProps = RedirectProps & TokenProps & AdminSupportProps

export function DecksContent({ redirect, renderWithTokenValidation, renderWithAdminValidation }: DecksProps) {

    const user: User = useGetState(state => state.user)
    const isAdmin = user.admin

    return user && isAdmin ? renderWithTokenValidation(() => renderWithAdminValidation(adminContent)) : commonContent()

    function adminContent() {
        return(
            <Box>
                <Stack spacing='1px'>
                    <MainHeader hideDecksButton />

                    <Stack direction='row' spacing='1px'>

                        <Stack  bg='gray.300'
                                borderRadius='7px'
                                padding='4'
                                boxSize='full'
                                spacing='4'
                                paddingBottom='10rem'
                                divider={<StackDivider borderColor='gray.500' />}>

                        <Stack direction='row-reverse'>
                            <AdminActions />
                            <Stack boxSize='full'>
                                <DecksSearchBox onDeckClick={ (deck: DeckData) => redirect(`/decks/${deck.id}`) }/>
                            </Stack>
                        </Stack>
                        
                        </Stack>
                    </Stack>
                </Stack>

            </Box>
        )
    }

    function commonContent() {
        return(
            <Box>
                <Stack spacing='1px'>
                    <MainHeader hideDecksButton showBanner />

                    <Stack direction='row' spacing='1px'>

                        <Stack  bg='gray.300'
                                borderRadius='7px'
                                padding='4'
                                boxSize='full'>

                            <DecksSearchBox onDeckClick={ (deck: DeckData) => redirect(`/decks/${deck.id}`) }/>
                        
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
                        <IconButton aria-label='Admin actions' size='lg' icon={<AddIcon boxSize='3rem' padding='0.2rem' color='gray.100'/>} variant='solid' colorScheme='green'/>
                    </PopoverTrigger>
                    <PopoverContent padding='1rem'>
                        <PopoverArrow />
                        <PopoverCloseButton size='md' />
                        <PopoverHeader fontSize='2xl' fontWeight='bold'>
                            Create deck
                        </PopoverHeader>

                        <PopoverBody fontSize='xl'>
                            Here you can create a new deck, by choosing a name and selecting it's cards.
                        </PopoverBody>
                        <PopoverFooter  border="0"
                                        d="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        pb='1rem'>

                            <ButtonGroup size="sm">
                                <Button variant='solid' size='md' fontSize='xl' onClick={onClose}>Cancel</Button>
                                <CreateDeck alignSelf='center' buttonSize='md' fontSize='xl'/>
                            </ButtonGroup>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>
            </Box>
        )
    }
}