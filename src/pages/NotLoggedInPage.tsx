import React from 'react'
import { Box, Center, Text, Stack, StackDivider, HStack, Button } from "@chakra-ui/react"
import { MainHeader } from '../components/MainHeader'
import { RedirectableComponent, RedirectableState } from '../components/RedirectableComponent'

type CustomState = RedirectableState & {
    logInSubmitting: boolean,
    signUpSubmitting: boolean
}

export class NotLoggedInPage extends RedirectableComponent<{}, CustomState> {

    constructor(props: any) {
        super(props)
        this.state = {
            shouldRedirect: false,
            redirectTo: '',
            logInSubmitting: false,
            signUpSubmitting: false
        }
    }

    onLogIn = () => {
        this.setState({
            logInSubmitting: true
        })
        this.redirect('/logIn')
    }

    onSignUp = () => {
        this.setState({
            signUpSubmitting: true
        })
        this.redirect('/signUp')
    }

    content() {
        return <Stack spacing='1px'>
            <MainHeader page={this}/>

            <Box bg='orange.400' borderRadius='7px'>
                <Center padding='4' fontSize='xl' fontWeight='bold'>
                    It looks like you're not logged in 😱
                </Center>
            </Box>

            <Center bg='gray.100' borderRadius='7px'>
                <HStack spacing='10'
                        padding='10'
                        divider={<StackDivider borderColor='gray.400'/>} >

                    <Center>
                        <Stack>
                            <Center fontSize='lg' fontWeight='bold'>¿You don't have an account yet?</Center>
                            <Center fontSize='md' >No problem! Just click this button below and follow the steps</Center>

                            <Box paddingTop='5'>
                                <Center>
                                    <Button colorScheme='teal'
                                            type='submit'
                                            isLoading={this.state.signUpSubmitting}
                                            onClick={this.onSignUp}>
                                        Sign up
                                    </Button>
                                </Center>
                            </Box>
    
                        </Stack>
                    </Center>

                    <Center paddingRight='15'>
                        <Stack>
                            <Center fontSize='lg' fontWeight='bold'>¿You already have an account?</Center>
                            <Center fontSize='md' >Great! Please log in</Center>

                            <Box paddingTop='5'>
                                <Center>
                                    <Button colorScheme='teal'
                                            type='submit'
                                            isLoading={this.state.logInSubmitting}
                                            onClick={this.onLogIn}>
                                        Log in
                                    </Button>
                                </Center>
                            </Box>
                        </Stack>
                    </Center>
                </HStack>
            </Center>
        </Stack>
    }
}