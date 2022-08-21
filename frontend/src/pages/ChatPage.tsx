import { Container, Box, Text } from '@chakra-ui/react'
import React from 'react'

const ChatPage = () => {
    return (
        <Container maxW='xl' centerContent>
            <Box display='flex' justifyContent='center' alignItems='center' p={3} w='100%' m='40px 0 15px 0' borderRadius='lg' borderWidth='1px'>
                <Text fontSize='4xl'>
                    Chat App
                </Text>
            </Box>
        </Container>
    )
}

export default ChatPage