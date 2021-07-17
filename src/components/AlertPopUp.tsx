import React from "react"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, 
        Button } from "@chakra-ui/react"

type Props = {
    isOpen: boolean,
    onClose: () => void,
    header: string,
    body: string,
    onSubmit: () => void,
    fontSize?: string
}

export function AlertPopUp({ isOpen, onClose, header, body, onSubmit, fontSize }: Props) {
    const cancelRef = React.useRef(null)
  
    return (
        <AlertDialog    isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}>

            <AlertDialogOverlay>
                <AlertDialogContent fontSize={fontSize ?? 'xl'}>
                    <AlertDialogHeader fontSize="2xl" fontWeight="bold">
                        {header}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {body}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose} fontSize={fontSize ?? 'xl'} width='8rem'>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={onSubmit} ml={3} fontSize={fontSize ?? 'xl'} width='8rem'>
                            Accept
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}