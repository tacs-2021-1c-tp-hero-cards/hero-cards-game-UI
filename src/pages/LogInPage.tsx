import React from 'react'
import { Box, Button, Stack, StackDivider, Text } from "@chakra-ui/react"
import { LogInForm } from '../components/LogInForm'
import { MainHeader } from '../components/MainHeader'
import { useHistory } from 'react-router'


export function LogInPage() {
  let history = useHistory()

  function redirect(to: string) {
    return () => history.push(to)
  }

  return(
    <Stack spacing='1px'>
      
      <MainHeader />

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
            <Button fontSize='sm' colorScheme="blue" variant="link" onClick={redirect('/signUp')}>
              here
            </Button>
          for free!</Text>
        </Box>

      </Stack>
    </Stack>
  )
}