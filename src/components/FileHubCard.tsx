"use client";

import { Box, HStack, Flex, Image, Text, VStack } from "@chakra-ui/react";



export function FileHubCard(){
    return (
            <Flex 
                justifyContent={"space-between"} 
                _hover={{ bg: "brand.300", _dark: { bg: "brand.200" } }}
                borderRadius={"base"}
            >
                <VStack alignItems={"left"} padding={"5px"} maxWidth={"50%"}>
                    <Text fontSize={"20px"}>
                        Intro
                    </Text>
                    <Text fontSize={"10px"}>
                        Juice WRLD
                    </Text>
                </VStack>
                <Flex alignItems={"center"} padding={"5px"} maxWidth={"40%"}>
                    <Text>
                        1:14
                    </Text>
                </Flex>
            </Flex>
    );
}