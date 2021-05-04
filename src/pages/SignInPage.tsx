import React, { Component } from 'react'
import { Box, Button, Center, Stack, StackDivider, Text, FormControl, Input, FormLabel} from "@chakra-ui/react"
import { Redirect } from 'react-router-dom'
import { RequiredPasswordInput, UnrequiredPasswordInput } from '../components/PasswordInput'

type SignInState = {
  redirectTo: string,
  shouldRedirect: boolean
}

export class SignInPage extends Component<{}, SignInState> {

  constructor(props: any) {
    super(props)
    this.state = {
      shouldRedirect: false,
      redirectTo: ''
    }
  }

  redirectTo(path: string) {
    this.setState({
      redirectTo: path,
      shouldRedirect: true
    })
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
                  onClick={() => this.redirectTo('/')}>
            Hero Cards Game!
          </Button>
        </Center>
      </Box>

      <Stack spacing='1px'>
        <Stack padding='4'
               backgroundColor='gray.200'
               borderRadius='7px'
               divider={<StackDivider borderColor='gray.500' />}>

          <Stack spacing='20px'>
            <Text fontSize='lg'>Log into your account</Text>

            <Stack direction='row'>
              <FormControl id="username" maxWidth='300px'>
                <FormLabel>Username</FormLabel>
                <Input bg='white' placeholder="Enter username" />
              </FormControl>
              
              <UnrequiredPasswordInput />
            </Stack>

            <Button colorScheme="cyan"
                    variant="solid"
                    textColor='gray.700'
                    width='200px'
                    onClick={() => this.redirectTo('/signUp')}>
              Log In
            </Button>
          </Stack>

          <Box fontSize='sm' padding='8px'>
            <Center>¿You don't have an account?</Center>
            <Center>¡Sign up here for free!</Center>
          </Box>

          <Stack>
            <Stack direction='row'>
              <FormControl id="username" isRequired maxWidth='300px'>
                <FormLabel>Username</FormLabel>
                <Input bg='white' placeholder="Enter username" />
              </FormControl>
              
              <RequiredPasswordInput />
            </Stack>

            <Button colorScheme="cyan"
                    variant="solid"
                    textColor='gray.700'
                    width='200px'
                    onClick={() => this.redirectTo('/signUp')}>
              Sing Up
            </Button>
          </Stack>

        </Stack>
      </Stack>

    </Stack>
  }
}