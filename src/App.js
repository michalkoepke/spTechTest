import React from "react";
// import { Link, useHistory } from "react-router-dom";

// import logo from "./logo.svg";
import "./App.css";
// import { Text, Stack, Flex, Box, Heading } from "@chakra-ui/react";

import Orders from "./components/Orders";
import Home from "./pages/Home";
import TestRoute from "./components/TestRoute";

import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./store/AuthContext";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Map from "./components/Map";
import Navbar from "./components/Navbar";

// import { AuthProvider } from "./store/AuthContext";
// import { useAuth } from "./store/AuthContext";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Navbar />
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/orders">
              <Orders />
            </Route>
            <Route exact path="/map">
              <Map />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
