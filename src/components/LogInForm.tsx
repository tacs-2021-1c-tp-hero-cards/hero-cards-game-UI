import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Stack, Box } from '@chakra-ui/react';
import { FormField, UnrequiredGenericForm, UnrequiredPasswordForm } from './Form';
import { validateUsername, validatePassword } from '../commons/InputValidations';
import { logIn } from '../commons/LogIn';
import { SubmitDataErrorToast } from '../commons/Toast';
import { User } from './User';
import { RedirectProps, StateProps, ToastProps, withRedirect, withState, withToast } from '../commons/BehaviorAddOns';
import { UserIcon } from './icons';
 

export function LogInForm() { return( withRedirect({}) (withToast) (withState) (LogInFormContent) )}

type LogInFormProps = RedirectProps & ToastProps & StateProps

function LogInFormContent({ redirect, toast, updateState }: LogInFormProps) {

  const initialValues: User = {
    userName: '',
    fullName: '',
    password: '',
    token: '',
    id: -1,
    userType: '',
    admin: false
  }

  function onSubmit(user: User, actions: any) {
    logIn(user, 
      (user: User) => {
        updateState({ type: 'user/updateUser', payload: user })
        redirect('/user')
      }, 
      () => toast(SubmitDataErrorToast)
    )
    
    actions.setSubmitting(false)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} >
      {(props: any) => (
        <Form>
            <Stack>
                <FormField id='userName' 
                        validation={validateUsername}
                        formField={({ field, form }: any) => 
                            <UnrequiredGenericForm field={field}
                                       error={form.errors.userName}
                                       touched={form.touched.userName}
                                       id='userName'
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
                            leftIcon={<UserIcon />}
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

