import React, { Component } from 'react'
import { Box, Button, Center, Image, Stack, Text } from "@chakra-ui/react"
import { Redirect } from 'react-router-dom'
import { MainHeader } from '../components/MainHeader'

export class NotFoundPage extends Component<{}, { shouldRedirect: boolean }> {

    constructor(props: any) {
        super(props)
        this.state = {
            shouldRedirect: false
        }
    }

    redirect() {
        this.setState({
            shouldRedirect: true
        })
    }

    render() {
        return this.state.shouldRedirect ? <Redirect to={'/'} /> : this.content()
    }

    content() {
        return <Stack spacing='1px'>
            <MainHeader page={this}/>

            <Box bg='yellow.400' borderRadius='7px'>
                <Center padding='4' fontSize='xl' fontStyle='italic' fontWeight='bold'>
                    404 - Page Not Found!
                </Center>
            </Box>

            <Box bg='gray.100' borderRadius='7px'>
                <Center>
                    <Box maxWidth='600px'>
                        <Image src='https://www.initcoms.com/wp-content/uploads/2020/07/404-error-not-found-1.png'/>
                    </Box>
                </Center>
            </Box>

        </Stack>
    }
}