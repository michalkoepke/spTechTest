import React, { useState, useEffect } from "react";

import { Stack, Flex, Heading } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import { useHistory } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    fetch("https://api.demo.cargo-speed.pl/demo/api/v1/login/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },

      body: "grant_type=refresh_token",
      credentials: "include",
    })
      .then((response) => {
        console.log("resolved", response);

        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("refresh token: ", data);
      })

      .catch((err) => {
        console.log("rejected", err);
      });
  }, []);

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
