import React, { useState, useContext } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Auth provider

export function AuthProvider({ children }) {
  //! stany:

  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [orders, setOrders] = useState(null);
  const [address, setAddress] = useState(null);

  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  const [mapData, setMapData] = useState({});

  //!  prosimy  o refresh token:

  const refreshToken = () => {
    fetch("https://api.demo.cargo-speed.pl/demo/api/v1/login/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },

      body: "grant_type=refresh_token",
    })
      .then((response) => {
        console.log("trying to refresh token");
        console.log("resolved", response);

        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("refresh token: ", data);
      })

      .catch((err) => {
        console.log("rejected", err);
      });
  };

  // ! GET COORDINATES

  const getCoordinates = (sourceLat, sourceLon, destLat, destLon) => {
    return new Promise((resolve) => {
      console.log("getting coordinates");

      setSource([sourceLat, sourceLon]);
      setDestination([destLat, destLon]);

      resolve();
    });
  };

  const resetMapData = () => {
    return new Promise((resolve) => {
      setMapData({});
      console.log("resetting mapData");
      resolve();
    });
  };

  //! kasowanie koordynatow

  const clearCoordinates = () => {
    return new Promise((resolve) => {
      setSource([]);
      setDestination([]);
      console.log("clearing coordinates");
      resolve();
    });
  };

  //! wysylanie zapytania do openroute service / albo logowanie do konsoli zrodla i destynacji

  let sx = source[1];
  let sy = source[0];
  let dx = destination[1];
  let dy = destination[0];

  const getDirections = async (sx, sy, dx, dy) => {
    console.log("mapData after reset ", mapData);

    fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248894289ead4ab4823a14188183ae994a0&start=${sx},${sy}&end=${dx},${dy}`,
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
        console.log("OpenRouteService response: ", data);
        return data;
      })

      .then((data) => {
        console.log("setting map data");

        setMapData(data);
      })

      .catch((err) => {
        console.log("rejected", err);
      });
  };

  //! fetch data from reverse geocoding service

  let adresy = [];

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
      // .then((response) => {
      //   console.log("reverse geocoding response: ", response);
      //   return response;
      // })

      .then((response) => response.json())
      .then((data) => {
        console.log("reverse geocoding data: ", data);
        return data;
      })

      .then((data) => {
        console.log("setting address");

        adresy.push({
          ulica: data.address.road,
          numerDomu: data.address.house_number,
        });

        console.log("adresy: ", adresy);
        return adresy;
      })
      .then((adresy) => {
        setAddress(adresy);
      })

      .catch((err) => {
        console.log("rejected", err);
      });
  };

  // eksportujemy values z contextu:

  const value = {
    refreshToken,

    username,
    setUsername,
    password,
    setPassword,

    loggedIn,
    setLoggedIn,

    setOrders,

    orders,

    getCoordinates,
    getDirections,
    setMapData,
    resetMapData,

    source,
    destination,

    clearCoordinates,

    sx,
    sy,
    dx,
    dy,

    mapData,
    getAddress,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
