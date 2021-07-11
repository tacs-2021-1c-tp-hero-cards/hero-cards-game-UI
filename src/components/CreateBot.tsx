import React, { useState } from "react"
import { AddIcon, CloseIcon } from "@chakra-ui/icons"
import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, 
        DrawerHeader, DrawerBody, Stack, Box, FormLabel, Input, InputGroup, DrawerFooter, 
        StackDivider, InputRightElement, Checkbox, SimpleGrid, IconButton, Text, CircularProgress, Center, Tooltip, Radio, RadioGroup, FormControl } from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { FormField, UnrequiredGenericForm } from "./Form"
import { isNonEmpty, nonEmpty } from "../commons/InputValidations"
import { Card, CardAttributes, isInvalidCard } from "./Card"
import { NewDeck } from "./Deck"
import { Collection } from "../commons/Collections"
import { ServerConnector } from "../BackendConnector"
import { SubmitableInput } from "./SubmitableInput"
import { RedirectProps, ToastProps, TokenProps, withRedirect, withToast, withTokenValidation } from "../commons/BehaviorAddOns"
import { customToast, SubmitDataErrorToast } from "../commons/Toast"
import { AiData } from "./AI"

type InnerProps = { alignSelf: string }
type DrawerProps = RedirectProps & TokenProps & ToastProps & InnerProps

export function CreateBot(props: InnerProps) { return( withRedirect(props) (withTokenValidation) (withToast) (CreateBotContent) )}

function CreateBotContent({ alignSelf, renderWithTokenValidation, redirect, toast }: DrawerProps) {
    const initialRef = React.useRef(null)
    
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [ createLoading, setCreateLoading ] = useState(false)
    const [ difficulty, setDifficulty ] = useState<string>('easy')

    type Submitable = { name: string }

    function onSubmit({ name }: Submitable) {
        setCreateLoading(true)

        const AI: AiData = { 
            name: name,
            difficulty: difficulty
        }

        ServerConnector.createAI(
            AI,
            (botId) => {
                setCreateLoading(false)
                onClose()
                toast(customToast('Success!', 'success', `Bot with id ${botId} created successfully`))
            },
            (_) => {
                setCreateLoading(false)
                toast(SubmitDataErrorToast)
            }
        )
    }

    function content() {
        return (
            <Box alignSelf={alignSelf}>
                <Button leftIcon={<AddIcon />} colorScheme='green' onClick={onOpen} >
                    Create
                </Button>
                <Drawer isOpen={isOpen} size='sm' placement="right" onClose={onClose} initialFocusRef={initialRef} >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth="1px">
                            Create a new bot
                        </DrawerHeader>
    
                        <DrawerBody>
                            <Formik initialValues={{ name: '' }} onSubmit={onSubmit}>
                                {(props: any) => 
                                    <Form id='createBot'>
                                        <Stack spacing="24px" divider={<StackDivider />}>
                                            <FormField  id="name" 
                                                        validation={nonEmpty} 
                                                        formField={({ field, form }: any) => 
                                                            <UnrequiredGenericForm field={field}
                                                                    error={form.errors.name}
                                                                    touched={form.touched.name}
                                                                    id='name'
                                                                    label='Name'
                                                                    placeholder="Please enter bot's name"
                                                                    />} />

                                                <Stack name="difficulty" >
                                                    <FormLabel htmlFor='difficulty'>Search bots by difficulty</FormLabel>
                                                    <RadioGroup onChange={setDifficulty} value={difficulty}>
                                                        <Stack direction="row">
                                                            <Radio value="easy">Easy</Radio>
                                                            <Radio value="medium">Medium</Radio>
                                                            <Radio value="hard">Hard</Radio>
                                                            <Radio value="crazy">Crazy</Radio>
                                                        </Stack>
                                                    </RadioGroup>
                                                </Stack>

                                        </Stack>
                                    </Form>
                                }
                            </Formik>
                        </DrawerBody>
    
                        <DrawerFooter borderTopWidth="1px">
                            <Button ref={initialRef} variant="outline" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" type='submit' form='createBot'  isLoading={createLoading} loadingText="Creating">Create</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Box>
        )
    }

    return(renderWithTokenValidation(content))
}
