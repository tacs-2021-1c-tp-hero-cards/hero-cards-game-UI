import React from 'react'
import { Box, Button, Center, Stack, StackDivider } from "@chakra-ui/react"
import { logOut } from '../commons/LogOut'
import { PageInProgress } from '../components/PageInProgress'
import { MainHeader } from '../components/MainHeader'
import { getCookie } from '../commons/Cookies'
import { RedirectProps, withRedirect } from '../commons/BehaviorAddOns'

export function UserPage() { return( withRedirect({}) (UserContent) )}

type UserProps = RedirectProps

function UserContent({ redirect, renderRedirect }: UserProps) {

    return(
        getCookie('token') ? content() : renderRedirect('/logInError')
    )

    function content() {
        return (
            <Stack spacing='1px'>
                
                <MainHeader />

                <Box bg='lightblue' borderRadius='7px'>
                    <Center padding='4' fontSize='xl' fontStyle='italic' fontWeight='bold'>
                        Welcome {getCookie('username')}!
                    </Center>
                </Box>

                <Stack direction='row' spacing='1px'>
                    <Stack padding='4'
                        bg='gray.200'
                        borderRadius='7px'
                        minW='200px'
                        divider={<StackDivider borderColor='gray.500' />}>

                        <Button colorScheme="orange"
                                variant="solid"
                                textColor='gray.700'
                                onClick={() => logOut(() => redirect('/'), () => redirect('/error'))}>
                            Log Out
                        </Button>

                        <Button colorScheme="orange"
                                variant="solid"
                                textColor='gray.700'
                                onClick={() => redirect('/decks')}>
                            Manage decks
                        </Button>
                    </Stack>

                    <PageInProgress page='User' />

                </Stack>
            </Stack>
        )
    }
}