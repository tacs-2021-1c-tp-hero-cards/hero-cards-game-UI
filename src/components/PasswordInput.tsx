import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import React from "react"

export function RequiredPasswordInput() {

    return (

        <FormControl id="password" isRequired maxWidth='300px'>
            <PasswordInput />
        </FormControl>
    )
}

export function UnrequiredPasswordInput() {

    return (

        <FormControl id="password" maxWidth='300px'>
            <PasswordInput />
        </FormControl>
    )
}

function PasswordInput() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Box>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
                <Input
                    bg='white'
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                />
                <InputRightElement width="4.4rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </Box>
    )
}