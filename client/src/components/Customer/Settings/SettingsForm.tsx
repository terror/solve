import React, { useState } from 'react';
import * as Yup from 'yup';

import { useAuth } from '../../../providers/AuthProvider';
import { Center, Stack, Heading, Button } from '@chakra-ui/react';
import { Formik, FormikProps, Form, Field } from 'formik';

import Error from '../../Error';
import TextField from '../../../components/Auth/TextField';

interface FormValues {
  email: string;
  password: string;
  displayName: string;
  photoURL: string;
}

export const styles = {
  stack: {
    borderRadius: '2xl',
    alignItems: 'center',
    mt: '25px',
  },
  heading: {
    mb: 5,
    mt: 5,
  },
  wrap: {
    mb: 5,
    spacing: '30px',
  },
};

interface SettingsFormProps {}

const SettingsForm: React.FC<SettingsFormProps> = () => {
  const { currentUser }: any = useAuth();
  const [error, setError] = useState('');

  const initialValues: FormValues = {
    displayName: currentUser.displayName,
    email: currentUser.email,
    photoURL: currentUser.photoURL,
    password: '',
  };

  return (
    <Center>
      <Stack {...styles.stack}>
        <Heading {...styles.heading}>Account Settings</Heading>
        {error ? <Error msg={error} /> : null}
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address.'),
            password: Yup.string().max(
              50,
              'Password must be 50 characters or less.'
            ),
            displayName: Yup.string().nullable(),
            photoURL: Yup.string()
              .url('Please enter a correct url.')
              .nullable(),
          })}
          onSubmit={async (data, { setSubmitting }) => {
            try {
              await currentUser.updateProfile({
                displayName: data.displayName,
                photoURL: data.photoURL,
                email: data.email,
                password: data.password,
              });
            } catch (err) {
              setError(err);
            }
            setSubmitting(false);
          }}
        >
          {(props: FormikProps<any>) => (
            <Form>
              <Field name='displayName' type='text'>
                {({ field, form }: any) => (
                  <TextField
                    errors={form.errors.displayName}
                    touched={form.touched.displayName}
                    name='Display Name'
                    field={field}
                  />
                )}
              </Field>
              <Field name='photoURL' type='text'>
                {({ field, form }: any) => (
                  <TextField
                    errors={form.errors.photoURL}
                    touched={form.touched.photoURL}
                    name='Photo URL'
                    field={field}
                  />
                )}
              </Field>
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
                colorScheme='green'
                isLoading={props.isSubmitting}
                type='submit'
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Stack>
    </Center>
  );
};

export default SettingsForm;
