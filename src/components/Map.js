import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "../../src/App.css";
import { Flex, Stack, Button, Box } from "@chakra-ui/react";

import { useAuth } from "../store/AuthContext";

import { useHistory } from "react-router";

// odwolanie do api key
// process.env.REACT_APP_OPENROUTE_SERVICE_API_KEY;

const mapStyle = {
  marginTop: "65px",
};

const Map = () => {
  const { mapData } = useAuth();

  const { resetMapData } = useAuth();

  // koordynaty z kontekstu

  const { sx } = useAuth();
  const { sy } = useAuth();
  const { dx } = useAuth();
  const { dy } = useAuth();

  const history = useHistory();

  const backHandler = () => {
    resetMapData();
    console.log("reseting mapData,back to orders: fired");
    history.push("/orders");
  };

  window.addEventListener("popstate", (event) => {
    console.log("browser back button clicked");
    history.push("/orders");
  });

  const marker1 = [sx, sy];
  const marker2 = [dx, dy];

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const checkIfdataLoaded = () => {
    if (marker1 && marker2) {
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  };

  useEffect(() => {
    checkIfdataLoaded();
    console.log("marker1: ", marker1, "marker2: ", marker2);
    console.log("data marker1, marker2 loaded?", isDataLoaded);
  }, [isDataLoaded]);

  return (
    <Stack>
      {isDataLoaded ? (
        <Flex>
          <MapContainer
            center={[marker1[1], marker1[0]]}
            zoom={12}
            style={mapStyle}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[marker1[1], marker1[0]]}>
              <Popup>
                <Popup>Simple popup</Popup>
              </Popup>
            </Marker>

            <Marker position={[marker2[1], marker2[0]]}>
              <Popup>
                <div>Simple popup</div>
              </Popup>
            </Marker>

            <GeoJSON data={mapData.features} />
          </MapContainer>
          <Button
            onClick={backHandler}
            pos="absolute"
            top="85px"
            left="60px"
            zIndex="sticky"
            colorScheme="cyan"
          >
            Back to orders
          </Button>
        </Flex>
      ) : (
        <div>Loading...</div>
      )}
    </Stack>
  );
};

export default Map;
