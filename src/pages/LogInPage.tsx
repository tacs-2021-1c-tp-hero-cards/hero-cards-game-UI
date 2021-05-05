import React, { Component } from 'react'
import { Box, Button, Center, Stack, StackDivider, Text, FormControl, Input, FormLabel} from "@chakra-ui/react"
import { Redirect } from 'react-router-dom'
import { RequiredPasswordInput, UnrequiredPasswordInput } from '../components/PasswordInput'
import { redirect } from '../commons/Redirect'

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

          <Text fontSize='xl' fontWeight='bold' color=''>Log into your account</Text>

          <Stack spacing='20px'>

            <Stack direction='row'>
              <FormControl id="username" maxWidth='300px'>
                <FormLabel>Username</FormLabel>
                <Input bg='white' placeholder="Enter username" />
              </FormControl>
              
              <UnrequiredPasswordInput label='Password' placeholder='Enter password'/>
            </Stack>

            <Button colorScheme="cyan"
                    variant="solid"
                    textColor='gray.700'
                    width='200px'
                    onClick={() => redirect('/signUp', this)}>
              Log In
            </Button>
          </Stack>

          <Box fontSize='sm' padding='8px'>
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