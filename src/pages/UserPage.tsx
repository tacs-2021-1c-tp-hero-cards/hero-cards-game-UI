import React from 'react'
import { Box, Button, Center, Stack, StackDivider } from "@chakra-ui/react"
import { logOut } from '../commons/LogOut'
import { PageInProgress } from '../components/PageInProgress'
import { MainHeader } from '../components/MainHeader'
import { getCookie } from '../commons/Cookies'
import { RedirectProps, TokenProps, withRedirect, withTokenValidation } from '../commons/BehaviorAddOns'

export function UserPage() { return( withRedirect({}) (withTokenValidation) (UserContent) )}

type UserProps = RedirectProps & TokenProps

function UserContent({ redirect, renderWithTokenValidation }: UserProps) {

    return( renderWithTokenValidation(content) )

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