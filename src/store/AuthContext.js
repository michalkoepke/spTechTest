import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Auth provider ktory zapewni nam dostęp do : currentUser, loading i metod signup i login

export function AuthProvider({ children }) {
  // stany:

  const [authorized, setAuthorized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("logged in from context: ", loggedIn);
  const [currentUser, setCurrentUser] = useState("");
  // const [loading, setLoading] = useState(true);

  const [token, setToken] = useState("");
  console.log("token state: ", token);

  const [orders, setOrders] = useState([]);
  console.log("zamowienia ze stanu :", orders);

  //! UseEffect prosi na poczatku o refresh token:

  useEffect(() => {
    
    fetch("https://api.demo.cargo-speed.pl/demo/api/v1/login/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },

      body: "grant_type=refresh_token",
    })
      .then((response) => {
        console.log("resolved", response);

        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        // const { access_token } = data;
        console.log("refresh token: ", data);
        // return access_token;
      })
      // .then((response) => {
      //   if (response.ok) {
      //     console.log("response-ok status: true");
      //     setAuthorized(true);
      //     // history.push("/orders");
      //   } else if (!response.ok) {
      //     console.log("response-ok status: false");
      //     setAuthorized(false);
      //     // history.push("/");
      //   }
      // })

      .catch((err) => {
        console.log("rejected", err);
      });
  }, []);

  //! funkcja logowania/wysylania credentials z formularza

  const sendCredentials = (username, password) => {
    fetch("https://api.demo.cargo-speed.pl/demo/api/v1/login/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=password&username=${username}&password=${password}`,
    })
      .then((response) => {
        // const user = jwt(token);
        console.log("resolved", response);

        // console.log("user: ", user);
        return response;
      })

      .then((response) => response.json())
      .then((data) => {
        const { access_token } = data;
        console.log("access token: ", access_token);
        return access_token;
      })
      // .then((data) => console.log("response data: ", data))
      .then((access_token) => {
        setToken(access_token);
      })

  

      .then((token, access_token) => {
        if (token == access_token) {
          setLoggedIn(true);
          console.log("token = access token");

          // console.log("API response: ", response);
        } else if (token != access_token) {
          setLoggedIn(false);
          console.log("token != access token");

          // console.log("API response: ", response);
        }
      })

      .catch((err) => {
        console.log("rejected", err);
      });
  };

  // ! pobieranie zamowien

  const getOrders = (token) => {
    fetch("https://api.demo.cargo-speed.pl/demo/api/v1/orders/many", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        console.log("Getting orders");
        console.log("orders-resolved: ", response);
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        
        setOrders(data);
      })
      .catch((err) => {
        console.log("orders-rejected: ", err);
      });
  };

  const value = {
    authorized,
    sendCredentials,

    loggedIn,
    setLoggedIn,
    getOrders,
    token,
    orders,
   
  };

  return (
    <AuthContext.Provider value={value}>
      {/* {!loading && children} */}
      {children}
    </AuthContext.Provider>
  );
}
