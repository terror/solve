import React, { useState } from 'react';
import * as Yup from 'yup';

import { Center, Stack, Heading, Button, Wrap } from '@chakra-ui/react';

import { Formik, FormikProps, Form, Field } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { styles } from './styles';

import Error from '../../components/Error';
import TextField from '../../components/Auth/TextField';

interface ForgotPasswordProps {}

interface FormValues {
    email: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
    const [error, setError] = useState('');
    const initialValues: FormValues = { email: '' };
    const { currentUser, passwordReset }: any = useAuth();
    const history = useHistory();

    if (currentUser) {
        history.push('/profile');
    }

    return (
        <Center>
            <Stack {...styles.stack}>
                <Heading {...styles.heading}>Password Reset</Heading>
                {error ? <Error msg={error} /> : null}
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email('Invalid email address.')
                            .required('Required'),
                    })}
                    onSubmit={async (data, { setSubmitting }) => {
                        try {
                            passwordReset(data.email);
                        } catch {
                            setError('Failed to reset password.');
                        }
                        setSubmitting(false);
                    }}
                >
                    {(props: FormikProps<any>) => (
                        <Form>
                            <Field name="email" type="email">
                                {({ field, form }: any) => (
                                    <TextField
                                        field={field}
                                        errors={form.errors.email}
                                        touched={form.touched.email}
                                        name="Email"
                                    />
                                )}
                            </Field>
                            <Button
                                mt={5}
                                mb={5}
                                colorScheme="green"
                                isLoading={props.isSubmitting}
                                type="submit"
                            >
                                Reset
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Wrap {...styles.wrap}>
                    <Link to="/login">Back to Login</Link>
                </Wrap>
            </Stack>
        </Center>
    );
};

export default ForgotPassword;
