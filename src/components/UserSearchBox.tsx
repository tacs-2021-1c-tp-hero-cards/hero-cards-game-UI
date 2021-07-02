import React, { useState } from "react";
import { Alert, AlertIcon, Box, Center, CircularProgress, Stack, Table, Tbody, Td, Tr, Text } from "@chakra-ui/react";
import { SubmitableInput } from "./SubmitableInput"
import { isNonEmpty } from "../commons/InputValidations"
import { Collection } from "../commons/Collections"
import { ServerConnector } from "../BackendConnector"
import { User, UserPreview } from "./User";


type Props = {
    onUserClick: (_: User) => void
}

export function UsersSearchBox({ onUserClick }: Props) {

    const [ users, setUsers ] = useState(Collection.empty<User>())
    const [ isLoading, setIsLoading ] = useState(false)
    const [ searchByFullNameIsLoading, setSearchByFullNameIsLoading ] = useState(false)
    const [ searchByUsernameIsLoading, setSearchByUsernameIsLoading ] = useState(false)
    const [ searchByIdIsLoading, setSearchByIdIsLoading ] = useState(false)
    const [ searchInitiated, setSearchInitiated ] = useState(false)
    const [ userError, setUserError ] = useState(false)

    return (
        <Stack spacing='3.5'>
            <Text fontWeight='bold' fontSize='xl'>Search decks</Text>
            
            <Box paddingLeft='3'>
                <SubmitableInput    id='searchUserByUsername' 
                                    placeHolder='Please enter username'
                                    buttonLabel='Search'
                                    label='Search user by username' 
                                    isValid={isNonEmpty}
                                    onClick={searchUsersByUsername}
                                    isLoading={searchByUsernameIsLoading} />
            </Box>

            <Box paddingLeft='3'>
                <SubmitableInput    id='searchUserByFullName' 
                                    placeHolder="Please enter user's full name"
                                    buttonLabel='Search'
                                    label='Search user by full name' 
                                    isValid={isNonEmpty}
                                    onClick={searchUsersByFullName}
                                    isLoading={searchByFullNameIsLoading} />
            </Box>

            <Box paddingLeft='3'>
                <SubmitableInput    id='searchUserById' 
                                    placeHolder='Please enter user id'
                                    buttonLabel='Search'
                                    label='Search user by id' 
                                    isValid={isNonEmpty}
                                    onClick={searchUsersById}
                                    isLoading={searchByIdIsLoading} />
            </Box>

            {searchInitiated ?  renderUsers() : <></>}
        </Stack>
    )

    function searchUsersById(id: string) {
        setSearchByIdIsLoading(true)
        setIsLoading(true)
        setSearchInitiated(true)

        ServerConnector
            .getUsersById(
                id, 
                (users) => {
                    setSearchByIdIsLoading(false)
                    setIsLoading(false)
                    setUserError(false)
                    setUsers(Collection.wrap(users))
                },
                (_) => {
                    setSearchByIdIsLoading(false)
                    setIsLoading(false)
                    setUserError(true)
                }
            )
    }

    function searchUsersByUsername(username: string) {
        setSearchByUsernameIsLoading(true)
        setIsLoading(true)
        setSearchInitiated(true)

        ServerConnector
            .getUsersByUsername(
                username, 
                (users) => {
                    setSearchByUsernameIsLoading(false)
                    setIsLoading(false)
                    setUserError(false)
                    setUsers(Collection.wrap(users))
                },
                (_) => {
                    setSearchByUsernameIsLoading(false)
                    setIsLoading(false)
                    setUserError(true)
                }
            )
    }

    function searchUsersByFullName(fullName: string) {
        setSearchByFullNameIsLoading(true)
        setIsLoading(true)
        setSearchInitiated(true)

        ServerConnector
            .getUsersByFullName(
                fullName, 
                (users) => {
                    setSearchByFullNameIsLoading(false)
                    setIsLoading(false)
                    setUserError(false)
                    setUsers(Collection.wrap(users))
                },
                (_) => {
                    setSearchByFullNameIsLoading(false)
                    setIsLoading(false)
                    setUserError(true)
                }
            )
    }
    
    function renderUsers() {
    
        return (
                                                    
            <Stack paddingLeft='3'>
    
                {
                    isLoading ? 
                                                    
                        <Center>
                            <CircularProgress isIndeterminate color="green.300" />  
                        </Center> :
                        
                        userError ? 
    
                        <Alert status="error">
                            <AlertIcon />
                            There was an error processing your request
                        </Alert> :
                            
                            users.isEmpty() ? 
                            
                                <Text>No users to show</Text> : 
                                
                                <Table variant='striped' colorScheme='blue'> 
                                    <Tbody>
                                        { 
                                            users.map( user => 
                                                <Tr>
                                                    <Td borderRadius='1rem'>
                                                        <UserPreview key={user.token} user={user} onClick={() => onUserClick(user)} />
                                                    </Td>
                                                </Tr>
                                            ).collection
                                        } 
                                    </Tbody>
                                </Table>
                }
            </Stack>
        )
    }
}
