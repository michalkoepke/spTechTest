import React from "react";
import { useHistory } from "react-router";

import { Box, Button, Text } from "@chakra-ui/react";

import { useAuth } from "../store/AuthContext";

const Order = ({ order }) => {
  const history = useHistory();

  const { getCoordinates } = useAuth();
  const { getDirections } = useAuth();

  const { source } = useAuth();
  const { destination } = useAuth();
  const { mapData } = useAuth();
  const { setMapData } = useAuth();
  const { resetMapData } = useAuth();

  const { sx } = useAuth();
  const { sy } = useAuth();
  const { dx } = useAuth();
  const { dy } = useAuth();

  //! to ponizej chyba musi byc zrobione asynchronicznie

  const clickHandler = async () => {
    await getCoordinates(
      order.source.lat,
      order.source.lon,
      order.destination.lat,
      order.destination.lon
    )
      .then(() => {
        console.log(
          "coordinates from click handler in Orders component: ",
          order.source.lat,
          order.source.lon,
          order.destination.lat,
          order.destination.lon
        );
      })
      .then(() => {
        getDirectionsWithDelay(
          order.source.lon,
          order.source.lat,
          order.destination.lon,
          order.destination.lat
        );
      });
  };

  const getDirectionsWithDelay = (sx, sy, dx, dy) => {
    setTimeout(() => {
      console.log("coordinates input: ", sx, sy, dx, dy);
      getDirections(sx, sy, dx, dy);
    }, 100);
  };

  return (
    <Box p={8} my={4} key={order.id} bg="white" w="100%" boxShadow="xl">
      <Text fontSize="2xl">Person: {order.subject}</Text>
      <Text fontSize="xl">Order number: {order.order_number}</Text>
      <Text fontSize="xl">
        Source: lattitude: {order.source.lat} longitude: {order.source.lon}
      </Text>
      <Text fontSize="xl" mb={4}>
        Destination: lattitude: {order.destination.lat} longitude:{" "}
        {order.destination.lon}
      </Text>

      <Box mt={8}>
        <Button
          key={order.id}
          onClick={clickHandler}
          mx={1}
          px={8}
          colorScheme="cyan"
        >
          Map
        </Button>
      </Box>
    </Box>
  );
};

export default Order;
