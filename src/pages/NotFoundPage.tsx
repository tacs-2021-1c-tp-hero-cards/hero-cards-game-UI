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
        return (
            <Box>
                <Stack backgroundColor='blue.500'>
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
                </Stack>

                <Stack backgroundColor='yellow.500'>
                    <Center padding='4' fontStyle='italic' fontWeight='bold'>
                        404 - Page Not Found!
                    </Center>
                </Stack>
            </Box>
        )
    }
}