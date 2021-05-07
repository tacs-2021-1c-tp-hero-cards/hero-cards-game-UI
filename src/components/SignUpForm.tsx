import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Stack, Box } from '@chakra-ui/react';
import { FormField, RequiredGenericForm, RequiredPasswordForm } from './Form';
import { UserProps } from '../commons/User';
import { validateUsername, validateFullName, validatePassword, validateRepeatedPassword } from '../commons/InputValidations';
 

export function SignUpForm(onSubmit: (data: UserProps) => void) {
  
  return (
    <Formik
      initialValues={{
        username: '',
        fullName: '',
        password: '',
        repeatedPassword: ''
      }}
      onSubmit={(values: any, actions: any) => {
        onSubmit({
          username: values.username,
          fullName: values.fullName,
          password: values.password,
          token: '',
          cookies: '',
          allCookies: ''
        })
        actions.setSubmitting(false)
      }}
    >
      {(props: any) => (
        <Form>
          <Stack>
            <Stack direction='row'>
              <FormField id='username' 
                        validation={validateUsername}
                        formField={({ field, form }: any) => 
                          <RequiredGenericForm field={field}
                                       error={form.errors.username}
                                       touched={form.touched.username}
                                       id='username'
                                       label='Username'
                                       placeholder='Enter username'
                                       />}/>

              <FormField id='fullName' 
                        validation={validateFullName}
                        formField={({ field, form }: any) => 
                          <RequiredGenericForm field={field}
                                       error={form.errors.fullName}
                                       touched={form.touched.fullName}
                                       id='fullName'
                                       label='Full Name'
                                       placeholder='Enter full name'
                                       />}/>
            </Stack>

            <Stack direction='row'>
              <FormField id='password' 
                        validation={validatePassword}
                        formField={({ field, form }: any) =>  
                          <RequiredPasswordForm field={field}
                                        error={form.errors.password}
                                        touched={form.touched.password}
                                        id='password'
                                        label='Password'
                                        placeholder='Enter password'
                                        />}/>

              <FormField id='repeatedPassword' 
                         validation={(value: any) => validateRepeatedPassword(value, props.values.password)}
                         formField={({ field, form }: any) => 
                          <RequiredPasswordForm field={field}
                                        error={form.errors.repeatedPassword}
                                        touched={form.touched.repeatedPassword}
                                        id='repeatedPassword'
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

