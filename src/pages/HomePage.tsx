import React from 'react'
import { Stack, Image, Button, StackDivider } from "@chakra-ui/react"
import { MainHeader } from '../components/MainHeader'
import { RedirectProps, withRedirect } from '../commons/BehaviorAddOns'
import { NewUserIcon, UserIcon } from '../components/icons'


export function HomePage() { return( withRedirect({}) (HomeContent) )}

type HomeProps = RedirectProps

function HomeContent({ redirect }: HomeProps) {

  return (
    <Stack spacing='1px'>
      
      <MainHeader />

      <Stack direction='row' spacing='1px'>

        <Stack padding='4'
               bg='gray.200'
               borderRadius='7px'
               minW='200px'
               divider={<StackDivider borderColor='gray.500' />}>

          <Button colorScheme="orange"
                  leftIcon={<UserIcon />}
                  variant="solid"
                  textColor='gray.700'
                  onClick={() => redirect('/logIn')}>
            Log In
          </Button>
          
          <Button colorScheme="orange"
                  leftIcon={<NewUserIcon />}
                  variant="solid"
                  textColor='gray.700'
                  onClick={() => redirect('/signUp')}>
            Sign Up
          </Button>

        </Stack>

        <Stack spacing='1px'>

          <Image src={'https://pressover.news/wp-content/uploads/2019/04/dc-marvel.jpg'} borderRadius='7px' />

        </Stack>

      </Stack>

    </Stack>
  )
}

