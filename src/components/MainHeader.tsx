import { Box, Center, Button } from "@chakra-ui/react";
import React from "react";
import { redirect } from "../commons/Redirect";


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
                    Hero Cards Game!
                </Button>
            </Center>
        </Box>
    )
}