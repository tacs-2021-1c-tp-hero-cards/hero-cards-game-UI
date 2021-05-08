import React from 'react'
import { Stack, Image, Button, StackDivider } from "@chakra-ui/react"
import { redirect } from '../commons/Redirect'
import { MainHeader } from '../components/MainHeader'
import { RedirectableComponent, RedirectableState } from '../components/RedirectableComponent'


export class HomePage extends RedirectableComponent<{}, RedirectableState> {

  constructor(props: any) {
    super(props)
    this.state = {
      shouldRedirect: false,
      redirectTo: ''
    }
  }

  content() {
    return <Stack spacing='1px'>
      
      <MainHeader page={this} />

      <Stack direction='row' spacing='1px'>

        <Stack padding='4'
               bg='gray.200'
               borderRadius='7px'
               minW='200px'
               divider={<StackDivider borderColor='gray.500' />}>

          <Button colorScheme="orange"
                  variant="solid"
                  textColor='gray.700'
                  onClick={() => redirect('/logIn', this)}>
            Log In
          </Button>
          
          <Button colorScheme="orange"
                  variant="solid"
                  textColor='gray.700'
                  onClick={() => redirect('/signUp', this)}>
            Sign Up
          </Button>

        </Stack>

        <Stack spacing='1px'>

          <Image src={'https://pressover.news/wp-content/uploads/2019/04/dc-marvel.jpg'} borderRadius='7px' />

        </Stack>

      </Stack>

    </Stack>
  }
}
