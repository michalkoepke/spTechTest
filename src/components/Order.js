import React, { useEffect } from "react";
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

  const pushToMap = () => {
    console.log("pushing to map");
    history.push("/map");
  };

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

  const mapHandler = async () => {
    await getDirections(sx, sy, dx, dy);

    if (mapData !== null) {
      console.log("pushing to Map");
      history.push("/map");
    } else {
      return (
        <div>
          <Text fontSize="2xl">LOADING MAP</Text>
        </div>
      );
    }
    // pushToMap();

    // history.push("/map");
  };

  // useEffect(() => {
  //   // console.log("use effect fired");
  //   getDirections(source, destination);
  // }, [source]);

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

      <Button key={order.id} onClick={clickHandler}>
        Map
      </Button>
      <Button onClick={mapHandler}>Map-proper</Button>
    </Box>
  );
};

export default Order;
