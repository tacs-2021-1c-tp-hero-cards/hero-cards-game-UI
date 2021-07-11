import React from 'react'
import { Box, Center, Stack, StackDivider, HStack, Button, Icon } from "@chakra-ui/react"
import { MainHeader } from '../components/MainHeader'
import { RedirectProps, withRedirect } from '../commons/BehaviorAddOns'
import { NewUserIcon, UserIcon } from '../components/icons'

export function NotLoggedInPage() { return( withRedirect({}) (NotLoggedInContent) )}

type NotLoggedInProps = RedirectProps

function NotLoggedInContent({ redirect }: NotLoggedInProps) {

    return (
        <Stack spacing='1px'>
            <MainHeader logInButton signUpButton />

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
                                            leftIcon={<NewUserIcon />}
                                            type='submit'
                                            onClick={() => redirect('/signUp')}>
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
                                            leftIcon={<UserIcon />}
                                            type='submit'
                                            onClick={() => redirect('/logIn')}>
                                        Log in
                                    </Button>
                                </Center>
                            </Box>
                        </Stack>
                    </Center>
                </HStack>
            </Center>
        </Stack>
    )
}
