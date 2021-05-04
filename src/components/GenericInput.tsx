import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import React, { Component } from "react"


type Props = {
    id: string,
    label: string,
    placeholder: string
}

export class UnrequiredInput extends Component<Props, {}> {

    render() {
        return (
            <FormControl id={this.props.id} maxWidth='300px'>
                <FormLabel>{this.props.label}</FormLabel>
                <Input bg='white' placeholder={this.props.placeholder} />
            </FormControl>
        )
    }
}

export class RequiredInput extends Component<Props, {}> {

    render() {
        return (
            <FormControl id={this.props.id} isRequired maxWidth='300px'>
                <FormLabel>{this.props.label}</FormLabel>
                <Input bg='white' placeholder={this.props.placeholder} />
              </FormControl>
        )
    }
}


