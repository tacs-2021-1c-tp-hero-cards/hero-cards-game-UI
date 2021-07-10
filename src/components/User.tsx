import React from "react"
import { Stack, Text } from "@chakra-ui/react"

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
        <Stack  bgColor='blue.300' 
                padding='1rem' 
                borderRadius='0.4rem'
                cursor='pointer'
                onClick={() => onClick(user)}>
            <Text fontWeight='bold' paddingLeft='1rem' >{user.userName}</Text>
        </Stack>
    )
}