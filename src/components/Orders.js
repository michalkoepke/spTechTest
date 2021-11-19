import React, { useState, useEffect } from "react";
import { useAuth } from "../store/AuthContext";

import { Flex, Stack, Box, Heading, Button } from "@chakra-ui/react";
import { useHistory } from "react-router";

import Order from "./Order";

const Orders = () => {
  const history = useHistory();

  const { orders } = useAuth();

  const { mapData } = useAuth();
  const { resetMapData } = useAuth();
  const { refreshToken } = useAuth();
  const { setOrders } = useAuth();
  const { loggedIn } = useAuth();
  const { setLoggedIn } = useAuth();

  const { getDirections } = useAuth();
  const { source } = useAuth();
  const { destination } = useAuth();
  const { clearCoordinates } = useAuth();

  const { sx } = useAuth();
  const { sy } = useAuth();
  const { dx } = useAuth();
  const { dy } = useAuth();

  // !lokalny stan

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  //! wersja eksperymentalna po zmianie logiki formularza logowania

  const getOrdersExp = () => {
    setLoading(true);
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
        return response;
      })
      .then((response) => {
        if (!response.ok) {
          setError("something went wrong");
          history.push("/");

          // sendCredentials2(username, password);
          // throw new Error("HTTP error " + response.status);
        } else if (response.ok) {
          return response.json();
        }
      })

      .then((data) => {
        setOrders(data);
        setError(false);
        console.log("orders-data: ", data);
      })
      .catch((err) => {
        console.log("orders-rejected: ", err);
      })
      .finally(() => {
        setLoading(false);
        console.log("setting loading to false");
      });
  };

  // ! GLOWNY USE EFFECT:

  useEffect(() => {
    if (loggedIn) {
      getOrdersExp();
      clearCoordinates();
      resetMapData();
    } else {
      console.log("error, orders haven't been loaded");
    }
  }, [loggedIn]);

  //!to ponizej odpala mape jak stan mapData ma dlugosc większą od 0

  useEffect(() => {
    if (Object.keys(mapData).length === 0) {
      console.log("mapdata is empty");
    } else if (Object.keys(mapData).length !== 0) {
      console.log("mapdata is not empty");
      console.log("mapData: ", mapData);
      console.log("pushing to map");
      history.push("/map");
    }
  }, [mapData]);

  //! refresh handler

  const refreshHandler = () => {
    console.log("refreshHandler button clicked");

    clearCoordinates();

    resetMapData();
    getOrdersExp();
    console.log(orders);
  };

  //! return:

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
          <Button colorScheme="cyan" mx={8} px={8} onClick={refreshHandler}>
            Refresh orders
          </Button>
        </Flex>
        <Box w="100%">
          {orders &&
            orders.map((order) => <Order order={order} key={order.id} />)}
        </Box>
      </Flex>
    </Stack>
  );
};

export default Orders;
