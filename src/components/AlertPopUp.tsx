import React from "react"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"

type Props = {
    isOpen: boolean,
    onClose: () => void,
    header: string,
    body: string,
    onSubmit: () => void
}

export function AlertPopUp({ isOpen, onClose, header, body, onSubmit }: Props) {
    const cancelRef = React.useRef(null)
  
    return (
        <AlertDialog    isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}>

            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {header}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {body}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={onSubmit} ml={3}>
                            Accept
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}