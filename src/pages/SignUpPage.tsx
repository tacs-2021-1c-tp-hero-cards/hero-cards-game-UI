import React from 'react'
import { Box, Button, Stack, StackDivider, Text } from "@chakra-ui/react"
import { SignUpForm } from '../components/SignUpForm'
import { MainHeader } from '../components/MainHeader'
import { RedirectProps, withRedirect } from '../commons/BehaviorAddOns'

export function SignUpPage() { return( withRedirect({}) (SignUpContent) )}

type SignUpProps = RedirectProps

function SignUpContent({ redirect }: SignUpProps) {

  return (
    <Stack spacing='1px'>
      
      <MainHeader />

      <Stack padding='4'
              backgroundColor='gray.200'
              borderRadius='7px'
              divider={<StackDivider borderColor='gray.500' />}>

        <Text fontSize='xl' fontWeight='bold'>Submit your data to sign up</Text>

        <Stack>
          <Text fontSize='sm'>Don't worry, we won't make public any of this</Text>

          <SignUpForm />
        </Stack>

        <Box fontSize='sm' padding='8px'>
          <Text>¿Already have an account? <Button fontSize='sm' 
                                                  colorScheme="blue" 
                                                  variant="link" 
                                                  onClick={() => redirect('/logIn')}>
              Log in!
            </Button>
          </Text>
        </Box>

      </Stack>

    </Stack>
  )
}
