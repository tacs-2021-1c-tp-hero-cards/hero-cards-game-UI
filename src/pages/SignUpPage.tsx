import React, { Component } from 'react'
import { Box, Button, Center, Stack, StackDivider, Text, FormControl, Input, FormLabel} from "@chakra-ui/react"
import { Redirect } from 'react-router-dom'
import { RequiredPasswordInput, UnrequiredPasswordInput } from '../components/PasswordInput'
import { RequiredInput } from '../components/GenericInput'
import { FormikExample } from '../components/GenericForm'

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

        <Stack padding='4'
               backgroundColor='gray.200'
               borderRadius='7px'
               divider={<StackDivider borderColor='gray.500' />}>

          <Text fontSize='xl' fontWeight='bold' color=''>Submit your data to sign up</Text>

          <Stack>
            <Text fontSize='sm'>Don't worry, we won't make public any of this</Text>

            <FormikExample />

          </Stack>

          <Box fontSize='sm' padding='8px'>
            <Text>¿Already have an account? <Button fontSize='sm' colorScheme="blue" variant="link" onClick={() => this.redirectTo('/logIn')}>
                Log in!
              </Button>
            </Text>
          </Box>

        </Stack>

    </Stack>
  }
}