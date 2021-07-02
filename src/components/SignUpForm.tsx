import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Stack, Box } from '@chakra-ui/react';
import { FormField, RequiredGenericForm, RequiredPasswordForm } from './Form';
import { validateUsername, validateFullName, validatePassword, validateRepeatedPassword } from '../commons/InputValidations';
import { signUp } from '../commons/SignUp';
import { SubmitDataErrorToast } from '../commons/Toast';
import { User } from './User';
import { RedirectProps, ToastProps, withRedirect, withToast } from '../commons/BehaviorAddOns';
import { NewUserIcon } from './icons';
 
export function SignUpForm() { return( withRedirect({}) (withToast) (SignUpFormContent) )}

type SignUpFormProps = RedirectProps & ToastProps

function SignUpFormContent({ redirect, toast }: SignUpFormProps) {

  const initialValues = {
    username: '',
    fullName: '',
    password: '',
    repeatedPassword: '',
    token: ''
  }

  function onSubmit(user: User, actions: any) {
    signUp(user, 
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
                      leftIcon={<NewUserIcon />}
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

