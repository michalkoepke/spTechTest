import React, { useEffect, useState } from "react";

import { Box, Button, Text } from "@chakra-ui/react";

import { useAuth } from "../store/AuthContext";

const Order = ({ order }) => {
  const { getCoordinates } = useAuth();
  const { getDirections } = useAuth();
  // const { getAddress } = useAuth();
  const { orders } = useAuth();

  const [isPending, setIsPending] = useState(true);
  const [ulica, setUlica] = useState("");

  // const { source } = useAuth();
  // const { destination } = useAuth();
  // const { mapData } = useAuth();
  // const { setMapData } = useAuth();
  // const { resetMapData } = useAuth();

  // const { sx } = useAuth();
  // const { sy } = useAuth();
  // const { dx } = useAuth();
  // const { dy } = useAuth();

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
      // getAddress(sx, sy);
    }, 100);
  };

  // ! to działało - pobierało dane ale byl problem z pakowaniem do stanu

  // useEffect(() => {
  //   getAddress(order.source.lon, order.source.lat);
  // }, []);

  //! a to eksperyment:

  const getAddress = async (sx, sy) => {
    console.log("getting addresses: ", sx, sy);

    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${sy}&lon=${sx}&format=json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept:
            "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("reverse geocoding data: ", data);
        return data;
      })

      .then((data) => {
        console.log("setting address");

        // adresy.push({
        //   ulica: data.address.road,
        //   numerDomu: data.address.house_number,
        // });

        // let numerDomu = data.address.house_number;

        console.log("ulica: ", data.address.road);
        setIsPending(false);
        setUlica(data.address.road);
      })

      .catch((err) => {
        console.log("rejected", err);
      });
  };

  useEffect(() => {
    getAddress(order.source.lon, order.source.lat);
  }, []);

  return (
    <Box p={8} my={4} key={order.id} bg="white" w="100%" boxShadow="xl">
      <Text fontSize="3xl" mb={4}>
        Person: {order.subject}
      </Text>
      <Text fontSize="xl">Order number: {order.order_number}</Text>
      <Text fontSize="xl">
        Source: lattitude: {order.source.lat} longitude: {order.source.lon}
      </Text>

      {isPending && <div>Loading....</div>}
      {/* {ulica && <Text fontSize="xl">Ulica: {ulica}</Text>} */}
      {/* <Text fontSize="xl">Ulica: {ulica}</Text> */}

      <Text fontSize="xl" mb={4}>
        Destination: lattitude: {order.destination.lat} longitude:{" "}
        {order.destination.lon}
      </Text>

      <Text>Ulica: {ulica}</Text>

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
