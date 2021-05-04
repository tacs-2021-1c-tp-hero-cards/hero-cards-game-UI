import { FormControl, FormLabel, FormErrorMessage, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react"
import { Field } from "formik"
import React from "react"

export function FormField({ id, formField, validation }: any) {
    return <Field name={id} validate={validation}>{formField}</Field>
}

type FormProps = {
    field: any,
    error: any,
    touched: any,
    id: string,
    label: string,
    placeholder: string
}

export function GenericForm(props: FormProps) {
    return <RequiredFormInput props={props} input={GenericFormInput} />
}

export function PasswordForm(props: FormProps) {
    return <RequiredFormInput props={props} input={PasswordFormInput} />
}

export function RequiredFormInput({ props, input }: any) {
    return <FormControl isInvalid={props.error && props.touched} isRequired>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        {input(props)}
        <FormErrorMessage>{props.error}</FormErrorMessage>
    </FormControl>
}

export function GenericFormInput(props: FormProps) {
    return <Input {...props.field} id={props.id} placeholder={props.placeholder} bg='white' />
}

export function PasswordFormInput(props: FormProps) {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <InputGroup size='md'>
            <Input {...props.field}
                id={props.id}
                bg='white'
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder={props.placeholder}
            />
            <InputRightElement width='4.4rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}
