import React from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { Icon } from "leaflet";
import "../../src/App.css";

import { useAuth } from "../store/AuthContext";

// odwolanie do api key
// process.env.REACT_APP_OPENROUTE_SERVICE_API_KEY;

const testData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [19.691147804260254, 52.54980569611165],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [19.739770889282227, 52.5527152590824],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [19.69101905822754, 52.54989703061746],
          [19.70346450805664, 52.547443980744625],
          [19.709129333496094, 52.54566934855766],
          [19.724836349487305, 52.55057550956681],
          [19.731788635253906, 52.55198462463712],
          [19.739770889282227, 52.55276744679156],
        ],
      },
    },
  ],
};

const Map = () => {
  const { mapData } = useAuth();
  console.log("Map data from Map component :", mapData);

  return (
    <MapContainer center={[53.015331, 18.6057]} zoom={12}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[53.015331, 18.6057]}>
        <Popup>Simple popup</Popup>
      </Marker> */}

      <GeoJSON data={mapData.features} />
    </MapContainer>
  );
};

export default Map;
