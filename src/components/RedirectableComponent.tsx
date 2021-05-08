import React, { Component } from 'react'
import { Box, Button, Center, Image, Stack, Text } from "@chakra-ui/react"
import { Redirect } from 'react-router-dom'
import { MainHeader } from '../components/MainHeader'


export type RedirectableState = {
    shouldRedirect: boolean,
    redirectTo: string
}

export abstract class RedirectableComponent<Props, State extends RedirectableState> extends Component<Props, State> {

    redirect(to: string) {
        this.setState({
            redirectTo: to,
            shouldRedirect: true
          })
    }

    render() {
        return this.state.shouldRedirect ? <Redirect to={this.state.redirectTo} /> : this.content()
    }

    abstract content(): any

}

