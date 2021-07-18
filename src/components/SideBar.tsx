import React from "react"
import { Stack, Button, useDisclosure, Box, Drawer, DrawerOverlay, DrawerContent, Image, DrawerBody, DrawerHeader, Text, Center, 
        StackDivider } from "@chakra-ui/react"
import { RedirectProps, withRedirect } from "../commons/BehaviorAddOns"
import { logOut } from "../commons/LogOut"
import { LogOutIcon, SearchIcon, PlayIcon, UserIcon, NewUserIcon, AiIcon } from "./icons";
import { HamburgerIcon } from "@chakra-ui/icons"
import logo from '../logo.png'
import { Notification, NotificationPreview } from "./Notification"
import { tokenIsAlive } from "../commons/Token";
import { shallowEqual } from 'react-redux'
import Collection from "../commons/Collections";
import { useGetState } from '../store/hooks'
import { RootState } from "../store/Store";
import MyHubButton from './MyHubButton'


export function SideBar(props: SideBarProps) { return (withRedirect(props) (SideBarContent))}

export type SideBarProps = {
    hideHubButton?: boolean,
    logInButton?: boolean,
    signUpButton?: boolean,
    hideDecksButton?: boolean,
    manageBotsButton?: boolean,
    hideCardsButton?: boolean,
    startAMatchButton?: boolean
}

type Props = RedirectProps & SideBarProps

function SideBarContent({ 
                            redirect,
                            hideHubButton, 
                            logInButton, 
                            signUpButton, 
                            hideDecksButton, 
                            manageBotsButton, 
                            hideCardsButton,
                            startAMatchButton 
                        }: Props) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef<HTMLButtonElement>(null)

    function getNotifications(state: RootState) {
        return (state.socket.notifications.map((n: Notification, index: number) => 
                    <NotificationPreview key={index} matchId={n.matchId} username={n.username} index={index} />
                )
        )
    }

    const notifications = useGetState(getNotifications, shallowEqual)

    const isLoggedIn = tokenIsAlive()

    return (
        <Box>
            <Button leftIcon={<HamburgerIcon />} 
                    variant='ghost' 
                    onClick={onOpen} 
                    size='lg' 
                    width='1rem' 
                    marginLeft='0.5rem'
                    colorScheme={Collection.wrap(notifications).isEmpty() ? 'gray' : 'red'} />

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
                                    onClick={() => redirect('/')} 
                                    cursor='pointer' 
                                    width='7.5rem' >
                                <Image boxSize='3.5rem' src={logo} />
                                <Center fontSize='2xl'>Menu</Center>
                            </Stack>
                        </Stack>
                    </DrawerHeader>

                    <DrawerBody bgColor='gray.200'>
                        <Stack  padding='4'
                                borderRadius='7px'
                                spacing='1rem'>

                                {
                                    isLoggedIn && (!hideHubButton ?? true) ?
                                        <MyHubButton /> :
                                        <></>
                                }

                                {
                                    isLoggedIn ? 
                                        <Button colorScheme="orange"
                                                leftIcon={<LogOutIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                fontSize='xl'
                                                onClick={() => 
                                                    logOut(() => redirect('/'), () => redirect('/'))}>
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
                                                fontSize='xl'
                                                onClick={() => redirect('/logIn')}>
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
                                                fontSize='xl'
                                                onClick={() => redirect('/signUp')}>
                                            Sign Up
                                        </Button> : 
                                        <></>
                                }

                                {
                                    (!hideDecksButton ?? true) ? 
                                        <Button colorScheme="teal"
                                                leftIcon={<SearchIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                fontSize='xl'
                                                onClick={() => redirect('/decks')}>
                                            Search decks
                                        </Button> : 
                                        <></>
                                }

                                {
                                    (manageBotsButton ?? false) ? 
                                        <Button colorScheme="yellow"
                                                leftIcon={<AiIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                fontSize='xl'
                                                onClick={() => redirect('/bots')}>
                                            Manage bots
                                        </Button> : 
                                        <></>
                                }

                                {
                                    (!hideCardsButton ?? true) ?
                                        <Button colorScheme="cyan"
                                                leftIcon={<SearchIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                fontSize='xl'
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
                                                fontSize='xl'
                                                onClick={() => redirect('/matches')}>
                                            Start a match
                                        </Button> : 
                                        <></>
                                }

                                {
                                    Collection.wrap(notifications).nonEmpty() ? 
                                        <Stack>
                                            <Text>Notifications:</Text>
                                            <Stack divider={<StackDivider borderColor='gray' />} spacing='0.5rem'>
                                                {notifications}
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