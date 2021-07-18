import React from 'react'
import { Box, Button, Stack, StackDivider, Text } from "@chakra-ui/react"
import { LogInForm } from '../components/session/LogInForm'
import { MainHeader } from '../components/MainHeader'
import { RedirectProps, withRedirect } from '../commons/BehaviorAddOns'
import { tokenIsAlive } from '../commons/Token'


export default function LogInPage() { return( withRedirect({}) (LogInContent) )}

type LogInProps = RedirectProps

function LogInContent({ redirect, renderRedirect }: LogInProps) {

  
  return( tokenIsAlive() ? renderRedirect('/user') : content() )

  function content() {
    return(
      <Stack spacing='1px'>
        
        <MainHeader hideLogInButton />

        <Stack padding='4'
              backgroundColor='gray.200'
              borderRadius='7px'
              spacing='4'
              divider={<StackDivider borderColor='gray.500' />}>

          <Text fontSize='xl' fontWeight='bold' color=''>Log into your account</Text>

          <LogInForm />

          <Box fontSize='sm' paddingLeft='8px'>
            <Text>¿You don't have an account?</Text>
            <Text>¡Sign up 
              <Button fontSize='sm' colorScheme="blue" variant="link" onClick={() => redirect('/signUp')}>
                here
              </Button>
            for free!</Text>
          </Box>

        </Stack>
      </Stack>
    )
  }
}