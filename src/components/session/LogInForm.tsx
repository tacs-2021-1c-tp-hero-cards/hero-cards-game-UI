import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Stack, Box } from '@chakra-ui/react';
import { FormField, UnrequiredGenericForm, UnrequiredPasswordForm } from '../miscellaneous/Form';
import { validateUsername, validatePassword } from '../../commons/InputValidations';
import { logIn } from '../../commons/LogIn';
import { SubmitDataErrorToast } from '../../commons/Toast';
import { User } from '../players/User';
import { RedirectProps, ToastProps, withRedirect, withToast } from '../../commons/BehaviorAddOns';
import { UserIcon } from '../miscellaneous/icons';
import { updateState } from '../../store/hooks';
 

export function LogInForm() { return( withRedirect({}) (withToast) (LogInFormContent) )}

type LogInFormProps = RedirectProps & ToastProps

function LogInFormContent({ redirect, toast }: LogInFormProps) {

  const initialValues: User = {
    userName: '',
    fullName: '',
    password: '',
    token: '',
    id: -1,
    userType: '',
    admin: false,
    stats: {
      winCount: 0,
      loseCount: 0,
      tieCount: 0,
      inProgressCount: 0
    }
  }

  function onSubmit(user: User, actions: any) {
    logIn(user, 
      (user: User) => redirect('/user'), 
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

