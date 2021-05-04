import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react"
import React, { Component } from "react"

type Props = {
    label: string,
    placeholder: string
}

export class RequiredPasswordInput extends Component<Props, {}> {

    render() {
        return (

            <FormControl id="password" isRequired maxWidth='300px'>
                <PasswordInput label={this.props.label} placeholder={this.props.placeholder}/>
            </FormControl>
        )
    }
}

export class UnrequiredPasswordInput extends Component<Props, {}> {

    render() {
        return (

            <FormControl id="password" maxWidth='300px'>
                <PasswordInput label={this.props.label} placeholder={this.props.placeholder}/>
            </FormControl>
        )
    }
}

function PasswordInput(props: Props) {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Box>
            <FormLabel>{props.label}</FormLabel>
            <InputGroup size="md">
                <Input
                    bg='white'
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder={props.placeholder}
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