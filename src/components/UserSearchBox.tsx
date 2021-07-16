import React, { useState } from "react";
import { Alert, AlertIcon, Box, Center, CircularProgress, Stack, Table, Tbody, Td, Tr, Text, Radio, RadioGroup, FormLabel, 
        Button } from "@chakra-ui/react";
import { SubmitableInput } from "./SubmitableInput"
import { isNonEmpty } from "../commons/InputValidations"
import Collection from "../commons/Collections"
import { ServerConnector } from "../BackendConnector"
import { User, UserPreview } from "./User";
import { AI, AiPreview } from "./AI";


type Props = {
    userType: string,
    onUserClick: (_: User | AI) => void
}

export function UsersSearchBox({ userType, onUserClick }: Props) {

    const [ users, setUsers ] = useState(Collection.empty<User>())
    const [ isLoading, setIsLoading ] = useState(false)
    const [ searchByFullNameIsLoading, setSearchByFullNameIsLoading ] = useState(false)
    const [ searchByUsernameIsLoading, setSearchByUsernameIsLoading ] = useState(false)
    const [ searchByDifficultyIsLoading, setSearchByDifficultyIsLoading ] = useState(false)
    const [ searchBotsWithLimitIsLoading, setSearchBotsWithLimitIsLoading ] = useState(false)
    const [ searchInitiated, setSearchInitiated ] = useState(false)
    const [ userError, setUserError ] = useState(false)
    const [ difficulty, setDifficulty ] = useState('easy')

    const lookingForAIs = userType === 'AI'

    return (lookingForAIs ? renderBotsSearchbox() : renderUsersSearchbox())

    function setBots(bots: Collection<AI>) {
        setUsers(
            bots.map( bot => 
                <AiPreview key={bot.id} AI={bot} onClick={() => onUserClick(bot)} />
                    
            )
        )
    }

    function setHumans(humans: Collection<User>) {
        setUsers(
            humans.map( user => 
                <UserPreview key={user.id} user={user} onClick={() => onUserClick(user)} />
            )
        )
    }

    function renderUsersSearchbox() {
        return (
            <Stack spacing='3.5'>
                <Text fontWeight='bold' fontSize='xl'>Search users</Text>
                
                <Box paddingLeft='3'>
                    <SubmitableInput    id='searchUserByUsername' 
                                        placeHolder='Please enter username'
                                        buttonLabel='Search'
                                        label='Search user by username' 
                                        isValid={isNonEmpty}
                                        onSubmit={searchUsersByUsername}
                                        isLoading={searchByUsernameIsLoading} />
                </Box>
    
                <Box paddingLeft='3'>
                    <SubmitableInput    id='searchUserByFullName' 
                                        placeHolder="Please enter user's full name"
                                        buttonLabel='Search'
                                        label='Search user by full name' 
                                        isValid={isNonEmpty}
                                        onSubmit={searchUsersByFullName}
                                        isLoading={searchByFullNameIsLoading} />
                </Box>
    
                {searchInitiated ?  renderUsers() : <></>}
            </Stack>
        )
    }

    function renderBotsSearchbox() {
        return (
            <Stack spacing='3.5'>
                <Text fontWeight='bold' fontSize='xl'>Search bots</Text>
                
                <Box paddingLeft='3'>
                    <SubmitableInput    id='searchBotsByName' 
                                        placeHolder="Please enter bot's name"
                                        buttonLabel='Search'
                                        label='Search bots by name' 
                                        isValid={isNonEmpty}
                                        onSubmit={searchBotsByName}
                                        isLoading={searchByUsernameIsLoading} />
                </Box>
    
                <Box paddingLeft='3'>
                    <FormLabel>Search bots by difficulty</FormLabel>
                    <RadioGroup onChange={setDifficulty} value={difficulty}>
                        <Stack direction="row">
                            <Radio value="easy">Easy</Radio>
                            <Radio value="medium">Medium</Radio>
                            <Radio value="hard">Hard</Radio>
                            <Radio value="crazy">Crazy</Radio>

                            <Button size='md'
                                    width='7rem'
                                    height='2.35rem' 
                                    colorScheme='linkedin'
                                    onClick={searchBotsByDifficulty} 
                                    isLoading={searchByDifficultyIsLoading}>
                                        Search
                            </Button>
                        </Stack>
                    </RadioGroup>
                </Box>
    
                <Box paddingLeft='3'>
                    <SubmitableInput    id='searchBots' 
                                        placeHolder="Enter a number or leave empty to bring them all"
                                        buttonLabel='Search'
                                        label='Search some random bots'
                                        isValid={() => true}
                                        onSubmit={searchBotsWithLimit}
                                        isLoading={searchBotsWithLimitIsLoading} />
                </Box>
    
                {searchInitiated ?  renderUsers() : <></>}
            </Stack>
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
                    setHumans(Collection.wrap(users))
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
                    setHumans(Collection.wrap(users))
                },
                (_) => {
                    setSearchByFullNameIsLoading(false)
                    setIsLoading(false)
                    setUserError(true)
                }
            )
    }
    
    function searchBotsByName(name: string) {
        setSearchByUsernameIsLoading(true)
        setIsLoading(true)
        setSearchInitiated(true)

        ServerConnector
            .getAIsByName(
                name, 
                (AIs) => {
                    setSearchByUsernameIsLoading(false)
                    setIsLoading(false)
                    setUserError(false)
                    setBots(Collection.wrap(AIs))
                },
                (_) => {
                    setSearchByUsernameIsLoading(false)
                    setIsLoading(false)
                    setUserError(true)
                }
            )
    }

    function searchBotsByDifficulty() {
        setSearchByDifficultyIsLoading(true)
        setIsLoading(true)
        setSearchInitiated(true)

        ServerConnector
            .getAIsByDificulty(
                difficulty, 
                (users) => {
                    setSearchByDifficultyIsLoading(false)
                    setIsLoading(false)
                    setUserError(false)
                    setBots(Collection.wrap(users))
                },
                (_) => {
                    setSearchByDifficultyIsLoading(false)
                    setIsLoading(false)
                    setUserError(true)
                }
            )
    }

    function searchBotsWithLimit(limit: string) {
        setSearchBotsWithLimitIsLoading(true)
        setIsLoading(true)
        setSearchInitiated(true)

        ServerConnector
            .getAIs(
                (AIs) => {
                    setSearchBotsWithLimitIsLoading(false)
                    setIsLoading(false)
                    setUserError(false)
                    
                    const shuffled = Collection.wrap(AIs).shuffle()
                    setBots(isNonEmpty(limit) && (+limit >= 0) ? shuffled.take(+limit) : shuffled)
                },
                (error) => {
                    setSearchBotsWithLimitIsLoading(false)
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
                            
                                <Text>No {lookingForAIs ? 'bots' : 'users'} to show</Text> : 
                                
                                <Table variant='striped' colorScheme='blue'> 
                                    <Tbody>
                                        { 
                                            users.map( user => 
                                                <Tr key={user.id}>
                                                    <Td borderRadius='1rem'>
                                                        {user}
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
