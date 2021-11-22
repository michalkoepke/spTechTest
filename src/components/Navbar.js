import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      bg="gray.600"
      w="100%"
      h="50px"
      py={8}
      pos="fixed"
      zIndex={1000}
      align="center"
      justify="center"
    >
      <Box w="70%" align="start">
        <Text color="white" fontSize="2xl">
          ST-TECH TEST APP
        </Text>
        <Text color="white">super early verion</Text>
      </Box>
    </Flex>
  );
};

export default Navbar;
