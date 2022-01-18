import { Box, Divider, Flex, Text, Avatar, IconButton, Image } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import ChatHeader from './ChatHeader'
import { MessageInput } from './Input'
import {ArrowBackIcon, ArrowRightIcon} from "@chakra-ui/icons"
import  Img  from "./img.jpg"
import { Formik, Form } from "formik";
import * as yup from "yup";

export default function Chat({email}) {
    const [messages, setmessages] = useState([]);
    const [showChatPage, setshowChatPage] = useState(false)
    const allMessages = JSON.parse(localStorage.getItem("allMessages"))

    useEffect(() => {
        if(allMessages){
            setmessages(allMessages)
        }
        
    }, [])
    const validationSchema = yup.object().shape({
        message: yup
          .string()
          .min(1, "Must be at least  1 characters")
          .required("message is required"),
      });
    return (
        <Box>
            <ChatHeader
                email={email}
            />
            <Flex p={5} h="85vh" justifyContent="space-between">
                {/* chats list */}
                <Box 
                    border="2px solid"
                    borderColor="gray.100"
                    w={{base:"100%", md:"38%"}}
                    h="100%"
                    hover={{
                        bg:"gray.100"
                    }}
                    display={{base: showChatPage? "none" :"block", md:"block"}}
                    onClick={()=> setshowChatPage(true)}
                >
                    <Text fontWeight="700" fontSize="1.5em" px={10} h="10vh" pt="15px">Chats</Text>
                    <Divider/>
                    <Flex alignItems="center" px={5} py="10px" cursor="pointer">
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' /> 
                        <Box w="70%" ml="20px">
                            <Text fontWeight="600" fontSize="1.2em">Chat Bot</Text>
                            <Text fontWeight="normal" fontSize="0.8em">
                                {messages.length===0 ? "I am a bot" : messages[messages.length - 1].message}
                            </Text>
                        </Box>
                        <Text fontWeight="500" fontSize="1em">Time</Text>
                    </Flex>
                    <Divider/>

                </Box>
                {/* chat area */}
                <Box
                    border="2px solid"
                    borderColor="gray.100"
                    w={{base:"100%", md:"60%"}}
                    h="100%"
                    display={{base: showChatPage? "block" :"none", md:"block"}}
                >
                    <Flex px={5} h="10vh" alignItems="center">
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size="md"/> 
                        <Text fontWeight="600" fontSize="1.2em" ml={5}>Chat Bot</Text>
                        <Box 
                            display={{base: showChatPage? "block" :"none", md:"none"}} 
                            onClick={()=> setshowChatPage(false)}
                            position="absolute"
                            top="18vh"
                            right="10vw"
                        >
                            <ArrowBackIcon/>
                        </Box>
                    </Flex>
                    <Divider/>
                    <Box h="60vh" overflowY="scroll" py={3} px={5}>
                        {messages.length===0 ? 
                        (<>
                        <Image src={Img} w="auto" h="80%" mx="auto"/>
                        <br/>
                        <Text fontWeight="500" fontSize="1em" textAlign="center">You have no messages here</Text>
                        </>) :(
                           messages && messages.map(message => 
                           <Box 
                           key={message.id * Math.random()}
                            maxW={{base:"100%", md:"80%" }}
                            h="auto" 
                            bg="blue.200" 
                            py={3} 
                            px={5} 
                            borderLeftRadius="md"
                            borderTopRightRadius="md"
                            mt={3}
                            >
                               <Text fontWeight="400" fontSize="0.8em">{message.message}</Text>
                            </Box>) 
                        )}
                    </Box>
                    <Formik
                        initialValues={{
                            id:messages.length,
                            message:"",

                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            messages.push(values)
                            setmessages(messages)
                            localStorage.setItem("allMessages", JSON.stringify(messages))
                            resetForm();
                            setSubmitting(false);
                            //alert(JSON.stringify(messages))
                        // setTimeout(() => {   
                        // }, 3000);
                        }}
                    >
                        {({ errors, isSubmitting, setFieldValue }) => (
                        <Form>
                        <Flex w="100%" h="20vh" px={5}>
                            <MessageInput
                            name="message"
                            id="message"
                            type="text"
                            placeholder="Enter message ..."
                            w="100%"
                            resize="none"
                            
                            />

                            <IconButton 
                                aria-label='Send message' 
                                icon={<ArrowRightIcon />} 
                                isLoading={isSubmitting}
                                //ensures that the button is disabled if there are errors from yup validation
                                isDisabled={Object.keys(errors).length > 0 ? true : false}
                                type="submit"
                                colorScheme="blue"
                                ml="10px"
                            />
                        </Flex>
                        </Form>
                        )}
                    </Formik>
                    
                </Box>
            </Flex>
        </Box>
    )
}
