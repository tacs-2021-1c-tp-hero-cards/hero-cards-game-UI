import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Stack, Box } from '@chakra-ui/react';
import { FormField, UnrequiredGenericForm, UnrequiredPasswordForm } from './Form';
import { User } from '../commons/User';
import { validateUsername, validatePassword } from '../commons/InputValidations';
 

export function LogInForm(onSubmit: (data: User) => void) {
  
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
          token: ''
        })
        actions.setSubmitting(false)
      }}
    >
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

