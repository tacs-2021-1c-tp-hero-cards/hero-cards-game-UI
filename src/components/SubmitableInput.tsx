import { FormControl, FormLabel, Input, FormErrorMessage, Button, InputGroup, InputRightElement, Stack, Tooltip } from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import React from "react"
import { useState } from "react"

type InputProps = {
    id: string, 
    placeHolder: string, 
    buttonLabel: string,
    label?: string,
    isValid: (value: string) => boolean, 
    onClick: (value: string) => void
}
export function SubmitableInput({ id, placeHolder, buttonLabel, label, isValid, onClick }: InputProps) {
  const [input, setInput] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)

  function handleChange(value: string) {
    setIsInvalid(false)
    setInput(value)
  }

  function handleClick() {
    if (!isValid(input)) {
      setIsInvalid(true)
    } else {
      onClick(input)
    }
  }

  return (
    <Stack>
      <FormLabel>{label}</FormLabel>

      <InputGroup>
        <Tooltip bg='crimson' arrow='crimson' hasArrow label='Cannot be empty!' placement='bottom' isOpen={isInvalid}>
          <Input
              type="text"
              id={id}
              fontStyle='italic'
              placeholder={placeHolder}
              onChange={(e) => handleChange(e.target.value)}
              isInvalid={isInvalid} />
        </Tooltip>

        <InputRightElement width='5rem'>
            <Button size='md' height='2.35rem' onClick={handleClick}>
                {buttonLabel}
            </Button>
        </InputRightElement>
      </InputGroup>
    </Stack>
  )
}


  /*
  <Formik
        initialValues={{ value: "" }}
        onSubmit={(value: any, actions) => {
            console.log('about to submit')
            console.log(value)
            //onClick(value)

            actions.setSubmitting(false)
        }}
      >
        {(props) => (
          <Form>
                <Field name={id} validate={inputValidation}>
                    {({ field, form }: any) => (
                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                        {label? <FormLabel htmlFor={id}>{label}</FormLabel> : <></>}
                            <Input {...field} id={id} placeholder={placeHolder} />
                                <Button size='md' 
                                        height='2.35rem'
                                        colorScheme="teal"
                                        type="submit" >
                                    {buttonLabel}
                                </Button>
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
          </Form>
        )}
      </Formik>
  */