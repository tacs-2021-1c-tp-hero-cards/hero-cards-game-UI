import React from 'react'
import { Stack, Text } from "@chakra-ui/react"

export function NotFoundPage(props: any) {
    return (
        <Stack backgroundColor='blue.500'>
            <Text padding='4' fontStyle='italic' fontWeight='bold'>404 - Page Not Found!</Text>
        </Stack>)
}