import { Box, Center, Stack, StackDivider, Text, Image, Checkbox, Tooltip } from "@chakra-ui/react"
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
    onClick?: () => void,
    addOn?: any
}

export function Card( { attributes, onClick, addOn }: Props) {

    return(
        <Stack  bg='orange.200'
                padding='4px'
                borderRadius='0.5rem' 
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
                    <Image  src={attributes.imageUrl} 
                            fallbackSrc='https://i0.wp.com/elfutbolito.mx/wp-content/uploads/2019/04/image-not-found.png?ssl=1' 
                            border='2px' 
                            borderColor='gray.400' 
                            objectFit='cover' 
                            height='250px' />
                </Center>
            </Box>

            <Stack bg='orange.100' borderRadius='2px' spacing='3px' border='2px' borderColor='orange.300'>

                <Stack direction='row' divider={<StackDivider borderColor='orange.200' height='70px' alignSelf='center'/>}>
                    <Stack spacing='1px' paddingRight='5px' paddingLeft='5px' fontSize='xs' >
                        <Stack direction='row-reverse' >
                            <Text>{ isInvalidAttribute(attributes.powerstats.height) ? '???' : attributes.powerstats.height }</Text>
                            <Center boxSize='full' >Height</Center>
                        </Stack>
                        <Stack direction='row-reverse' >
                            <Text>{ isInvalidAttribute(attributes.powerstats.weight) ? '???' : attributes.powerstats.weight }</Text>
                            <Center boxSize='full' >Weight</Center>
                        </Stack>
                        <Stack direction='row-reverse' >
                            <Text>{ isInvalidAttribute(attributes.powerstats.intelligence) ? '???' : attributes.powerstats.intelligence }</Text>
                            <Center boxSize='full' >Intelligence</Center>
                        </Stack>
                        <Stack direction='row-reverse' >
                            <Text>{ isInvalidAttribute(attributes.powerstats.speed) ? '???' : attributes.powerstats.speed }</Text>
                            <Center boxSize='full' >Speed</Center>
                        </Stack>
                    </Stack>
                    
                    <Stack spacing='1px' fontSize='xs' paddingRight='5px' >
                        <Stack direction='row-reverse' paddingRight='10px' >
                            <Text>{ isInvalidAttribute(attributes.powerstats.power) ? '???' : attributes.powerstats.power }</Text>
                            <Center boxSize='full' >Power</Center>
                        </Stack>
                        <Stack direction='row-reverse' paddingRight='10px' >
                            <Text>{ isInvalidAttribute(attributes.powerstats.combat) ? '???' : attributes.powerstats.combat }</Text>
                            <Center boxSize='full' >Combat</Center>
                        </Stack>
                        <Stack direction='row-reverse' paddingRight='10px' >
                            <Text>{ isInvalidAttribute(attributes.powerstats.strength) ? '???' : attributes.powerstats.strength }</Text>
                            <Center boxSize='full' >Strenght</Center>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export function isInvalidCard(card: CardAttributes): boolean {
    const attributes = card.powerstats

    return  isInvalidAttribute(attributes.combat) ||        
            isInvalidAttribute(attributes.height) ||        
            isInvalidAttribute(attributes.intelligence) ||        
            isInvalidAttribute(attributes.power) ||        
            isInvalidAttribute(attributes.speed) ||        
            isInvalidAttribute(attributes.strength) ||        
            isInvalidAttribute(attributes.weight)         
}

function isInvalidAttribute(attribute: number) {
    return attribute < 0
}

type CardPreviewProps = {
    card: CardAttributes,
    height?: string,
    width?: string,
    onClick?: () => void,
    hideTooltip?: boolean
}

export function CardPreview({ card, height, width, onClick, hideTooltip }: CardPreviewProps) {
    return (
        <Box onClick={onClick} cursor={onClick ? 'pointer' : ''} width={width}>
            <Tooltip hasArrow label={card.name} placement='bottom' color='yellow' isDisabled={hideTooltip ?? false}>
                <Image  src={card.imageUrl} 
                        fallbackSrc='https://i0.wp.com/elfutbolito.mx/wp-content/uploads/2019/04/image-not-found.png?ssl=1' 
                        border='2px' 
                        borderColor='gray.500' 
                        objectFit='cover' 
                        height={height ?? '150px'} 
                        width={width}
                        borderRadius='0.5rem'/>
            </Tooltip>
        </Box>
    )
}
