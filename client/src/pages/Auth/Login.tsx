import React, { useState } from 'react';
import * as Yup from 'yup';

import {
  Flex,
  Stack,
  Heading,
  Button,
  Wrap,
  WrapItem,
  StackItem,
  Text,
} from '@chakra-ui/react';

import { Field, Form, Formik, FormikProps } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { styles } from './styles';

import Error from '../../components/Error';
import TextField from '../../components/Auth/TextField';
import GoogleButton from '../../components/Auth/GoogleButton';

interface LoginProps {}

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = () => {
  const { currentUser, login }: any = useAuth();
  const [error, setError] = useState('');
  const initialValues: FormValues = { email: '', password: '' };
  const history = useHistory();

  if (currentUser) {
    history.push('/profile');
    return null;
  }

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack>
        <StackItem alignSelf='center'>
          <Heading {...styles.heading}>Sign in to your account</Heading>
        </StackItem>
        <StackItem mb={5} alignSelf='center'>
          <Text mr={3}>
            Don't have an account?
            <Link to='/register'> Sign up here.</Link>
          </Text>
        </StackItem>
        <Stack {...styles.stack} alignSelf='center'>
          {error ? <Error msg={error} /> : null}
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid email address.')
                .required('Required'),
              password: Yup.string()
                .max(50, 'Password must be 50 characters or less.')
                .required('Required'),
            })}
            onSubmit={async (data, { setSubmitting }) => {
              try {
                setError('');
                await login(data.email, data.password);
                history.push('/dashboard');
              } catch {
                setError('Failed to login');
              }
              setSubmitting(false);
            }}
          >
            {(props: FormikProps<any>) => (
              <Form style={{ padding: '20px' }}>
                <Field name='email' type='email'>
                  {({ field, form }: any) => (
                    <TextField
                      errors={form.errors.email}
                      touched={form.touched.email}
                      name='Email'
                      field={field}
                    />
                  )}
                </Field>
                <Field name='password' type='password'>
                  {({ field, form }: any) => (
                    <TextField
                      errors={form.errors.password}
                      touched={form.touched.password}
                      name='Password'
                      field={field}
                    />
                  )}
                </Field>
                <Button
                  mt={5}
                  mb={5}
                  colorScheme='blue'
                  width='100%'
                  isLoading={props.isSubmitting}
                  type='submit'
                >
                  Sign in
                </Button>
                <GoogleButton />
              </Form>
            )}
          </Formik>
          <Wrap {...styles.wrap}>
            <WrapItem>
              <Link to='/forgot'>Forgot password?</Link>
            </WrapItem>
          </Wrap>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Login;
