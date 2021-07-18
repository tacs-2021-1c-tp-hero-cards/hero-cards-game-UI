import React from 'react'
import { Box, Center, Image, Stack } from "@chakra-ui/react"
import { MainHeader } from '../components/MainHeader'


export default function NotFoundPage() {

    return(
        <Stack spacing='1px'>

            <MainHeader showBanner />

            <Box bg='yellow.400' borderRadius='7px'>
                <Center padding='4' fontSize='xl' fontWeight='bold'>
                    404 - Page Not Found!
                </Center>
            </Box>

            <Box bg='gray.100' borderRadius='7px'>
                <Center>
                    <Box maxWidth='600px'>
                        <Image src='https://www.initcoms.com/wp-content/uploads/2020/07/404-error-not-found-1.png'/>
                    </Box>
                </Center>
            </Box>

        </Stack>
    )
}