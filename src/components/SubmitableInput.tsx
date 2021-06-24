import { FormLabel, Input, Button, InputGroup, InputRightElement, Stack, Tooltip, Text } from "@chakra-ui/react"
import React from "react"
import { useState } from "react"

type InputProps = {
    id: string, 
    placeHolder: string, 
    buttonLabel: string,
    label?: string,
    isValid: (value: string) => boolean, 
    onClick: (value: string) => void,
    isLoading?: boolean
}

export function SubmitableInput({ id, placeHolder, buttonLabel, label, isValid, onClick, isLoading }: InputProps) {
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
              isInvalid={isInvalid} />
        </Tooltip>

        <InputRightElement width='5rem'>
            <Button size='md'
                    width='15rem'
                    height='2.35rem' 
                    onClick={handleClick} 
                    colorScheme='linkedin' 
                    isLoading={isLoading}>
                      
                {buttonLabel}
            </Button>
        </InputRightElement>
      </InputGroup>
    </Stack>
  )
}
