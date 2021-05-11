import { Box, Center, Button, Image, Stack, Tooltip } from "@chakra-ui/react";
import React from "react";
import { redirect } from "../commons/Redirect";
import logo from '../logo.png'


export function MainHeader({ page }: any) {
    return (
        <Box backgroundColor='blue.500' borderRadius='7px'>
            <Center>
                <Button h="100px"
                        fontStyle='italic'
                        fontWeight='bold'
                        fontSize='3xl'
                        variant='unstyled'
                        onClick={() => redirect('/', page)}>
                            
                    <Stack direction='row'>
                        <Tooltip hasArrow label='Home' placement='bottom'>
                            <Image boxSize='60px' src={logo} />
                        </Tooltip>

                        <Center>
                            Hero Cards Game!
                        </Center>
                    </Stack>
                </Button>
            </Center>
        </Box>
    )
}