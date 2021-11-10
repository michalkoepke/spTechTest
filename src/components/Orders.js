import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../store/AuthContext";

import { Flex, Stack, Box, Heading, Button, Text } from "@chakra-ui/react";
import { useHistory } from "react-router";

import Order from "./Order";

const Orders = () => {
  const history = useHistory();
  // const { getOrders } = useAuth();
  const { orders } = useAuth();
  const { token } = useAuth();
  const { mapData } = useAuth();
  const { resetMapData } = useAuth();
  const { refreshToken } = useAuth();
  const { setOrders } = useAuth();
  const { loggedIn } = useAuth();
  const { setLoggedIn } = useAuth();
  const { sendCredentials } = useAuth();
  const { username } = useAuth();
  const { password } = useAuth();

  const { getDirections } = useAuth();
  const { source } = useAuth();
  const { destination } = useAuth();
  const { sx } = useAuth();
  const { sy } = useAuth();
  const { dx } = useAuth();
  const { dy } = useAuth();

  // !lokalny stan

  const [error, setError] = useState(false);
  // const { loading } = useAuth();

  // tutaj pobieranie zamowien lub test:

  // useEffect(() => {
  //   if (token) {
  //     getOrders(token);
  //   } else {
  //     console.log("there is no token");
  //   }

  // }, [token]);

  const getOrdersExp = () => {
    const myToken = sessionStorage.getItem("myToken");

    fetch("https://api.demo.cargo-speed.pl/demo/api/v1/orders/many", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + myToken,
      },
    })
      .then((response) => {
        console.log("orders-resolved: ", response);
        if (response.status === 401) {
          console.log("401");
          sendCredentials(username, password);
        } else {
          return response;
        }
      })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setError(false);
        console.log("orders-data: ", data);
      })
      .catch((err) => {
        setLoggedIn(false);
        setError(true);
        console.log("orders-rejected: ", err);
      });
  };

  // useEffect(() => {
  //   if (orders.length == 0) {
  //     console.log("error, pushing to home");
  //     history.push("/");
  //   } else {
  //     refreshToken();
  //     resetMapData();
  //     getOrdersExp();
  //   }

  // }, []);

  useEffect(() => {
    if (loggedIn) {
      // refreshToken();
      resetMapData();
      getOrdersExp();
    } else {
      console.log("error, pushing to home");
      history.push("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    if (Object.keys(mapData).length === 0) {
      console.log("mapdata is empty");
    } else if (Object.keys(mapData).length !== 0) {
      console.log("mapdata is not empty");
      console.log("mapData: ", mapData);
      console.log("pushing to map");
      history.push("/map");
      // resetMapData();
    }
  }, [mapData]);

  const refreshHandler = () => {
    console.log("refreshHandler button clicked");
    // refreshToken();
    resetMapData();
    getOrdersExp();
    console.log(orders);
  };

  // useEffect(() => {
  //   console.log("mapData has changed");
  //   // history.push("/map");
  // }, [mapData]);

  // ! to ponizej przniesione testowo do komponentu order

  // useEffect(() => {
  //   // console.log("use effect fired");
  //   getDirections(sx, sy, dx, dy);
  // }, [source]);

  return (
    <Stack direction="column" align="center" bg="gray.100">
      <Flex
        direction="column"
        w="70%"
        minHeight="80vh"
        align="center"
        my={8}
        mt={20}
      >
        <Flex align="center">
          <Heading size="xl" py={6}>
            Orders
          </Heading>
          <Button colorScheme="orange" mx={8} onClick={refreshHandler}>
            Refresh orders
          </Button>
        </Flex>
        <Box w="100%">
          {orders.map((order) => (
            <Order order={order} key={order.id} />
          ))}
        </Box>
        {/* <Box w="70%" p={10} bg="red.300">
          TOKEN: {token}
        </Box> */}
      </Flex>
    </Stack>
  );
};

export default Orders;
