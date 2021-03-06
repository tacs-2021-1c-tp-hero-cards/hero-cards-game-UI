import React from "react"
import { Stack, Button, useDisclosure, Box, Drawer, DrawerOverlay, DrawerContent, Image, DrawerBody, DrawerHeader, Text, Center, 
        StackDivider, 
        IconButton,
        Tooltip} from "@chakra-ui/react"
import { RedirectProps, withRedirect } from "../commons/BehaviorAddOns"
import { logOut } from "../commons/LogOut"
import { LogOutIcon, SearchIcon, PlayIcon, UserIcon, NewUserIcon, AiIcon, ScoreboardIcon } from "./miscellaneous/icons";
import { HamburgerIcon } from "@chakra-ui/icons"
import logo from '../logo.png'
import { Invite, InvitePreview } from "./notifications/Invite"
import { tokenIsAlive } from "../commons/Token";
import { shallowEqual } from 'react-redux'
import Collection from "../commons/Collections";
import { useGetState } from '../store/hooks'
import { RootState } from "../store/Store";
import MyHubButton from './miscellaneous/MyHubButton'
import { Confirmation, ConfirmationPreview } from "./notifications/Confirmation";
import { Rejection, RejectionPreview } from "./notifications/Rejection";
import { Abortion, AbortionPreview } from "./notifications/Abortion";
import { DuelUpdate, DuelUpdatePreview } from "./notifications/DuelUpdate";


export function SideBar(props: SideBarProps) { return (withRedirect(props) (SideBarContent))}

export type SideBarProps = {
    hideHubButton?: boolean,
    hideLogInButton?: boolean,
    hideSignUpButton?: boolean,
    hideDecksButton?: boolean,
    hideManageBotsButton?: boolean,
    hideCardsButton?: boolean,
    hideMatchButton?: boolean,
    hideScoreboardButton?: boolean
}

type Props = RedirectProps & SideBarProps

function SideBarContent({ 
                            redirect,
                            hideHubButton, 
                            hideLogInButton, 
                            hideSignUpButton, 
                            hideDecksButton, 
                            hideManageBotsButton, 
                            hideCardsButton,
                            hideMatchButton,
                            hideScoreboardButton 
                        }: Props) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef<HTMLButtonElement>(null)


    const invites = useGetState(state => state.socket.invites, shallowEqual)
    const confirmations = useGetState(state => state.socket.confirmations, shallowEqual)
    const rejections = useGetState(state => state.socket.rejections, shallowEqual)
    const abortions = useGetState(state => state.socket.abortions, shallowEqual)
    const duelUpdates = useGetState(state => state.socket.duelUpdates, shallowEqual)

    const user = useGetState(state => state.user)

    const isLoggedIn = tokenIsAlive()
    const isAdmin = user?.admin

    const notifications = Collection.wrap(invites)
                                    .concatWith(confirmations)
                                    .concatWith(rejections)
                                    .concatWith(abortions)
                                    .concatWith(duelUpdates)

    return (
        <Box>
            <Tooltip    hasArrow 
                        label={notifications.length} 
                        placement='right' 
                        backgroundColor='red' 
                        borderRadius='0.5rem'
                        fontSize='xl'
                        textColor='black'
                        isDisabled={notifications.isEmpty()} 
                        isOpen={notifications.nonEmpty() && !isOpen}>

                <IconButton aria-label='Side bar' 
                            onClick={onOpen} 
                            marginLeft='1rem'
                            size='lg' 
                            variant='ghost' 
                            icon={<HamburgerIcon />}
                            colorScheme={notifications.isEmpty() ? 'gray' : 'red'} />
            </Tooltip>

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
                                    !isLoggedIn && (!hideLogInButton ?? true) ? 
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
                                    !isLoggedIn && (!hideSignUpButton ?? true) ? 
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
                                    isLoggedIn && (!hideMatchButton ?? true) ?
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
                                    isLoggedIn && isAdmin && (!hideManageBotsButton ?? true) ? 
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
                                    isLoggedIn && isAdmin && (!hideScoreboardButton ?? true) ? 
                                        <Button colorScheme="blackAlpha"
                                                leftIcon={<ScoreboardIcon />}
                                                variant="solid"
                                                textColor='gray.700'
                                                fontSize='xl'
                                                onClick={() => redirect('/scoreboard')}>
                                            Scoreboard
                                        </Button> : 
                                        <></>
                                }

                                {
                                    isLoggedIn ? 
                                        <Button colorScheme="red"
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

                                <Stack>
                                    {
                                        Collection.wrap(invites).nonEmpty() ? 
                                            <Stack>
                                                <Text>Invites:</Text>
                                                <Stack divider={<StackDivider borderColor='gray' />} spacing='0.5rem'>
                                                    {
                                                        invites.map((n: Invite, index: number) => 
                                                            <InvitePreview key={index} matchId={n.matchId} username={n.username} index={index} />
                                                        )
                                                    }
                                                </Stack>
                                            </Stack> :
                                            <></>
                                    }

                                    {
                                        Collection.wrap(confirmations).nonEmpty() ? 
                                            <Stack>
                                                <Text>Confirmations:</Text>
                                                <Stack divider={<StackDivider borderColor='gray' />} spacing='0.5rem'>
                                                    {
                                                        confirmations.map((n: Confirmation, index: number) => 
                                                            <ConfirmationPreview key={index} matchId={n.matchId} username={n.username} index={index} />
                                                        )
                                                    }
                                                </Stack>
                                            </Stack> :
                                            <></>
                                    }

                                    {
                                        Collection.wrap(rejections).nonEmpty() ? 
                                            <Stack>
                                                <Text>Rejections:</Text>
                                                <Stack divider={<StackDivider borderColor='gray' />} spacing='0.5rem'>
                                                    {
                                                        rejections.map((n: Rejection, index: number) => 
                                                            <RejectionPreview key={index} matchId={n.matchId} username={n.username} index={index} />
                                                        )
                                                    }
                                                </Stack>
                                            </Stack> :
                                            <></>
                                    }

                                    {
                                        Collection.wrap(abortions).nonEmpty() ? 
                                            <Stack>
                                                <Text>Surrenders:</Text>
                                                <Stack divider={<StackDivider borderColor='gray' />} spacing='0.5rem'>
                                                    {
                                                        abortions.map((n: Abortion, index: number) => 
                                                            <AbortionPreview key={index} matchId={n.matchId} username={n.username} index={index} />
                                                        )
                                                    }
                                                </Stack>
                                            </Stack> :
                                            <></>
                                    }

                                    {
                                        Collection.wrap(duelUpdates).nonEmpty() ? 
                                            <Stack>
                                                <Text>Duel updates:</Text>
                                                <Stack divider={<StackDivider borderColor='gray' />} spacing='0.5rem'>
                                                    {
                                                        duelUpdates.map((n: DuelUpdate, index: number) => 
                                                            <DuelUpdatePreview key={index} matchId={n.matchId} index={index} />
                                                        )
                                                    }
                                                </Stack>
                                            </Stack> :
                                            <></>
                                    }
                                </Stack>
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer> 
        </Box>
    )
}