import React, { Component } from 'react'
import { Box, Button, Center, Stack, Text } from "@chakra-ui/react"
import { Redirect } from 'react-router-dom'

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
            <Box backgroundColor='blue.500' borderRadius='7px'>
                <Center>
                    <Button h="100px"
                            fontStyle='italic'
                            fontWeight='bold'
                            fontSize='3xl'
                            variant='unstyled'
                            onClick={() => this.redirect()}>
                        Hero Cards Game!
            </Button>
                </Center>
            </Box>

            <Box bg='yellow.400' borderRadius='7px'>
                <Center padding='4' fontSize='xl' fontStyle='italic' fontWeight='bold'>
                    404 - Page Not Found!
                </Center>
            </Box>

        </Stack>
    }
}