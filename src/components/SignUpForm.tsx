import React from 'react';
 import { Formik, Form, Field } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Button, Stack, Box, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FormField, GenericForm, PasswordForm } from './Form';
 
export function SignUpForm() {
  
  return (
    <Formik
      initialValues={{
        username: '',
        fullName: '',
        password1: '',
        password2: ''
      }}
      onSubmit={(values: any, actions: any) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {(props: any) => (
        <Form>
          <Stack>
            <Stack direction='row'>
              <FormField id='username' 
                        validation={validateUsername}
                        formField={({ field, form }: any) => 
                          <GenericForm field={field}
                                       error={form.errors.username}
                                       touched={form.touched.username}
                                       id='username'
                                       label='Username'
                                       placeholder='Enter username'
                                       />}/>

              <FormField id='fullName' 
                        validation={validateFullName}
                        formField={({ field, form }: any) => 
                          <GenericForm field={field}
                                       error={form.errors.fullName}
                                       touched={form.touched.fullName}
                                       id='fullName'
                                       label='Full Name'
                                       placeholder='Enter full name'
                                       />}/>
            </Stack>

            <Stack direction='row'>
              <FormField id='password1' 
                        validation={validatePassword1}
                        formField={({ field, form }: any) =>  
                          <PasswordForm field={field}
                                        error={form.errors.password1}
                                        touched={form.touched.password1}
                                        id='password1'
                                        label='Password'
                                        placeholder='Enter password'
                                        />}/>

              <FormField id='password2' 
                         validation={(value: any) => validatePassword2(value, props.values.password1)}
                         formField={({ field, form }: any) => 
                          <PasswordForm field={field}
                                        error={form.errors.password2}
                                        touched={form.touched.password2}
                                        id='password2'
                                        label=''
                                        placeholder='Repeat password'
                                        />}/>
            </Stack>

            <Box paddingTop='7px'>
              <Button colorScheme='teal'
                      type='submit'
                      isLoading={props.isSubmitting}>
                Sing Up
              </Button>
            </Box>

          </Stack>
        </Form>
      )}
    </Formik>
  )
}

// TODO: Impprove inputs validations

function validateUsername(value: any) {
  let error
  if (!value) {
    error = 'Username is required'
  }

  return error
}

function validateFullName(value: any) {
  let error
  if (!value) {
    error = 'Full name is required'
  }

  return error
}

function validatePassword1(value: any) {
  let error
  if (!value) {
    error = 'Password is required'
  }

  return error
}

function validatePassword2(value: any, pass1: any) {
  let error

  if (!value) {
    error = 'Repeated password is required'
  } else if (value !== pass1) {
    error = 'Incorrect password'
  }

  return error
}
