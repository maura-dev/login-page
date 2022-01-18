import React from 'react';
 import './App.css';
import { Box, Text, Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import Input from './Input'
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router';

function Login(){
    const toast = useToast();
    const navigate = useNavigate();
    const validationSchema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .min(6, "Must be at least  6 characters")
      .max(15, "Must be 15 characters or less")
      .required("Password is required"),
    cpassword: yup
      .string()
      .min(6, "Must be at least  6 characters")
      .max(15, "Must be 15 characters or less")
      .required("Please confirm password")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });
  
  return(
  <Box 
    w= {{base:"100%", md:"50%", lg:"35%"}} 
    h={{base:"100vh", md:"auto", lg:"auto"}}
    borderRadius="5px" 
    p={10}
    border={{base:"none", md:"0.5px solid"}}
    borderColor={{base:"none", md:"gray.100"}}
    margin="5% auto"
    boxShadow= {{base:"none", md:"0px 8px 12px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31)"}}>
      <Formik
            initialValues={{
              email: "",
              password: "",
              cpassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                //removes old email stored in local storage
                localStorage.removeItem("loginDeets")
                localStorage.removeItem("allMessages")

                //alert(JSON.stringify(values, null, 2));
                toast({
                  title: 'Successful!.',
                  description: `You have been logged in successfully, ${values.email}`,
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                })
                //stores new email as logged email
                localStorage.setItem("loginDeets", JSON.stringify(values))
                //redirects to chat page
                navigate("/chat")
                //clears the form values
                resetForm();
                setSubmitting(false);
              }, 3000);
            }}
          >
            {({ errors, isSubmitting, setFieldValue }) => (
              <Form>
                <Text
                  m={5}
                  textAlign="center"
                  fontWeight="medium"
                  fontSize="x-large"
                >
                  Log in
                </Text>
                <Input
                  label="Enter email-address"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="email@domain.com"
                />

                <Input
                  label="Enter password"
                  name="password"
                  id="password"
                  type="password"
                  placeholder="******"
                  autoComplete="false"
                />

                <Input
                  label="Confirm password"
                  name="cpassword"
                  id="cpassword"
                  type="password"
                  placeholder="******"
                  autoComplete="false"
                />
                
    

                <Button
                  w="100%"
                  isLoading={isSubmitting}
                  //ensures that the button is disabled if there are errors from yup validation
                  isDisabled={Object.keys(errors).length > 0 ? true : false}
                  type="submit"
                  colorScheme="blue"
                >
                  {" "}
                  Log in
                </Button>

              </Form>
            )}
          </Formik>
          </Box>
  );
}

export default Login;