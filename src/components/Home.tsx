import React from 'react'
import { Text, Stack, Image, Button, Box } from "@chakra-ui/react"
import { ServerConnector } from '../BackendConnector';

export function Home(props: any) {
  return <Stack backgroundColor='red.500'>
    <Text padding='4' fontStyle='italic' fontWeight='bold'>HOME</Text>

    <Box padding='2'>
      <Button colorScheme="teal" variant="solid" onClick={ServerConnector.logOut}>
        Log out
      </Button>
    </Box>

    <Image src={'https://pressover.news/wp-content/uploads/2019/04/dc-marvel.jpg'} sizes='full' />
  </Stack>
}
