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
  // stany:

  const [authorized, setAuthorized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  // console.log("logged in from context: ", loggedIn);
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState("");
  // console.log("token state: ", token);

  const [orders, setOrders] = useState([]);
  // console.log("zamowienia ze stanu :", orders);

  // const testValue = "test value: kjkljaklgjklsjb";

  // const [testValue, setTestValue] = useState("test value: kjkljaklgjklsjb");

  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  console.log("source: ", source);
  console.log("destination: ", destination);

  const [mapData, setMapdata] = useState({});

  //! UseEffect prosi na poczatku o refresh token:

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

  //! funkcja logowania/wysylania credentials z formularza

  const sendCredentials = (username, password) => {
    fetch("https://api.demo.cargo-speed.pl/demo/api/v1/login/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=password&username=${username}&password=${password}`,
    })
      .then((response) => {
        // const user = jwt(token);
        // console.log("resolved", response);

        // console.log("user: ", user);
        return response;
      })

      .then((response) => response.json())
      .then((data) => {
        const { access_token } = data;
        // console.log("access token: ", access_token);
        return access_token;
      })
      // .then((data) => console.log("response data: ", data))
      .then((access_token) => {
        setToken(access_token);
        sessionStorage.setItem("myToken", access_token);
      })

      .then((token, access_token) => {
        if (token == access_token) {
          setLoggedIn(true);
          // console.log("token = access token");

          // console.log("API response: ", response);
        } else if (token != access_token) {
          setLoggedIn(false);
          // console.log("token != access token");

          // console.log("API response: ", response);
        }
      })

      .catch((err) => {
        console.log("rejected", err);
      });
  };

  // ! pobieranie zamowien

  const getOrders = () => {
    const myToken = sessionStorage.getItem("myToken");
    // console.log("My token: ", myToken);

    fetch("https://api.demo.cargo-speed.pl/demo/api/v1/orders/many", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + myToken,
      },
    })
      .then((response) => {
        // console.log("Getting orders");
        // console.log("orders-resolved: ", response);
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        // setLoading(false);
      })
      .catch((err) => {
        console.log("orders-rejected: ", err);
      });
  };

  // !pobieranie koordynatow z komponentu order

  // useEffect(() => {
  //   const getCoordinates = (sourceLat, sourceLon, destLat, destLon) => {
  //     setSource([sourceLat, sourceLon]);
  //     setDestination([destLat, destLon]);
  //   };
  // }, [sourceLat, sourceLon, destLat, destLon]);

  const getCoordinates = (sourceLat, sourceLon, destLat, destLon) => {
    setSource([sourceLat, sourceLon]);
    setDestination([destLat, destLon]);

    // getDirections(source, destination);
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

  const getDirections = (sx, sy, dx, dy) => {
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
        setMapdata(data);
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
    authorized,
    sendCredentials,

    loggedIn,
    setLoggedIn,
    getOrders,
    token,
    orders,
    loading,
    getCoordinates,
    getDirections,

    source,
    destination,

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
