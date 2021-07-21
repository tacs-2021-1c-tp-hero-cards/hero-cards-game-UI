import React from "react"
import { withRedirect, RedirectProps } from '../../commons/BehaviorAddOns'
import { Button } from "@chakra-ui/button"
import { UserIcon } from "./icons"
import getStats from "../../commons/GetStats"

type HubButtonProps = {
    width?: string
}

export default function MyHubHutton(props: HubButtonProps) {return withRedirect(props) (HubButton)}

type Props = HubButtonProps & RedirectProps

function HubButton({ width, redirect }: Props) {
    return (
        <Button colorScheme="blue"
                leftIcon={<UserIcon />}
                variant="solid"
                textColor='gray.700'
                fontSize='xl'
                width={width}
                onClick={() => {
                    getStats()
                    redirect('/user')
                }}>
            My hub
        </Button>
    )
}