import React from "react"
import { withRedirect, RedirectProps } from '../commons/BehaviorAddOns'
import { Button } from "@chakra-ui/button"
import { UserIcon } from "./icons"

type HubButtonProps = {
    width?: string
}

export default function MyHubHutton(props: HubButtonProps) {return withRedirect(props) (HubButton)}

type Props = HubButtonProps & RedirectProps

function HubButton({ width, redirect }: Props) {
    return (
        <Button colorScheme="orange"
                leftIcon={<UserIcon />}
                variant="solid"
                textColor='gray.700'
                fontSize='xl'
                width={width}
                onClick={() => redirect('/user')}>
            My hub
        </Button>
    )
}