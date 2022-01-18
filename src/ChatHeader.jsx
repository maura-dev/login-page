import { Flex, Avatar, AvatarBadge, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router'

export default function ChatHeader({email}) {
    const navigate = useNavigate()
    return (
        <Flex 
            w="100%"
            px={8}
            h="12vh"
            alignItems="center"
            justifyContent="space-between"
            boxShadow="0px 8px 12px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31)"
        >
            <Text
                fontWeight="700"
                fontSize={{base:"1.2em", md:"1.5rem"}}
                onClick={()=> navigate("/")}
                _hover={{cursor:"pointer"}}
            >
                LOGO
            </Text>
            <Avatar name={email}>
                <AvatarBadge boxSize='1em' bg='green.500' />
            </Avatar>
        </Flex>
    )
}
