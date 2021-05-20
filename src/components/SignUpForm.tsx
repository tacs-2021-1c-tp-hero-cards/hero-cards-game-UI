import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Stack, Box, useToast } from '@chakra-ui/react';
import { FormField, RequiredGenericForm, RequiredPasswordForm } from './Form';
import { validateUsername, validateFullName, validatePassword, validateRepeatedPassword } from '../commons/InputValidations';
import { useHistory } from 'react-router-dom';
import { signUp } from '../commons/SignUp';
import { SubmitDataErrorToast } from '../commons/SubmitDataErrorToast';
import { User } from '../commons/User';
 

export function SignUpForm() {
  let history = useHistory()
  const toast = useToast()
  
  function redirect(to: string) {
    return () => history.push(to)
  }

  const initialValues = {
    username: '',
    fullName: '',
    password: '',
    repeatedPassword: '',
    token: ''
  }

  function onSubmit(user: User, actions: any) {
    signUp(user, 
      redirect('/user'), 
      () => toast(SubmitDataErrorToast)
    )

    actions.setSubmitting(false)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} >
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

