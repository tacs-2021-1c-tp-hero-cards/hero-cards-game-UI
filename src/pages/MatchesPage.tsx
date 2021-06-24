import React from 'react'
import { Button, Center, Stack, StackDivider } from "@chakra-ui/react"
import { logOut } from '../commons/LogOut'
import { MainHeader } from '../components/MainHeader'
import { RedirectProps, TokenProps, withRedirect, withTokenValidation } from '../commons/BehaviorAddOns'
import { AiIcon, LogOutIcon, ManageIcon, PlayIcon, SearchIcon, UserIcon, UsersIcon } from '../components/icons'

export function StartMatchPage() { return( withRedirect({}) (withTokenValidation) (StartMatchContent) )}

type UserProps = RedirectProps & TokenProps

function StartMatchContent({ redirect, renderWithTokenValidation }: UserProps) {

    return( renderWithTokenValidation(content) )

    function content() {
        return (
            <Stack spacing='1px'>
                
                <MainHeader />

                <Stack direction='row' spacing='1px'>
                    <Stack padding='4'
                        bg='gray.200'
                        borderRadius='7px'
                        minW='200px'
                        divider={<StackDivider borderColor='gray.500' />}>

                        <Button colorScheme="orange"
                                leftIcon={<LogOutIcon />}
                                variant="solid"
                                textColor='gray.700'
                                onClick={() => logOut(() => redirect('/'), () => redirect('/error'))}>
                            Log Out
                        </Button>

                        <Button colorScheme="orange"
                                leftIcon={<UserIcon />}
                                variant="solid"
                                textColor='gray.700'
                                onClick={() => redirect('/user')}>
                            User page
                        </Button>

                        <Button colorScheme="cyan"
                                leftIcon={<SearchIcon />}
                                variant="solid"
                                textColor='gray.700'
                                onClick={() => redirect('/cards')}>
                            Search cards
                        </Button>
                    </Stack>

                    <Stack  bg='gray.300'
                            borderRadius='7px'
                            padding='4'
                            boxSize='full'
                            spacing='4'
                            divider={<StackDivider borderColor='gray.500' />}>

                            <Center fontSize='4xl'>Play!</Center>
                            
                            <Stack direction='row' divider={<StackDivider borderColor='gray.400' />}>
                                <Stack textAlign='center'>
                                    <Center fontSize='2xl'>Against an AI</Center>

                                    <Center>
                                        Battle against an AI to test a deck before trying to fight other players or just for fun.
                                    </Center>

                                    <Button colorScheme="teal"
                                            leftIcon={<AiIcon />}
                                            variant="solid"
                                            width='8rem'
                                            alignSelf='center'
                                            onClick={() => {}}>
                                        Let's go!
                                    </Button>
                                </Stack>

                                <Stack textAlign='center'>
                                    <Center fontSize='2xl'>Against another player</Center>

                                    <Center textAlign='center'>
                                        Test yourself against other players in battle, and climb to the top of the scoreboard!
                                    </Center>

                                    <Button colorScheme="teal"
                                            leftIcon={<UsersIcon />}
                                            variant="solid"
                                            width='8rem'
                                            alignSelf='center'
                                            onClick={() => {}}>
                                        Let's go!
                                    </Button>
                                </Stack>
                            </Stack>
                        
                    </Stack>

                </Stack>
            </Stack>
        )
    }
}