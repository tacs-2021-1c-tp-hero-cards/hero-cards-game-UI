import { UseToastOptions } from "@chakra-ui/react";

export const SubmitDataErrorToast: UseToastOptions = {
    title: `Error`,
    status: 'error',
    isClosable: true,
    description: 'It seems that we had an error while submiting your data, sorry about that. Please, try again in a few minutes',
  }

type Status = 'error' | 'info' | 'warning' | 'success'

export function customToast(title?: string, status?: Status, description?: string): UseToastOptions {
  return {
    isClosable: true,
    title: title,
    status: status,
    description: description
  }
}