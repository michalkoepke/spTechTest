import React, { useState, useEffect, useContext, cloneElement } from "react";
import Cookies from "js-cookie";

import { useHistory } from "react-router";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Auth provider ktory zapewni nam dostęp do : currentUser, loading i metod signup i login

export function AuthProvider({ children }) {
  const history = useHistory();

  //! stany:

  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState("");

  const [orders, setOrders] = useState([]);

  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  // const [source, setSource] = useState(undefined);
  // const [destination, setDestination] = useState(undefined);

  const [mapData, setMapData] = useState({});

  //!  prosimy  o refresh token:

  const refreshToken = () => {
    fetch("https://api.demo.cargo-speed.pl/demo/api/v1/login/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },

      body: "grant_type=refresh_token",
      // credentials: "include",
    })
      .then((response) => {
        console.log("trying to refresh token");
        console.log("resolved", response);

        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        // const { access_token } = data;
        console.log("refresh token: ", data);
        // return access_token;
      })

      .catch((err) => {
        // history.push("/");
        console.log("rejected", err);
      });
  };
  // console.log("refresh token");

  // useEffect(() => {

  //   fetch("https://api.demo.cargo-speed.pl/demo/api/v1/login/access_token", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },

  //     body: "grant_type=refresh_token",
  //   })
  //     .then((response) => {
  //       console.log("resolved", response);

  //       return response;
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // const { access_token } = data;
  //       console.log("refresh token: ", data);
  //       // return access_token;
  //     })

  //     .catch((err) => {
  //       console.log("rejected", err);
  //     });
  // }, []);

  //! SEND CREDENTIALS : funkcja logowania/wysylania credentials z formularza

  const sendCredentials = (username, password) => {
    fetch("https://api.demo.cargo-speed.pl/demo/api/v1/login/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=password&username=${username}&password=${password}`,
    })
      .then((response) => {
        return response;
      })

      .then((response) => response.json())
      .then((data) => {
        const { access_token } = data;

        return access_token;
      })

      .then((access_token) => {
        setToken(access_token);
        sessionStorage.setItem("myToken", access_token);
      })

      .then((token, access_token) => {
        if (token == access_token) {
          setLoggedIn(true);
        } else if (token != access_token) {
          setLoggedIn(false);
        }
      })

      .catch((err) => {
        console.log("rejected", err);

        // eksperyment, piątek:
      });
  };

  //! sedn credentials inna metoda:

  const sendCredentials2 = (username, password) => {
    fetch("https://api.demo.cargo-speed.pl/demo/api/v1/login/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=password&username=${username}&password=${password}`,
    }).then((response) => {
      return response;
    });
  };

  // ! pobieranie zamowien

  // const getOrders = () => {
  //   const myToken = sessionStorage.getItem("myToken");
  //   // console.log("My token: ", myToken);

  //   fetch("https://api.demo.cargo-speed.pl/demo/api/v1/orders/many", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + myToken,
  //     },
  //   })
  //     .then((response) => {
  //       // console.log("Getting orders");
  //       // console.log("orders-resolved: ", response);
  //       return response;
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setOrders(data);
  //       // setLoading(false);
  //     })
  //     .catch((err) => {
  //       // history.push("/");
  //       console.log("orders-rejected: ", err);
  //     });
  // };

  // !pobieranie koordynatow z komponentu order

  // useEffect(() => {
  //   const getCoordinates = (sourceLat, sourceLon, destLat, destLon) => {
  //     setSource([sourceLat, sourceLon]);
  //     setDestination([destLat, destLon]);
  //   };
  // }, [sourceLat, sourceLon, destLat, destLon]);

  // ! GET COORDINATES

  // const getCoordinates = (sourceLat, sourceLon, destLat, destLon) => {
  //   setSource([sourceLat, sourceLon]);
  //   setDestination([destLat, destLon]);

  //   // getDirections(source, destination);
  // };

  // ! GET COORDINATES ASYNC VERSION

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

  // const testFunction = () => {
  //   return new Promise((resolve) => {
  //     console.log("test function fired");
  //     resolve();
  //   });
  // };
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

  // let sx = 53.000391;
  // let sy = 18.611654;
  // let dx = 53.237379;
  // let dy = 20.16877;

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
        // setMapData((prevMapData) => data);
        setMapData(data);
      })

      .catch((err) => {
        console.log("rejected", err);
      });
  };

  // !przekierowanie do mapy

  // useEffect(() => {
  //   // console.log("use effect fired");
  //   getDirections(sx, sy, dx, dy);
  // }, [source]);

  const value = {
    // authorized,
    refreshToken,
    sendCredentials,

    username,
    setUsername,
    password,
    setPassword,

    loggedIn,
    setLoggedIn,
    // getOrders,
    setOrders,
    token,
    orders,
    loading,
    getCoordinates,
    getDirections,
    setMapData,
    resetMapData,
    // testFunction,

    source,
    destination,

    clearCoordinates,

    sx,
    sy,
    dx,
    dy,

    mapData,
    // pushToMap,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* {!loading && children} */}
      {children}
    </AuthContext.Provider>
  );
}
