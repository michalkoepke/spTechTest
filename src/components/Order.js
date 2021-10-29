import React from "react";

import { Flex, Stack, Box, Heading, Button, Text } from "@chakra-ui/react";

const Order = ({ order }) => {
  return (
    <Box p={4} my={2} key={order.id} bg="white">
      <Text fontSize="2xl">Person: {order.subject}</Text>
      <Text fontSize="xl">Order number: {order.order_number}</Text>
      <Text fontSize="xl">
        Source: lattitude: {order.source.lat} longitude: {order.source.lon}
      </Text>
      <Text fontSize="xl" mb={4}>
        Destination: lattitude: {order.destination.lat} longitude:{" "}
        {order.destination.lon}
      </Text>
      <Button>Map</Button>
    </Box>
  );
};

export default Order;
