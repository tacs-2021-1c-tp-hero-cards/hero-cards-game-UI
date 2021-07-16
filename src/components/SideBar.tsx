import React, { useState } from "react"
import { Stack, Button, useDisclosure, Box, Drawer, DrawerOverlay, DrawerContent, Image, DrawerBody, DrawerHeader, Text, Center, 
        StackDivider } from "@chakra-ui/react"
import { RedirectProps, withRedirect } from "../commons/BehaviorAddOns"
import { logOut } from "../commons/LogOut"
import { LogOutIcon, ManageIcon, SearchIcon, PlayIcon, UserIcon, NewUserIcon, AiIcon } from "./icons";
import { HamburgerIcon } from "@chakra-ui/icons"
import logo from '../logo.png'
import store from "../store/Store"
import { Collection } from "../commons/Collections"
import { NotificationPreview } from "./Notification"
import { tokenIsAlive } from "../commons/Token";


export function SideBar(props: SideBarProps) { return (withRedirect(props) (SideBarContent))}

export type SideBarProps = {
    hideHubButton?: boolean,
    logInButton?: boolean,
    signUpButton?: boolean,
    manageDecksButton?: boolean,
    manageBotsButton?: boolean,
    searchCardsButton?: boolean,
    startAMatchButton?: boolean
}

type Props = RedirectProps & SideBarProps

function SideBarContent({ 
                            redirect,
                            hideHubButton, 
                            logInButton, 
                            signUpButton, 
                            manageDecksButton, 
                            manageBotsButton, 
                            searchCardsButton, 
                            startAMatchButton 
                        }: Props) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef<HTMLButtonElement>(null)

    const [ notifications, setNotifications ] = useState<Collection<any>>(Collection.empty())

    const unsubscribe = store.subscribe(() => setNotifications(Collection.wrap(store.getState().socket.notifications)))
    unsubscribe() // TODO: remove when redux works fine

    const isLoggedIn = tokenIsAlive()

    return (
        <Box>
            <Button leftIcon={<HamburgerIcon />} variant='ghost' onClick={onOpen}  size='lg' width='1rem' colorScheme={notifications.isEmpty() ? 'gray' : 'red'} />

            <Drawer isOpen={isOpen}
                    placement="left"
                    size='xs'
                    initialFocusRef={firstField}
                    onClose={onClose}>

                <DrawerOverlay />

                <DrawerContent>
                    <DrawerHeader bgColor='gray.300' borderBottomWidth="1px" height='20'>
                        <Stack>
                            <Stack  direction='row' 
                                    onClick={() => {
                                        unsubscribe() 
                                        redirect('/')
                                    }} 
                                    cursor='pointer' 
                                    width='7.5rem' >
                                <Image boxSize='3.5rem' src={logo} />
                                <Center>Menu</Center>
                            </Stack>
                        </Stack>
                    </DrawerHeader>

                    <DrawerBody bgColor='gray.200'>
                        <Stack  padding='4'
                                borderRadius='7px'
                                spacing='1rem'>

                                {
                                    isLoggedIn && (!hideHubButton ?? true) ?
                                        <Button colorScheme="orange"
                                                leftIcon={<UserIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                onClick={() => {
                                                    unsubscribe() 
                                                    redirect('/user')
                                                }}>
                                            My hub
                                        </Button> :
                                        <></>
                                }

                                {
                                    isLoggedIn ? 
                                        <Button colorScheme="orange"
                                                leftIcon={<LogOutIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                onClick={() => 
                                                    logOut(
                                                        () => {
                                                            unsubscribe() 
                                                            redirect('/')
                                                        }, 
                                                        () => {
                                                            unsubscribe() 
                                                            redirect('/')
                                                        })}>
                                            Log Out
                                        </Button> : 
                                        <></>
                                }

                                {
                                    (logInButton ?? false) && !isLoggedIn ? 
                                        <Button colorScheme="orange"
                                                leftIcon={<UserIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                onClick={() => {
                                                    unsubscribe() 
                                                    redirect('/logIn')
                                                }}>
                                            Log In
                                        </Button> : 
                                        <></>
                                }

                                {
                                    (signUpButton ?? false) && !isLoggedIn ? 
                                        <Button colorScheme="orange"
                                                leftIcon={<NewUserIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                onClick={() => {
                                                    unsubscribe() 
                                                    redirect('/signUp')
                                                }}>
                                            Sign Up
                                        </Button> : 
                                        <></>
                                }

                                {
                                    (manageDecksButton ?? false) ? 
                                        <Button colorScheme="orange"
                                                leftIcon={<ManageIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                onClick={() => {
                                                    unsubscribe() 
                                                    redirect('/decks')
                                                }}>
                                            Manage decks
                                        </Button> : 
                                        <></>
                                }

                                {
                                    (manageBotsButton ?? false) ? 
                                        <Button colorScheme="yellow"
                                                leftIcon={<AiIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                onClick={() => {
                                                    unsubscribe() 
                                                    redirect('/bots')
                                                }}>
                                            Manage bots
                                        </Button> : 
                                        <></>
                                }

                                {
                                    (searchCardsButton ?? false) ?
                                        <Button colorScheme="cyan"
                                                leftIcon={<SearchIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                onClick={() => {
                                                    unsubscribe() 
                                                    redirect('/cards')
                                                }}>
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
                                                onClick={() => {
                                                    unsubscribe() 
                                                    redirect('/matches')
                                                }}>
                                            Start a match
                                        </Button> : 
                                        <></>
                                }

                                {
                                    notifications.nonEmpty() ? 
                                        <Stack>
                                            <Text>Notifications:</Text>
                                            <Stack divider={<StackDivider borderColor='gray' />} spacing='0.5rem'>
                                                {
                                                    notifications.map((n, index) => 
                                                            <NotificationPreview matchId={n.matchId} username={n.user.username} index={index} preRedirect={unsubscribe}/>
                                                        ).collection
                                                }
                                            </Stack>
                                        </Stack> :
                                        <></>
                                }
                                

                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer> 
        </Box>
    )
}