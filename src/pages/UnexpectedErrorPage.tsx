import React from 'react'
import { Box, Center, Image, Stack } from "@chakra-ui/react"
import { MainHeader } from '../components/MainHeader'
import { RedirectableComponent, RedirectableState } from '../components/RedirectableComponent'
import tumbleweed from '../tumbleweed.png'


export class UnexpectedErrorPage extends RedirectableComponent<{}, RedirectableState> {

    constructor(props: any) {
        super(props)
        this.state = {
            shouldRedirect: false,
            redirectTo: ''
        }
    }

    content() {
        return <Stack spacing='1px'>
            <MainHeader page={this}/>

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
    }
}