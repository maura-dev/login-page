import React from 'react';
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input as TextInput,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";

const Input = ({ label, inputRef, mb, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl mb={mb || 8} isRequired isInvalid={meta.touched && meta.error}>
      {label && (
        <FormLabel fontSize="md" htmlFor={props.id || props.name}>
          {label}
        </FormLabel>
      )}
      <TextInput ref={inputRef} {...field} {...props} borderRadius="0" />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default Input;

export const MessageInput = ({ inputRef, mb, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl mb={mb || 8} isRequired isInvalid={meta.touched && meta.error}>
      <Textarea ref={inputRef} {...field} {...props} borderRadius="50px" rows="1"/>
      {/* {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null} */}
    </FormControl>
  );
};

