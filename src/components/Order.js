import React, { useEffect, useState } from "react";

import { Box, Button, Text, Spinner, Flex, Spacer } from "@chakra-ui/react";

import { useAuth } from "../store/AuthContext";

const Order = ({ order }) => {
  const { getCoordinates } = useAuth();
  const { getDirections } = useAuth();
  // const { getAddress } = useAuth();
  const { orders } = useAuth();

  const [isPending, setIsPending] = useState(true);

  //! stany dla zrodla

  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [village, setVillage] = useState("");
  const [ulica, setUlica] = useState("");
  const [housenumber, setHousenumber] = useState("");
  const [building, setBuilding] = useState("");

  // ! stany dla celu

  const [dcity, setDcity] = useState("");
  const [dtown, setDtown] = useState("");
  const [dvillage, setDvillage] = useState("");
  const [dulica, setDulica] = useState("");
  const [dhousenumber, setDhousenumber] = useState("");
  const [dbuilding, setDbuilding] = useState("");

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

  //! pobieranie adresu zrodla

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
        console.log("zrodlo: ", data);
        return data;
      })

      .then((data) => {
        // console.log("setting address");

        // console.log("ulica: ", data.address.road);
        setIsPending(false);
        setCity(data.address.city);
        setTown(data.address.town);
        setVillage(data.address.village);
        setUlica(data.address.road);
        setHousenumber(data.address.house_number);
        setBuilding(data.address.building);
      })

      .catch((err) => {
        console.log("rejected", err);
      });
  };

  //! pobieranie adresu celu

  const getDestAddress = async (dx, dy) => {
    console.log("getting addresses: ", dx, dy);

    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${dy}&lon=${dx}&format=json`,
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
        console.log("Destynacja: ", data);
        return data;
      })

      .then((data) => {
        // console.log("setting address");

        // console.log("ulica: ", data.address.road);
        setIsPending(false);
        setDcity(data.address.city);
        setDtown(data.address.town);
        setDvillage(data.address.village);
        setDulica(data.address.road);
        setDhousenumber(data.address.house_number);
        setDbuilding(data.address.building);
      })

      .catch((err) => {
        console.log("rejected", err);
      });
  };

  useEffect(() => {
    getAddress(order.source.lon, order.source.lat);
    getDestAddress(order.destination.lon, order.destination.lat);
  }, []);

  return (
    <Box
      px={12}
      py={8}
      my={4}
      key={order.id}
      bg="white"
      w="100%"
      boxShadow="xl"
    >
      <Text fontSize="3xl">Person: {order.subject}</Text>
      <Text fontSize="xl">Order number: {order.order_number}</Text>

      {isPending && (
        <Flex direction="row">
          Loading....
          <Spinner />
        </Flex>
      )}

      <Flex direction="row">
        {/* zrodlo */}

        <Box Box mr={2}>
          <Text fontSize="xl" my={4}>
            Source Address:
          </Text>

          <Text>
            City: {city} {town} {village}
          </Text>

          {/* <Text>Street: {ulica}</Text> */}
          {ulica && <Text>Street: {ulica}</Text>}

          {housenumber && <Text>House number: {housenumber}</Text>}
          {building && <Text>Building: {building}</Text>}
        </Box>

        {/* destynacja */}

        <Spacer />

        <Box ml={2}>
          <Text fontSize="xl" my={4}>
            Destination Address:
          </Text>

          <Text>
            City: {dcity} {dtown} {dvillage}
          </Text>

          {/* <Text>Street: {dulica}</Text> */}
          {dulica && <Text>Street: {dulica}</Text>}

          {dhousenumber && <Text>House number: {dhousenumber}</Text>}
          {dbuilding && <Text>Building: {dbuilding}</Text>}
        </Box>
      </Flex>

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
