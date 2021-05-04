import React, { Component } from 'react'
import { Box, Button, Center, Stack, StackDivider, Text, Image } from "@chakra-ui/react"
import { Redirect } from 'react-router-dom'

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
    return <Box>
      <Stack backgroundColor='blue.500'>
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
      </Stack>

      <Stack backgroundColor='orange.500' >
        <Stack padding='4' divider={<StackDivider w='225px' borderColor='gray.500' />}>

          <Button colorScheme="cyan" 
                  variant="solid" 
                  w='200px' 
                  textColor='gray.700' 
                  onClick={() => this.redirectTo('/signUp')}>
            Sing Up
          </Button>

        </Stack>

      </Stack>
    </Box>
  }
}