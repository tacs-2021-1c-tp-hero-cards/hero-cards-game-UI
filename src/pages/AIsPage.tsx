import React from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { MainHeader } from "../components/MainHeader";
import { CreateBot } from "../components/players/bots/CreateBot";
import { Button, ButtonGroup, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, StackDivider, useDisclosure } from "@chakra-ui/react";
import { AdminSupportProps, TokenProps, withAdminValidation, withTokenValidation } from "../commons/BehaviorAddOns";
import { UsersSearchBox } from "../components/players/UserSearchBox";
import { AddIcon } from "@chakra-ui/icons";
import { CreateDeck } from "../components/decks/CreateDeck";


export default function BotsPage() { return( withTokenValidation({}) (withAdminValidation) (BotsContent) )}

type DecksProps = TokenProps & AdminSupportProps

function BotsContent({ renderWithTokenValidation, renderWithAdminValidation }: DecksProps) {

    return( renderWithTokenValidation(() => renderWithAdminValidation(content)))

    function content() {
        return(
            <Box>
                <Stack spacing='1px'>
                    <MainHeader hideManageBotsButton />

                    <Stack direction='row' spacing='1px'>

                        <Stack  bg='gray.300'
                                borderRadius='7px'
                                padding='4'
                                boxSize='full'
                                spacing='4'
                                divider={<StackDivider borderColor='gray.500' />}>

                            <Stack direction='row-reverse'>
                                <AdminActions />
                                <Stack boxSize='full'>
                                    <UsersSearchBox userType='IA' onUserClick={() => {}}/>
                                </Stack>
                            </Stack>
                        
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
                            Create bot
                        </PopoverHeader>

                        <PopoverBody fontSize='xl'>
                            Here you can create a new bot, by choosing a name and selecting it's difficulty.
                        </PopoverBody>
                        <PopoverFooter  border="0"
                                        d="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        pb='1rem'>

                            <ButtonGroup size="sm">
                                <Button variant='solid' size='md' fontSize='xl' onClick={onClose}>Cancel</Button>
                                <CreateBot  alignSelf='left' buttonSize='md' fontSize='xl' />
                            </ButtonGroup>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>
            </Box>
        )
    }
}