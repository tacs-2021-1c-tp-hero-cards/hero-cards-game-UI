import React from "react"
import { Stack, Text } from "@chakra-ui/react"
import { UserIcon } from "../miscellaneous/icons"

export type User = {
    userName: string,
    fullName: string,
    password: string,
    token: string,
    id: number,
    userType: string,
    admin: boolean
    //stats
}


type Props = {
    user: User,
    onClick: (_: User) => void
}

export function UserPreview({ user, onClick }: Props) {
    return (
        <Stack  bgColor='gray.400' 
                border='2px'
                borderColor='gray.500'
                padding='1rem' 
                borderRadius='0.4rem'
                cursor='pointer'
                width='30rem'
                fontSize='xl'
                onClick={() => onClick(user)}>

            <Stack  bgColor='orange.400'
                    border='2px'
                    borderColor='orange.600'
                    padding='1rem' 
                    borderRadius='0.4rem'>

                <Stack direction='row-reverse' spacing='1rem'>
                    <UserIcon />
                    <Stack boxSize='full' maxWidth='23rem'>
                        <Text fontWeight='bold' paddingLeft='1rem' fontSize='2xl' isTruncated>{user.userName}</Text>
                        <Text paddingLeft='1rem' >Id: {user.id}</Text>
                        <Text paddingLeft='1rem' >Full name: {user.fullName}</Text>
                    </Stack>
                </Stack>

            </Stack>
        </Stack>
    )
}