import { Box, Center, Image } from "@chakra-ui/react";
import React from "react";


export function PageInProgress({ page }: any) {

    return (
        <Box bg='grey' borderRadius='7px' width='full'>
            <Center paddingTop='30px'>
                <Image src='https://lita.upc.edu/es/media/workinprogress_01.png' />
            </Center>
            <Center padding='4' fontSize='xl' fontStyle='italic' fontWeight='bold'>
                We are sorry! {page} page is still in progress 
            </Center>
        </Box>)
}