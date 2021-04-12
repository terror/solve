import React, { useState } from 'react';
import * as Yup from 'yup';

import { Heading, Center, Stack, Button, Wrap } from '@chakra-ui/react';

import { Formik, Form, Field, FormikProps } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { styles } from './styles';

import Error from '../../components/Error';
import TextField from '../../components/Auth/TextField';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const { currentUser, signup }: any = useAuth();
  const [error, setError] = useState('');
  const initialValues: FormValues = { name: '', email: '', password: '' };
  const history = useHistory();

  if (currentUser) {
    history.push('/profile');
  }

  return (
    <Center>
      <Stack {...styles.stack}>
        <Heading {...styles.heading}>Register</Heading>
        {error ? <Error msg={error} /> : null}
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(30, 'Name must be 30 characters or less.')
              .required('Required'),
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
              await signup(data.email, data.password);
              history.push('/dashboard');
            } catch {
              setError('Failed to register');
            }
            setSubmitting(false);
          }}
        >
          {(props: FormikProps<any>) => (
            <Form>
              <Field name='name' type='text'>
                {({ field, form }: any) => (
                  <TextField
                    field={field}
                    errors={form.errors.name}
                    touched={form.touched.name}
                    name='Name'
                  ></TextField>
                )}
              </Field>
              <Field name='email' type='email'>
                {({ field, form }: any) => (
                  <TextField
                    field={field}
                    errors={form.errors.email}
                    touched={form.touched.email}
                    name='Email'
                  ></TextField>
                )}
              </Field>
              <Field name='password' type='password'>
                {({ field, form }: any) => (
                  <TextField
                    field={field}
                    errors={form.errors.password}
                    touched={form.touched.password}
                    name='Password'
                  />
                )}
              </Field>
              <Button
                mt={5}
                mb={7}
                colorScheme='green'
                isLoading={props.isSubmitting}
                type='submit'
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <Wrap {...styles.wrap}>
          <Link to='/login'>Already have an account?</Link>
        </Wrap>
      </Stack>
    </Center>
  );
};

export default Register;
