import React from "react";
import { Stack, Button, useDisclosure, Box, Drawer, DrawerOverlay, DrawerContent, Image, DrawerBody, DrawerHeader, Text, Center } from "@chakra-ui/react";
import { RedirectProps, withRedirect } from "../commons/BehaviorAddOns";
import { logOut } from "../commons/LogOut";
import { LogOutIcon, ManageIcon, SearchIcon, PlayIcon, UserIcon, NewUserIcon } from "./icons";
import { HamburgerIcon } from "@chakra-ui/icons";
import logo from '../logo.png'


export function SideBar(props: SideBarProps) { return (withRedirect(props) (SideBarContent))}

export type SideBarProps = {
    logInButton?: boolean,
    signUpButton?: boolean,
    logOutButton?: boolean,
    userPageButton?: boolean,
    manageDecksButton?: boolean,
    searchCardsButton?: boolean,
    startAMatchButton?: boolean
}

type Props = RedirectProps & SideBarProps

function SideBarContent({ 
                            redirect, 
                            logInButton, 
                            signUpButton, 
                            logOutButton, 
                            userPageButton, 
                            manageDecksButton, 
                            searchCardsButton, 
                            startAMatchButton 
                        }: Props) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef<HTMLButtonElement>(null)

    return (
        <Box>
            <Button leftIcon={<HamburgerIcon />} variant='ghost' onClick={onOpen}  size='lg' width='1rem' />

            <Drawer isOpen={isOpen}
                    placement="left"
                    size='xs'
                    initialFocusRef={firstField}
                    onClose={onClose}>

                <DrawerOverlay />

                <DrawerContent>
                    <DrawerHeader bgColor='gray.300' borderBottomWidth="1px" height='20'>
                        <Stack>
                            <Stack direction='row' onClick={() => redirect('/')} cursor='pointer' width='7.5rem'>
                                <Image boxSize='3.5rem' src={logo} />
                                <Center>Menu</Center>
                            </Stack>
                        </Stack>
                    </DrawerHeader>

                    <DrawerBody bgColor='gray.200'>
                        <Stack  padding='4'
                                borderRadius='7px'>

                                {
                                    (logInButton ?? false) ? 
                                        <Button colorScheme="orange"
                                                leftIcon={<UserIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                onClick={() => redirect('/logIn')}>
                                            Log In
                                        </Button> : 
                                        <></>
                                }

                                {
                                    (signUpButton ?? false) ? 
                                        <Button colorScheme="orange"
                                                leftIcon={<NewUserIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                onClick={() => redirect('/signUp')}>
                                            Sign Up
                                        </Button> : 
                                        <></>
                                }

                                {
                                    (logOutButton ?? false) ? 
                                        <Button colorScheme="orange"
                                                leftIcon={<LogOutIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                onClick={() => logOut(() => redirect('/'), () => redirect('/error'))}>
                                            Log Out
                                        </Button> : 
                                        <></>
                                }

                                {
                                    (userPageButton ?? false) ?
                                        <Button colorScheme="orange"
                                                leftIcon={<UserIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                onClick={() => redirect('/user')}>
                                            User page
                                        </Button> :
                                        <></>
                                }

                                {
                                    (manageDecksButton ?? false) ? 
                                        <Button colorScheme="orange"
                                                leftIcon={<ManageIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                onClick={() => redirect('/decks')}>
                                            Manage decks
                                        </Button> : 
                                        <></>
                                }

                                {
                                    (searchCardsButton ?? false) ?
                                        <Button colorScheme="cyan"
                                                leftIcon={<SearchIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                onClick={() => redirect('/cards')}>
                                            Search cards
                                        </Button> :
                                        <></>
                                }

                                {
                                    (startAMatchButton ?? false) ?
                                        <Button colorScheme="green"
                                                leftIcon={<PlayIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                onClick={() => redirect('/matches')}>
                                            Start a match
                                        </Button> : 
                                        <></>
                                }

                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer> 
        </Box>
    )
}