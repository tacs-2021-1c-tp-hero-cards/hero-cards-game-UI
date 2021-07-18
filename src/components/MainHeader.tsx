import React from "react";
import { Box, Center, Button, Image, Stack, Tooltip } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import logo from '../logo.png'
import { SideBar, SideBarProps } from "./SideBar";
import LogInBanner from './session/LogInBanner'
import { tokenIsAlive } from "../commons/Token";

type MainHeaderProps = SideBarProps & {
    showBanner?: boolean
}

export function MainHeader(props: MainHeaderProps) {
    let history = useHistory()

    function goHome() {
        history.push('/')
    }

    const isLoggedIn = tokenIsAlive()

    return (
        <Stack spacing='0px'>
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

            {
                props.showBanner && !isLoggedIn ? <LogInBanner /> : <></>
            }
        </Stack>
    )
}