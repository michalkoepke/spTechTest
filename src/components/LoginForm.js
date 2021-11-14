import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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
} from "@chakra-ui/react";

const LoginForm = () => {
  // const usernameRef = useRef();
  // const passwordRef = useRef();

  // const { sendCredentials } = useAuth;

  const { loggedIn } = useAuth();

  const [error, setError] = useState("");
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

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await sendCredentials(username, password);
      console.log("username: ", username);
      console.log("password: ", password);
    } catch (error) {
      setError("Failed to log in");
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (loggedIn) {
      history.push("/orders");
    }
  }, [loggedIn]);

  return (
    <Stack direction="column" align="center">
      <Flex width="full" align="center" justifyContent="center">
        <Box p={14} mt={10} bg="gray.300">
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  placeholder="Your username"
                  bg="white"
                  // inputRef={usernameRef}
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
                  // inputRef={passwordRef}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button width="full" mt={4} type="submit">
                Sign In
              </Button>
            </form>

            {/* <Button onClick={increaseCounter}>Increase counter</Button>
            <Button onClick={decreaseCounter}>Decrease counter</Button>
            <Heading>{counter}</Heading> */}
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
};

export default LoginForm;
