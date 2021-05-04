import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Text, Stack, Image, Button, Center, StackDivider, Box } from "@chakra-ui/react"

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
    return this.state.shouldRedirect ? <Redirect to={this.state.redirectTo} /> : this.content()
  }

  content() {
    return <Stack spacing='1px'>
      <Box backgroundColor='red.600' borderRadius='7px'>
        <Center h="100px"
                fontStyle='italic'
                fontWeight='bold'
                fontSize='3xl'>
          Hero Cards Game!
        </Center>
      </Box>

      <Stack direction='row' spacing='1px'>

        <Stack padding='4'
               bg='gray.200'
               borderRadius='7px'
               minW='150px'
               divider={<StackDivider borderColor='gray.500' />}>

          <Button colorScheme="orange"
                  variant="solid"
                  textColor='gray.700'
                  onClick={() => this.redirectTo('/signUp')}>
            Sing Up
          </Button>

          <Button colorScheme="purple"
                  variant="solid"
                  textColor='gray.700'
                  onClick={() => this.redirectTo('/logIn')}>
            Log In
          </Button>

        </Stack>

        <Stack spacing='1px'>

          <Image src={'https://pressover.news/wp-content/uploads/2019/04/dc-marvel.jpg'} borderRadius='7px' />

        </Stack>

      </Stack>

    </Stack>
  }
}
