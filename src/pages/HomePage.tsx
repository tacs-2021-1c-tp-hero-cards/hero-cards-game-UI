import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Text, Stack, Image, Button, Center, StackDivider, Box } from "@chakra-ui/react"
import { ServerConnector } from '../BackendConnector';

type HomeState = {
  shouldRedirect: boolean,
  redirectTo: string
}

export class HomePage extends Component<{}, HomeState> {

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
    return (this.state.shouldRedirect ? <Redirect to={this.state.redirectTo}/> : this.content())
  }

  content() {
    return <Box>
      <Stack backgroundColor='red.500'>
        <Center h="100px" fontStyle='italic' fontWeight='bold' fontSize='3xl' borderRadius='lg' bg='red.600'>
          Hero Cards Game!
        </Center>
      </Stack>

      <Stack backgroundColor='darkorange' >
        <Stack padding='4' divider={<StackDivider w='225px' borderColor='gray.500' />}>

          <Button colorScheme="teal" variant="solid" w='200px' textColor='gray.700' onClick={ServerConnector.signUp}>
            Sing Up
          </Button>

          <Button colorScheme="blue" variant="solid" w='200px' textColor='gray.700' onClick={ServerConnector.logIn}>
            Log In
          </Button>

          <Button colorScheme="cyan" variant="solid" w='200px' textColor='gray.700' onClick={ServerConnector.logOut}>
            Log Out
          </Button>

        </Stack>

        <Image src={'https://pressover.news/wp-content/uploads/2019/04/dc-marvel.jpg'} sizes='full' />
      </Stack>
    </Box>
  }
}
