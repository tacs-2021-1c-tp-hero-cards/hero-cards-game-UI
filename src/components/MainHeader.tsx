import { Box, Center, Button, Image, Stack, Tooltip } from "@chakra-ui/react";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import logo from '../logo.png'


export function MainHeader() {
    let history = useHistory()

    function goHome() {
        history.push('/')
    }

    return (
        <Box backgroundColor='blue.500' borderRadius='7px'>
            <Center>
                <Button height="20"
                        fontStyle='italic'
                        fontWeight='bold'
                        fontSize='3xl'
                        variant='unstyled'
                        onClick={goHome}>
                            
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