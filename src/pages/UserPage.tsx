import React, { Component } from 'react'
import { Box, Button, Center, Image, Stack, StackDivider, Text } from "@chakra-ui/react"
import { Redirect } from 'react-router-dom'
import { logOut } from '../commons/LogOut'
import { redirect } from '../commons/Redirect'
import { User } from '../commons/User'


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
            <Box backgroundColor='blue.500' borderRadius='7px'>
                <Center>
                    <Button h="100px"
                            fontStyle='italic'
                            fontWeight='bold'
                            fontSize='3xl'
                            variant='unstyled'
                            onClick={() => redirect('/', this)}>
                        Hero Cards Game!
                    </Button>
                </Center>
            </Box>

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

                <Box bg='grey' borderRadius='7px' width='full'>
                    <Center paddingTop='30px'>
                        <Image src='https://lita.upc.edu/es/media/workinprogress_01.png'/>
                    </Center>
                    <Center padding='4' fontSize='xl' fontStyle='italic' fontWeight='bold'>
                        User page in progress!
                    </Center>
                </Box>

            </Stack>
        </Stack>
    }
}