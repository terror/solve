import React, { useState } from 'react';

import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Icon,
} from '@chakra-ui/react';

import { AiFillFileAdd } from 'react-icons/ai';
import { Formik, FormikProps, Form, Field } from 'formik';
import { useAuth } from '../../../../providers/AuthProvider';
import { api } from '../../../../ts/api';

import TextField from '../../../Auth/TextField';
import TextAreaField from '../../../Auth/TextAreaField';
import SelectField from '../../../Auth/SelectField';
import Error from '../../../Error';

interface TemplateAddProps {}

interface FormValues {
  name: string;
  body: string;
  lang: string;
}

const TemplateAdd: React.FC<TemplateAddProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser }: any = useAuth();
  const [error, setError] = useState('');

  const initialValues: FormValues = {
    name: '',
    body: '',
    lang: '',
  };

  return (
    <>
      <Button onClick={onOpen}>
        <Icon as={AiFillFileAdd} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Template</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error ? <Error msg={error} /> : null}
            <Formik
              initialValues={initialValues}
              onSubmit={async (data, { setSubmitting }) => {
                try {
                  const token = await currentUser.getIdToken();
                  const config = {
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                  };
                  const templateObject = {
                    userId: currentUser.uid,
                    name: data.name,
                    body: data.body,
                    lang: data.lang,
                  };
                  await api.post(
                    '/templates/',

                    templateObject,
                    config
                  );
                } catch (err) {
                  setError('Error processing template.');
                }
                setSubmitting(false);
              }}
            >
              {(props: FormikProps<any>) => (
                <Form>
                  <Field name='name' type='text'>
                    {({ field, form }: any) => (
                      <TextField
                        errors={form.errors.name}
                        touched={form.touched.name}
                        name='Name'
                        field={field}
                      />
                    )}
                  </Field>
                  <Field name='body' type='text' as='textarea'>
                    {({ field, form }: any) => (
                      <TextAreaField
                        errors={form.errors.body}
                        touched={form.touched.body}
                        name='Body'
                        field={field}
                      />
                    )}
                  </Field>
                  <Field name='lang' as='select'>
                    {({ field, form }: any) => (
                      <SelectField
                        errors={form.errors.lang}
                        touched={form.touched.lang}
                        name='Language'
                        field={field}
                      />
                    )}
                  </Field>
                  <Button
                    mt={5}
                    mb={5}
                    colorScheme='blue'
                    isLoading={props.isSubmitting}
                    isFullWidth
                    type='submit'
                  >
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TemplateAdd;
