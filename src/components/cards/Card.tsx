import { Box, Center, Stack, StackDivider, Text, Image, Tooltip } from "@chakra-ui/react"
import React from "react"
import Collection from '../../commons/Collections'


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
                            <Text>{ attributeValue(attributes.powerstats.height) }</Text>
                            <Center boxSize='full' >Height</Center>
                        </Stack>
                        <Stack direction='row-reverse' >
                            <Text>{ attributeValue(attributes.powerstats.weight) }</Text>
                            <Center boxSize='full' >Weight</Center>
                        </Stack>
                        <Stack direction='row-reverse' >
                            <Text>{ attributeValue(attributes.powerstats.intelligence) }</Text>
                            <Center boxSize='full' >Intelligence</Center>
                        </Stack>
                        <Stack direction='row-reverse' >
                            <Text>{ attributeValue(attributes.powerstats.speed) }</Text>
                            <Center boxSize='full' >Speed</Center>
                        </Stack>
                    </Stack>
                    
                    <Stack spacing='1px' fontSize='xs' paddingRight='5px' >
                        <Stack direction='row-reverse' paddingRight='10px' >
                            <Text>{ attributeValue(attributes.powerstats.power) }</Text>
                            <Center boxSize='full' >Power</Center>
                        </Stack>
                        <Stack direction='row-reverse' paddingRight='10px' >
                            <Text>{ attributeValue(attributes.powerstats.combat) }</Text>
                            <Center boxSize='full' >Combat</Center>
                        </Stack>
                        <Stack direction='row-reverse' paddingRight='10px' >
                            <Text>{ attributeValue(attributes.powerstats.strength) }</Text>
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

function isInvalidAttribute(attribute: number | undefined): boolean {
    return attribute ? attribute < 0 : true
}

function attributeValue(attribute: number | undefined) {
    return isInvalidAttribute(attribute) ? '???' : attribute
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


export type CharacterDetails = {
    id: number,
    name: string,
    powerstats: CharacterStats,
    biography: Biography,
    appearance: Appearance,
    work: Work,
    connections: Connections
}

type CharacterStats = {
    intelligence?: string,
    strength?: string,
    speed?: string,
    durability?: string,
    power?: string,
    combat?: string
}

type Biography = {
    fullName?: string,
    alterEgos?: string,
    aliases: string[],
    placeOfBirth?: string,
    firstAppearance?: string,
    publisher?: string,
    alignment?: string
}

type Appearance = {
    gender?: string,
    race?: string,
    height: string[],
    weight: string[],
    eyeColor?: string,
    hairColor?: string
}

type Work = {
    occupation?: string,
    base?: string
}

type Connections = {
    groupAffiliation?: string,
    relatives?: string
}


type InsightProps = {
    character: CharacterDetails,
    card?: CardAttributes
}

function cleanText(text: string | undefined): string | undefined {
    return (text ? Collection.from(text) : Collection.empty())
                .filter(base => base != '' && base != '-')
                .head()
}

export function CharacterInsights({ character, card }: InsightProps)  {
    return (
        <Stack  padding='4px'
                borderRadius='0.5rem' 
                spacing='0.5rem'
                divider={<StackDivider borderColor='gray.700' />} >
                    
            <Text fontSize='xx-large'>{character.name}</Text>

            <Stack direction='row-reverse'>
                {
                    card ?
                        <Image src={card.imageUrl} 
                                fallbackSrc='https://pbs.twimg.com/profile_images/798356695860723712/-NpEsPw9_400x400.jpg' 
                                border='2px' 
                                borderColor='gray.500' 
                                borderRadius='0.75rem'
                                objectFit='cover' 
                                height='30rem'
                                maxWidth='25rem' /> :
                        <></>
                }

                <Stack  padding='4px'
                        borderRadius='0.5rem' 
                        spacing='0.5rem'
                        boxSize='full'
                        divider={<StackDivider borderColor='gray.400' />} >

                    <Stack direction='row' spacing='4px' fontSize='xl'>
                        <Text>Id:</Text>
                        <Text>{character.id}</Text>
                    </Stack>
                    
                    <Stack spacing='0.2rem'>
                        <Text fontSize='xl'>Personal information</Text>
                        
                        <Stack spacing='0.1rem' paddingLeft='2rem'>
                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Real name:</Text>
                                <Text>{ character.biography.fullName ?? 'Unknown' }</Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold' minWidth='7.35rem'>Also known as:</Text>
                                <Text>
                                    { 
                                        Collection
                                            .wrap(character.biography.aliases)
                                            .filter(alias => alias != '' && alias != '-')
                                            .makeString(', ', 'Unknown') 
                                    }
                                </Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Alignment:</Text>
                                <Text>{ character.biography.alignment ?? 'Not registered' }</Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Place of birth:</Text>
                                <Text>{ character.biography.placeOfBirth ?? 'Unknown' }</Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Alter egos:</Text>
                                <Text>{ character.biography.alterEgos ?? 'Not registered' }</Text>
                            </Stack>
                        </Stack>

                    </Stack>
                    
                    <Stack spacing='0.2rem'>
                        <Text fontSize='xl'>Work and connections</Text>
                        
                        <Stack spacing='0.1rem' paddingLeft='2rem'>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Occupation:</Text>
                                <Text>{ cleanText(character.work.occupation) ?? 'Not registered' }</Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Base:</Text>
                                <Text>
                                    { cleanText(character.work.base) ?? 'Unknown' }
                                </Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Relatives:</Text>
                                <Text>{ cleanText(character.connections.relatives) ?? 'Not registered' }</Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Group affiliation:</Text>
                                <Text>{ character.connections.groupAffiliation ?? 'Unknown' }</Text>
                            </Stack>
                        </Stack>

                    </Stack>
                    
                    <Stack spacing='0.2rem'>
                        <Text fontSize='xl'>Stats</Text>
                        
                        <Stack spacing='0.1rem' paddingLeft='2rem'>
                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Combat:</Text>
                                <Text>{ attributeValue(card?.powerstats.combat) }</Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Intelligence:</Text>
                                <Text>{ attributeValue(card?.powerstats.intelligence) }</Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Power:</Text>
                                <Text>{ attributeValue(card?.powerstats.power) }</Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Speed:</Text>
                                <Text>{ attributeValue(card?.powerstats.speed) }</Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Strength:</Text>
                                <Text>{ attributeValue(card?.powerstats.strength) }</Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Durability:</Text>
                                <Text>{ attributeValue(+(character.powerstats.durability ?? '')) }</Text>
                            </Stack>
                        </Stack>

                    </Stack>
                    
                    <Stack spacing='0.2rem'>
                        <Text fontSize='xl'>Appearance</Text>
                        
                        <Stack spacing='0.1rem' paddingLeft='2rem'>
                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Gender:</Text>
                                <Text>{ character.appearance.gender ?? 'Unknown' }</Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Race:</Text>
                                <Text>{ character.appearance.race ?? 'Unknown' }</Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Height:</Text>
                                <Text>{ attributeValue(card?.powerstats.height) }</Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Weight:</Text>
                                <Text>{ attributeValue(card?.powerstats.weight) }</Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>Eye colour:</Text>
                                <Text>{ character.appearance.eyeColor ?? 'Unknown' }</Text>
                            </Stack>

                            <Stack direction='row' spacing='4px' fontSize='md'>
                                <Text fontWeight='bold'>hairColor:</Text>
                                <Text>{ character.appearance.hairColor ?? 'Unknown' }</Text>
                            </Stack>
                        </Stack>

                    </Stack>
                </Stack>

            </Stack>
        </Stack>
    )
}