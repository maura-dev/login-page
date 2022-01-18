import { Flex, Avatar, AvatarBadge, Text } from '@chakra-ui/react'
import React from 'react'

export default function ChatHeader({email}) {
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
                fontSize={{base:"0.8em", md:"1.5rem"}}
            >
                Welcome, {email}
            </Text>
            <Avatar name={email}>
                <AvatarBadge boxSize='1em' bg='green.500' />
            </Avatar>
        </Flex>
    )
}
