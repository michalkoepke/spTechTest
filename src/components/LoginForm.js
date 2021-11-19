import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import jwt from "jwt-decode";

import { useAuth } from "../store/AuthContext";

import {
  Flex,
  Stack,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";

const LoginForm = () => {
  const { loggedIn } = useAuth();
  const { setLoggedIn } = useAuth();

  const [loading, setLoading] = useState(false);

  const { authorized } = useAuth();
  const { sendCredentials } = useAuth();
  const { przekieruj } = useAuth();

  //! user i pass:

  const { username } = useAuth();
  const { setUsername } = useAuth();

  const { password } = useAuth();
  const { setPassword } = useAuth();

  const history = useHistory();

  //! lokalny stan user i pass:

  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  // ! EKSPERYMENTALNA funkcja login:

  const login = async (username, password) => {
    fetch("https://api.demo.cargo-speed.pl/demo/api/v1/login/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=password&username=${username}&password=${password}`,
    })
      .then((response) => {
        console.log(response);
        return response;
      })
      .then((response) => {
        if (!response.ok) {
          setError("Incorrect login or password");
          setUsername("");
          setPassword("");
          throw new Error("HTTP error " + response.status);
        } else if (response.ok) {
          console.log("setting loggedIn to true");
          setLoggedIn(true);
          return response.json();
        }
      })
      .then((data) => {
        console.log("response data: ", data);
        sessionStorage.setItem("myToken", data.access_token);
        history.push("/orders");
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data); // => the response payload
        }
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <Stack direction="column" align="center">
      <Flex width="full" align="center" justifyContent="center">
        <Box p={14} mt={10} bg="gray.200">
          <Box textAlign="center">
            {error ? (
              <Text fontSize="4xl" mb={12}>
                {error}
              </Text>
            ) : (
              <Text fontSize="4xl" mb={12}>
                Log in
              </Text>
            )}
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  placeholder="Your username"
                  bg="white"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="*******"
                  bg="white"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button width="full" mt={4} type="submit" colorScheme="cyan">
                Log In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
};

export default LoginForm;
