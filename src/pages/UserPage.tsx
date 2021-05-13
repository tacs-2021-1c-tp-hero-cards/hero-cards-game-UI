import React from 'react'
import { Box, Button, Center, Stack, StackDivider } from "@chakra-ui/react"
import { logOut } from '../commons/LogOut'
import { PageInProgress } from '../components/PageInProgress'
import { MainHeader } from '../components/MainHeader'
import { getCookie } from '../commons/Cookies'
import { RedirectableComponent, RedirectableState } from '../components/RedirectableComponent'
import { Redirect } from 'react-router-dom'


export class UserPage extends RedirectableComponent<{}, RedirectableState> {

    constructor(props: any) {
        super(props)
        this.state = {
            shouldRedirect: false,
            redirectTo: ''
        }
    }

    render() {
        return(
            this.state.shouldRedirect || getCookie('token') ? super.render() : <Redirect to={'/logInError'} />
        )
    }

    content() {
        return <Stack spacing='1px'>
            
            <MainHeader page={this} />

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
                            onClick={() => logOut(this)}>
                        Log Out
                    </Button>

                    <Button colorScheme="orange"
                            variant="solid"
                            textColor='gray.700'
                            onClick={() => this.redirect('/decks')}>
                        Manage decks
                    </Button>
                </Stack>

                <PageInProgress page='User' />

            </Stack>
        </Stack>
    }
}