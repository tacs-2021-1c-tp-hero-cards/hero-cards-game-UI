import { Box, Center, Stack, StackDivider, Text, Image, Checkbox } from "@chakra-ui/react"
import React from "react"


export type CardAttributes = {
    id: number,
    name: string,
    powerstats: PowerStats,
    imageUrl: string
}

export type PowerStats = {
    height: number,
    weight: number,
    intelligence: number,
    speed: number,
    power: number,
    combat: number,
    strength: number
}

type Props = {
    attributes: CardAttributes,
    onClick?: any,
    addOn?: any
}

export function Card( { attributes, onClick, addOn }: Props) {

    return(
        <Stack  bg='orange.200'
                padding='4px'
                borderRadius='5px' 
                border='2px' 
                borderColor='gray.600'
                width='210px'
                spacing='3px'
                onClick={onClick}
                divider={<StackDivider />} >

            <Stack direction='row' >
                <Box border='1px' borderColor='gray.500' borderRadius='full' bg='beige' width='2.2rem' >
                    <Center>{attributes.id}</Center>
                </Box>
                <Center boxSize='full' fontWeight='bold' fontSize='sm' isTruncated >{attributes.name}</Center>
                {addOn}
            </Stack>

            <Box padding='5px'>
                <Center>
                    <Image src={attributes.imageUrl} border='2px' borderColor='gray.400' objectFit='cover' height='250px' />
                </Center>
            </Box>

            <Stack bg='orange.100' borderRadius='2px' spacing='3px' border='2px' borderColor='orange.300'>

                <Stack direction='row' divider={<StackDivider borderColor='orange.200' height='70px' alignSelf='center'/>}>
                    <Stack spacing='1px' paddingRight='5px' paddingLeft='5px' fontSize='xs' >
                        <Stack direction='row-reverse' >
                            <Text>{attributes.powerstats.height}</Text>
                            <Center boxSize='full' >Height</Center>
                        </Stack>
                        <Stack direction='row-reverse' >
                            <Text>{attributes.powerstats.weight}</Text>
                            <Center boxSize='full' >Weight</Center>
                        </Stack>
                        <Stack direction='row-reverse' >
                            <Text>{attributes.powerstats.intelligence}</Text>
                            <Center boxSize='full' >Intelligence</Center>
                        </Stack>
                        <Stack direction='row-reverse' >
                            <Text>{attributes.powerstats.speed}</Text>
                            <Center boxSize='full' >Speed</Center>
                        </Stack>
                    </Stack>
                    
                    <Stack spacing='1px' fontSize='xs' paddingRight='5px' >
                        <Stack direction='row-reverse' paddingRight='10px' >
                            <Text>{attributes.powerstats.power}</Text>
                            <Center boxSize='full' >Power</Center>
                        </Stack>
                        <Stack direction='row-reverse' paddingRight='10px' >
                            <Text>{attributes.powerstats.combat}</Text>
                            <Center boxSize='full' >Combat</Center>
                        </Stack>
                        <Stack direction='row-reverse' paddingRight='10px' >
                            <Text>{attributes.powerstats.strength}</Text>
                            <Center boxSize='full' >Strenght</Center>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}