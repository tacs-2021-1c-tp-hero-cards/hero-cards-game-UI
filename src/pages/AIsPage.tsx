import React from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { MainHeader } from "../components/MainHeader";
import { CreateBot } from "../components/CreateBot";
import { StackDivider } from "@chakra-ui/react";
import { AdminSupportProps, RedirectProps, TokenProps, withAdminValidation, withRedirect, withTokenValidation } from "../commons/BehaviorAddOns";
import { UsersSearchBox } from "../components/UserSearchBox";


export function BotsPage() { return( withTokenValidation({}) (withRedirect) (withAdminValidation) (BotsContent) )}

type DecksProps = TokenProps & RedirectProps & AdminSupportProps

function BotsContent({ renderWithTokenValidation, redirect, renderWithAdminValidation }: DecksProps) {

    return( renderWithTokenValidation(() => renderWithAdminValidation(content)))

    function content() {
        return(
            <Box>
                <Stack spacing='1px'>
                    <MainHeader logOutButton userPageButton searchCardsButton manageDecksButton />

                    <Stack direction='row' spacing='1px'>

                        <Stack  bg='gray.300'
                                borderRadius='7px'
                                padding='4'
                                boxSize='full'
                                spacing='4'
                                divider={<StackDivider borderColor='gray.500' />}>

                            <Stack spacing='3.5'>
                                <Text fontWeight='bold' fontSize='xl'>Create bot</Text>

                                <Text fontSize='md' paddingLeft='3'>
                                    If you want to create a new deck, by selecting the cards it will contain,
                                    then click the button below
                                </Text>
                                
                                <Box paddingLeft='3'>
                                    <CreateBot  alignSelf='left' />
                                </Box>
                            </Stack>

                            <UsersSearchBox userType='AI' onUserClick={() => {}}/>
                        
                        </Stack>
                    </Stack>
                </Stack>

            </Box>
        )
    }

}