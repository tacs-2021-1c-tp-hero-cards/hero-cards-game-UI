import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Stack, Box, useToast } from '@chakra-ui/react';
import { FormField, UnrequiredGenericForm, UnrequiredPasswordForm } from './Form';
import { validateUsername, validatePassword } from '../commons/InputValidations';
import { logIn } from '../commons/LogIn';
import { useHistory } from 'react-router';
import { SubmitDataErrorToast } from '../commons/SubmitDataErrorToast';
import { User } from '../commons/User';
 

export function LogInForm() {
  let history = useHistory()
  const toast = useToast()
  
  function redirect(to: string) {
    history.push(to)
  }

  const initialValues = {
    username: '',
    fullName: '',
    password: '',
    token: ''
  }

  function onSubmit(user: User, actions: any) {
    logIn(user, 
      () => redirect('/user'), 
      () => toast(SubmitDataErrorToast)
    )
    
    actions.setSubmitting(false)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} >
      {(props: any) => (
        <Form>
            <Stack>
                <FormField id='username' 
                        validation={validateUsername}
                        formField={({ field, form }: any) => 
                            <UnrequiredGenericForm field={field}
                                       error={form.errors.username}
                                       touched={form.touched.username}
                                       id='username'
                                       label='Username'
                                       placeholder='Enter username'
                                       />}/>

                <FormField id='password' 
                        validation={validatePassword}
                        formField={({ field, form }: any) =>  
                            <UnrequiredPasswordForm field={field}
                                        error={form.errors.password}
                                        touched={form.touched.password}
                                        id='password'
                                        label='Password'
                                        placeholder='Enter password'
                                        />}/>

                <Box paddingTop='7px'>
                    <Button colorScheme='teal'
                            type='submit'
                            isLoading={props.isSubmitting}>
                        Log In
                    </Button>
                </Box>

            </Stack>
        </Form>
      )}
    </Formik>
  )
}

