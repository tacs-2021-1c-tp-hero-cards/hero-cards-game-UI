import React from "react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { MainHeader } from "../components/MainHeader";
import { CreateBot } from "../components/players/bots/CreateBot";
import { StackDivider } from "@chakra-ui/react";
import { AdminSupportProps, TokenProps, withAdminValidation, withTokenValidation } from "../commons/BehaviorAddOns";
import { UsersSearchBox } from "../components/players/UserSearchBox";


export default function BotsPage() { return( withTokenValidation({}) (withAdminValidation) (BotsContent) )}

type DecksProps = TokenProps & AdminSupportProps

function BotsContent({ renderWithTokenValidation, renderWithAdminValidation }: DecksProps) {

    return( renderWithTokenValidation(() => renderWithAdminValidation(content)))

    function content() {
        return(
            <Box>
                <Stack spacing='1px'>
                    <MainHeader hideManageBotsButton />

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

                            <UsersSearchBox userType='AI' onUserClick={() => { /* TODO: DO SOMETHING!*/}}/>
                        
                        </Stack>
                    </Stack>
                </Stack>

            </Box>
        )
    }

}