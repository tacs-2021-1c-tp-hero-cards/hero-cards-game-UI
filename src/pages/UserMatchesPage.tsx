import React from 'react'
import { Button, Center, Stack, StackDivider } from "@chakra-ui/react"
import { MainHeader } from '../components/MainHeader'
import { RedirectProps, TokenProps, withRedirect, withTokenValidation } from '../commons/BehaviorAddOns'
import { AiIcon, UsersIcon } from '../components/icons'

export function UserMatchesPage() { return( withRedirect({}) (withTokenValidation) (UserMatchesContent) )}

type UserProps = RedirectProps & TokenProps

function UserMatchesContent({ redirect, renderWithTokenValidation }: UserProps) {

    return( renderWithTokenValidation(content) )

    function content() {
        return (
            <Stack spacing='1px'>
                
                <MainHeader logOutButton userPageButton searchCardsButton />

                <Stack direction='row' spacing='1px'>
                    <Stack  bg='gray.300'
                            borderRadius='7px'
                            padding='4'
                            boxSize='full'
                            spacing='4'
                            divider={<StackDivider borderColor='gray.500' />}>

                            <Center fontSize='4xl'>Play!</Center>
                            
                            <Stack direction='row' divider={<StackDivider borderColor='gray.400' />}>
                                <Stack textAlign='center'>
                                    <Center fontSize='2xl'>Against an AI</Center>

                                    <Center>
                                        Battle against an AI to test a deck before trying to fight other players or just for fun.
                                    </Center>

                                    <Button colorScheme="teal"
                                            disabled
                                            leftIcon={<AiIcon />}
                                            variant="solid"
                                            width='8rem'
                                            alignSelf='center'
                                            onClick={() => {/* TODO: do something! */}}>
                                        Let's go!
                                    </Button>
                                </Stack>

                                <Stack textAlign='center'>
                                    <Center fontSize='2xl'>Against another player</Center>

                                    <Center textAlign='center'>
                                        Test yourself against other players in battle, and climb to the top of the scoreboard!
                                    </Center>

                                    <Button colorScheme="teal"
                                            leftIcon={<UsersIcon />}
                                            variant="solid"
                                            width='8rem'
                                            alignSelf='center'
                                            onClick={() => {/* TODO: do something! */}}>
                                        Let's go!
                                    </Button>
                                </Stack>
                            </Stack>
                        
                    </Stack>

                </Stack>
            </Stack>
        )
    }
}