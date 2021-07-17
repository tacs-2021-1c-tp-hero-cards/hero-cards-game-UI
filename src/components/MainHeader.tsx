import React from "react";
import { Box, Center, Button, Image, Stack, Tooltip } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import logo from '../logo.png'
import { SideBar, SideBarProps } from "./SideBar";


export function MainHeader(props: SideBarProps) {
    let history = useHistory()

    function goHome() {
        history.push('/')
    }

    return (
        <Box backgroundColor='blue.500' borderRadius='7px' d="flex" alignItems='center'>
            
            <SideBar {...props} />

            <Center boxSize='92%'>
                <Button height="20"
                        fontStyle='italic'
                        fontWeight='bold'
                        fontSize='3xl'
                        variant='unstyled'
                        onClick={goHome}>
                            
                    <Stack direction='row'>
                        <Tooltip hasArrow label='Home' placement='bottom'>
                            <Center>
                                <Image boxSize='70px' src={logo} />
                            </Center>
                        </Tooltip>

                        <Center fontSize='5xl'>
                            Hero Cards Game!
                        </Center>
                    </Stack>
                </Button>
            </Center>
        </Box>
    )
}