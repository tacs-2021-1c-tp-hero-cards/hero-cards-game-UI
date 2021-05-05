import React, { Component } from 'react'
import { Box, Button, Center, Stack, StackDivider, Text } from "@chakra-ui/react"
import { Redirect } from 'react-router-dom'
import { SignUpForm } from '../components/SignUpForm'
import { ServerConnector } from '../BackendConnector'
import { redirect } from '../commons/Redirect'
import { User } from '../commons/User'
import { logIn } from '../commons/LogIn'

type SignUpState = {
  redirectTo: string,
  shouldRedirect: boolean
}

export class SignUpPage extends Component<{}, SignUpState> {

  constructor(props: any) {
    super(props)
    this.state = {
      shouldRedirect: false,
      redirectTo: ''
    }
  }

  render() {
    return this.state.shouldRedirect ? <Redirect to={this.state.redirectTo} /> : this.content()
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

        <Stack padding='4'
               backgroundColor='gray.200'
               borderRadius='7px'
               divider={<StackDivider borderColor='gray.500' />}>

          <Text fontSize='xl' fontWeight='bold'>Submit your data to sign up</Text>

          <Stack>
            <Text fontSize='sm'>Don't worry, we won't make public any of this</Text>

            {SignUpForm((data: User) => signUp(data, this))}
          </Stack>

          <Box fontSize='sm' padding='8px'>
            <Text>¿Already have an account? <Button fontSize='sm' 
                                                    colorScheme="blue" 
                                                    variant="link" 
                                                    onClick={() => redirect('/logIn', this)}>
                Log in!
              </Button>
            </Text>
          </Box>

        </Stack>

    </Stack>
  }
}

function signUp(user: User, from: any) {
  ServerConnector.signUp(user,
                        (data) => logIn(user, from),
                        (error) => redirect('/error', from))
}