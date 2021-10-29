import React, { useState, useEffect } from "react";

import { Text, Stack, Flex, Box, Heading } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import { Link, useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  return (
    <Stack direction="column" align="center">
      <Flex
        direction="column"
        w="70%"
        bg="white"
        minHeight="80vh"
        align="center"
      >
        <Heading size="xl" py={6}>
          SP TECH TEST
        </Heading>
        <LoginForm />
      </Flex>
    </Stack>
  );
};

export default Home;
