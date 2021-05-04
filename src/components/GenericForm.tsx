import React from 'react';
 import { Formik, Form, Field, connect, getIn, useFormik } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Button, Stack, Box, InputGroup, InputRightElement } from '@chakra-ui/react';
 
 export function FormikExample() {
  
  return (
    <Formik
      initialValues={{
        username: '',
        firstName: '',
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
              <Field name='username' validate={validateUsername}>
                {({ field, form }: any) => 
                  GenericForm({
                    field: field,
                    error: form.errors.username,
                    touched: form.touched.username,
                    id: 'username',
                    label: 'Username',
                    placeholder: 'Enter username'
                  })}
              </Field>

              <Field name='firstName' validate={validateFirstName}>
                {({ field, form }: any) => 
                  GenericForm({
                    field: field,
                    error: form.errors.firstName,
                    touched: form.touched.firstName,
                    id: 'firstName',
                    label: 'First Name',
                    placeholder: 'Enter first name'
                  })}
              </Field>
            </Stack>

            <Stack direction='row'>
              <Field name='password1' validate={validatePassword1}>
                {({ field, form }: any) => 
                  PasswordForm({
                    field: field,
                    error: form.errors.password1,
                    touched: form.touched.password1,
                    id: 'password1',
                    label: 'Password',
                    placeholder: 'Enter password'
                  })}
              </Field>

              <Field name='password2' validate={(value: any) => validatePassword2(value, props ? props.values.password1 : '')}>
                {({ field, form }: any) => 
                  PasswordForm({
                    field: field,
                    error: form.errors.password2,
                    touched: form.touched.password2,
                    id: 'password2',
                    label: '',
                    placeholder: 'Repeat password'
                  })}
              </Field>
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
    error = 'Name is required'
  }

  return error
}

function validateFirstName(value: any) {
  let error
  if (!value) {
    error = 'First name is required'
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

type FormProps = { 
  field: any,
  error: any,
  touched: any,
  id: string,
  label: string,
  placeholder: string 
}

function GenericForm(props: FormProps) {
  return <FormControl isInvalid={props.error && props.touched} isRequired>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input {...props.field} id={props.id} placeholder={props.placeholder} bg='white'/>
      <FormErrorMessage>{props.error}</FormErrorMessage>
    </FormControl>
}

function PasswordForm(props: FormProps) {
  return <FormControl isInvalid={props.error && props.touched} isRequired>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      {PasswordInput(props)}
      <FormErrorMessage>{props.error}</FormErrorMessage>
    </FormControl>
}

function PasswordInput(props: FormProps) {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size='md'>
        <Input {...props.field}
            id={props.id}
            bg='white'
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder={props.placeholder}
        />
        <InputRightElement width='4.4rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
            </Button>
        </InputRightElement>
    </InputGroup>
  )
}

 
 // This component renders an error message if a field has
 // an error and it's already been touched.
 const ErrorMessage = (props: any) => {
  // All FormikProps available on props.formik!
  const error = getIn(props.formik.errors, props.name);
  const touch = getIn(props.formik.touched, props.name);
  return touch && error ? error : null;
};

export default connect(ErrorMessage);
