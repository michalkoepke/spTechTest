import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router";

import { Flex, Stack, Box, Heading, Button, Text } from "@chakra-ui/react";

import { useAuth } from "../store/AuthContext";

const Order = ({ order }) => {
  const history = useHistory();

  const { getCoordinates } = useAuth();
  const { getDirections } = useAuth();
  // const { pushToMap } = useAuth();
  const { source } = useAuth();
  const { destination } = useAuth();
  const { mapData } = useAuth();
  const { setMapData } = useAuth();
  const { resetMapData } = useAuth();

  const { sx } = useAuth();
  const { sy } = useAuth();
  const { dx } = useAuth();
  const { dy } = useAuth();

  // const getDirectionsHandler = () => {
  //   // e.preventDefault();
  //   const source = [order.source.lat, order.source.lon];
  //   const destination = [order.destination.lat, order.destination.lon];
  //   getDirections(source, destination);
  //   console.log("button clicked");
  // };

  //! to ponizej chyba musi byc zrobione asynchronicznie

  const clickHandler = async () => {
    await getCoordinates(
      order.source.lat,
      order.source.lon,
      order.destination.lat,
      order.destination.lon
    );

    //  await getDirections(sx, sy, dx, dy);
    // history.push("/map");
  };

  // const mapHandlerTest = useCallback(() => {
  //   pushToMap();
  // }, [mapData]);

  const mapHandler = async () => {
    await getDirections(sx, sy, dx, dy);
    // mapHandlerTest();
  };

  return (
    <Box p={4} my={4} key={order.id} bg="white" w="100%" boxShadow="xl">
      <Text fontSize="2xl">Person: {order.subject}</Text>
      <Text fontSize="xl">Order number: {order.order_number}</Text>
      <Text fontSize="xl">
        Source: lattitude: {order.source.lat} longitude: {order.source.lon}
      </Text>
      <Text fontSize="xl" mb={4}>
        Destination: lattitude: {order.destination.lat} longitude:{" "}
        {order.destination.lon}
      </Text>

      {/* <Button
        key={order.id}
        onClick={() =>
          getCoordinates(
            order.source.lat,
            order.source.lon,
            order.destination.lat,
            order.destination.lon
          )
        }
      >
        Map
      </Button> */}

      <Box mt={8}>
        <Button
          key={order.id}
          onClick={clickHandler}
          mx={1}
          px={8}
          colorScheme="yellow"
        >
          Get coordinates
        </Button>
        <Button onClick={mapHandler} mx={1} px={8} colorScheme="orange">
          Map
        </Button>
      </Box>
    </Box>
  );
};

export default Order;
