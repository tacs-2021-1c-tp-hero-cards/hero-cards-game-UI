import React from 'react'
import { Box, Center, Image, Stack } from "@chakra-ui/react"
import { MainHeader } from '../components/MainHeader'
import tumbleweed from '../tumbleweed.png'


export function UnexpectedErrorPage() {

    return( 
        <Stack spacing='1px'>
            <MainHeader />

            <Box bg='red.600' borderRadius='7px'>
                <Center padding='4' fontSize='xl' fontWeight='bold'>
                    We're sorry! It seems we had a problem loading your page. Please, try again later.
                </Center>
            </Box>

            <Box bg='gray.100' borderRadius='7px'>
                <Center>
                    <Box maxWidth='600px'>
                        <Image maxBlockSize='300px' src={tumbleweed}/>
                    </Box>
                </Center>
            </Box>

        </Stack>
    )
}