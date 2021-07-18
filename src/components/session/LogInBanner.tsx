import React from "react"
import { Stack, Text, Button } from '@chakra-ui/react'
import { RedirectProps, withRedirect } from '../../commons/BehaviorAddOns'

export default function LogInBanner() { return withRedirect({}) (LogInBannerContent) }

type BannerProps = RedirectProps

function LogInBannerContent({ redirect }: BannerProps) {
    return (
        <Stack backgroundColor='yellow.100' padding='0.5rem' borderRadius='0.5rem'>
            <Stack direction='row' alignSelf='center' spacing='4px' fontSize='xl'>
                <Text>It seem that you're not logged into any account. You can</Text>
                <Button variant='link' colorScheme='teal' fontWeight='thin' fontSize='xl' onClick={() => redirect('/logIn')}>log in</Button>
                <Text>here. Or</Text>
                <Button variant='link' colorScheme='teal' fontWeight='thin' fontSize='xl' onClick={() => redirect('/signUp')}>create an account</Button>
                <Text>here.</Text>
            </Stack>
        </Stack>
    )
}