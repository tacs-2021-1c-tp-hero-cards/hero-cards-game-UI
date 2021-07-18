import React from "react"
import { Button } from "@chakra-ui/react"
import { ReturnIcon } from "./icons"

type Props = {
    fontSize?: string,
    returnLike: () => void
}

export default function ReturnButton({ fontSize, returnLike }: Props) {
    return (
        <Button onClick={returnLike}
                leftIcon={<ReturnIcon />}
                size='md'
                width='7rem'
                fontSize={fontSize ?? 'xl'}
                variant='solid'
                colorScheme='yellow'>
            Return
        </Button>
    )
}