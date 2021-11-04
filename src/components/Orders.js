import React, { useState, useEffect } from "react";

import { useAuth } from "../store/AuthContext";

import { Flex, Stack, Box, Heading, Button, Text } from "@chakra-ui/react";
import { useHistory } from "react-router";

import Order from "./Order";

const Orders = () => {
  const history = useHistory();
  const { getOrders } = useAuth();
  const { orders } = useAuth();
  const { token } = useAuth();

  const { getDirections } = useAuth();
  const { source } = useAuth();
  const { destination } = useAuth();
  const { sx } = useAuth();
  const { sy } = useAuth();
  const { dx } = useAuth();
  const { dy } = useAuth();
  // const { loading } = useAuth();

  // tutaj pobieranie zamowien lub test:

  // useEffect(() => {
  //   if (token) {
  //     getOrders(token);
  //   } else {
  //     console.log("there is no token");
  //   }

  // }, [token]);

  useEffect(() => {
    getOrders();

    // console.log("token: ", token)
  }, []);

  // ! to ponizej przniesione testowo do komponentu order

  // useEffect(() => {
  //   // console.log("use effect fired");
  //   getDirections(sx, sy, dx, dy);
  // }, [source]);

  return (
    <Stack direction="column" align="center" bg="gray.100">
      <Flex direction="column" w="70%" minHeight="80vh" align="center" my={8}>
        <Heading size="xl" py={6}>
          Orders
        </Heading>
        <Box>
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
