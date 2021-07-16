import { FormLabel, Input, Button, InputGroup, InputRightElement, Stack, Tooltip, Text } from "@chakra-ui/react"
import React from "react"
import { useState } from "react"

type InputProps = {
    id: string, 
    placeHolder: string, 
    buttonLabel: string,
    label?: string,
    isValid: (value: string) => boolean, 
    onSubmit: (value: string) => void,
    isLoading?: boolean
}

export function SubmitableInput({ id, placeHolder, buttonLabel, label, isValid, onSubmit, isLoading }: InputProps) {
  const [input, setInput] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)

  function handleChange(value: string) {
    setIsInvalid(false)
    setInput(value)
  }

  function handleSubmit() {
    if (!isValid(input)) {
      setIsInvalid(true)
    } else {
      onSubmit(input)
    }
  }

  function handleKeyDown(e: any) {
    const trimmedText = e.target.value.trim()
    // If the user pressed the Enter key:
    if (e.key === 'Enter' && trimmedText) {
      handleSubmit()
    }
  } 

  return (
    <Stack>
      <FormLabel><Text>{label}</Text></FormLabel>

      <InputGroup>
        <Tooltip bg='crimson' arrow='crimson' hasArrow label='Cannot be empty!' placement='bottom' isOpen={isInvalid}>
          <Input
              type="text"
              backgroundColor='gray.200'
              id={id}
              fontStyle='italic'
              placeholder={placeHolder}
              onChange={(e) => handleChange(e.target.value)}
              isInvalid={isInvalid} 
              onKeyDown={handleKeyDown} />
        </Tooltip>

        <InputRightElement width='5rem'>
            <Button size='md'
                    width='15rem'
                    height='2.35rem' 
                    onClick={handleSubmit} 
                    colorScheme='linkedin' 
                    isLoading={isLoading}>
                      
                {buttonLabel}
            </Button>
        </InputRightElement>
      </InputGroup>
    </Stack>
  )
}
