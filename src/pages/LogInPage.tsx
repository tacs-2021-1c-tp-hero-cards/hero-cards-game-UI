import React, { Component } from 'react'
import { Box, Button, Center, Stack, StackDivider, Text, FormControl, Input, FormLabel, Image } from "@chakra-ui/react"
import { Redirect } from 'react-router-dom'
import { UnrequiredPasswordInput } from '../components/PasswordInput'
import { redirect } from '../commons/Redirect'
import { LogInForm } from '../components/LogInForm'
import { logIn } from '../commons/LogIn'
import { User } from '../commons/User'
import { MainHeader } from '../components/MainHeader'

type LogInState = {
  redirectTo: string,
  shouldRedirect: boolean
}

export class LogInPage extends Component<{}, LogInState> {

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
             spacing='4'
             divider={<StackDivider borderColor='gray.500' />}>

        <Text fontSize='xl' fontWeight='bold' color=''>Log into your account</Text>

        {LogInForm((data: User) => logIn(data, this))}

        <Box fontSize='sm' paddingLeft='8px'>
          <Text>¿You don't have an account?</Text>
          <Text>¡Sign up 
            <Button fontSize='sm' colorScheme="blue" variant="link" onClick={() => redirect('/signUp', this)}>
              here
            </Button>
          for free!</Text>
        </Box>

      </Stack>
    </Stack>
  }
}