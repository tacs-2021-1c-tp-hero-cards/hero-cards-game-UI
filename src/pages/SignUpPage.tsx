import React, { Component } from 'react'
import { Box, Button, Center, Stack, StackDivider, Text } from "@chakra-ui/react"
import { Redirect } from 'react-router-dom'
import { SignUpForm } from '../components/SignUpForm'
import { redirect } from '../commons/Redirect'
import { User } from '../commons/User'
import { signUp } from '../commons/SignUp'
import { MainHeader } from '../components/MainHeader'
import { setCookie } from '../commons/Cookies'

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
      
      <MainHeader page={this} />

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
