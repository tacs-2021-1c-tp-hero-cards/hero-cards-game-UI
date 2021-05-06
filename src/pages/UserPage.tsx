import React, { Component } from 'react'
import { Box, Button, Center, Image, Stack, StackDivider } from "@chakra-ui/react"
import { Redirect } from 'react-router-dom'
import { logOut } from '../commons/LogOut'
import { redirect } from '../commons/Redirect'
import { User } from '../commons/User'
import { PageInProgress } from '../components/PageInProgress'
import { MainHeader } from '../components/MainHeader'


export class UserPage extends Component<User, { shouldRedirect: boolean }> {

    constructor(props: any) {
        super(props)
        this.state = {
            shouldRedirect: false
        }
    }

    render() {
        return this.state.shouldRedirect ? <Redirect to={'/'} /> : this.content()
    }

    content() {
        return <Stack spacing='1px'>
            
            <MainHeader page={this} />

            <Box bg='cadetblue' borderRadius='7px'>
                <Center padding='4' fontSize='xl' fontStyle='italic' fontWeight='bold'>
                    Welcome {this.props.username}!
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
                            onClick={() => logOut(this.props, this)}>
                        Log Out
                    </Button>
                </Stack>

                <PageInProgress page='User' />

            </Stack>
        </Stack>
    }
}